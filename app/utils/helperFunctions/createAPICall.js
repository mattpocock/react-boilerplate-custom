/* eslint-disable func-names */
import assert from 'assert';
import { takeLatest, call, put } from 'redux-saga/effects';
import { createSelector, createStructuredSelector } from 'reselect';

const parseCamelCaseToArray = string =>
  string.replace(/([A-Z])/g, letter => ` ${letter}`).split(' ');

const constant = string =>
  parseCamelCaseToArray(string)
    .map(word => word.toUpperCase())
    .join('_');

const capitalize = string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export default params => {
  const { name, container, apiCallParams, reducerCases = [] } = params;
  assert(name, 'no name attribute param to createAPICall');
  assert(container, 'no container attribute param to createAPICall');
  assert(
    apiCallParams,
    'no saga function, apiCallParams array or mockedData passed to createAPICall',
  );
  reducerCases.forEach(({ action, type }) => {
    assert(
      action && type,
      "reducerCase not passed with the shape: { type: '', action: (state, payload) => changeState() }",
    );
  });

  const defaultInitialState = {
    isLoading: false,
    hasSucceeded: false,
    hasError: false,
    errorMessage: null,
    data: null,
  };

  const initialState = defaultInitialState;
  const constants = {
    started: `${container}/${constant(name)}_STARTED`,
    failed: `${container}/${constant(name)}_FAILED`,
    succeeded: `${container}/${constant(name)}_SUCCEEDED`,
    reset: `${container}/RESET_${constant(name)}`,
  };

  const selector = state => state[container];
  const makeSelectDomain = () =>
    createSelector(
      selector,
      substate => (substate && substate[name] ? substate[name] : {}),
    );

  const selectors = {
    isLoading: () =>
      createSelector(makeSelectDomain(), substate => substate.isLoading),
    hasSucceeded: () =>
      createSelector(makeSelectDomain(), substate => substate.hasSucceeded),
    hasError: () =>
      createSelector(makeSelectDomain(), substate => substate.hasError),
    errorMessage: () =>
      createSelector(makeSelectDomain(), substate => substate.errorMessage),
    data: () => createSelector(makeSelectDomain(), substate => substate.data),
  };

  const actions = {
    started: payload => ({
      type: constants.started,
      payload,
    }),
    failed: payload => ({
      type: constants.failed,
      payload,
    }),
    succeeded: payload => ({
      type: constants.succeeded,
      payload,
    }),
    reset: () => ({
      type: constants.reset,
    }),
  };

  const reducer = (state = initialState, { type, payload }) => {
    const cases = [
      {
        type: constants.started,
        action: s => ({
          ...s,
          isLoading: true,
          hasSucceeded: false,
          hasError: false,
          errorMessage: defaultInitialState.errorMessage,
          data: null,
        }),
      },
      {
        type: constants.failed,
        action: (s, p) => ({
          ...s,
          isLoading: false,
          hasSucceeded: false,
          hasError: false,
          errorMessage: p,
        }),
      },
      {
        type: constants.succeeded,
        action: (s, p) => ({
          ...s,
          isLoading: false,
          hasSucceeded: true,
          hasError: false,
          errorMessage: defaultInitialState.errorMessage,
          data: p,
        }),
      },
      {
        type: constants.reset,
        action: s => ({
          ...s,
          isLoading: false,
          hasSucceeded: false,
          hasError: false,
          errorMessage: defaultInitialState.errorMessage,
          data: null,
        }),
      },
      ...reducerCases,
    ];
    return (
      cases
        .filter(c => type === c.type)
        /**
         * Runs through each case that matches the type, and calls
         * it with (state, payload). At the end of the reduce, returns
         * the state
         */
        .reduce((a, b) => (b.action ? b.action(a, payload) : a), state)
    );
  };

  return {
    actions,
    constants,
    selectors,
    reducer,
    name,
    mapReducer: () => ({ [name]: reducer }),
    /**
     * Creates a structured selector with this shape
     */
    mapStateToProps: () =>
      createStructuredSelector({
        isLoading: selectors.isLoading(),
        data: selectors.data(),
        hasSucceeded: selectors.hasSucceeded(),
        hasError: selectors.hasError(),
        errorMessage: selectors.errorMessage(),
      }),
    mapNestedStateToProps: () =>
      createStructuredSelector({
        state: createStructuredSelector({
          isLoading: selectors.isLoading(),
          data: selectors.data(),
          hasSucceeded: selectors.hasSucceeded(),
          hasError: selectors.hasError(),
          errorMessage: selectors.errorMessage(),
        }),
      }),
    /**
     * Returns a function that takes a payload and dispatches the API call
     *  - put this in mapDispatchToProps
     */
    submit: dispatch => payload => dispatch(actions.started(payload)),
    reset: dispatch => () => dispatch(actions.reset()),
    mapDispatchToProps: dispatch => ({
      [`submit${capitalize(name)}`]: payload =>
        dispatch(actions.started(payload)),
      [`reset${capitalize(name)}`]: () => dispatch(actions.reset()),
    }),
    mapNestedDispatchToProps: dispatch => ({
      [name]: {
        submit: payload => dispatch(actions.started(payload)),
        reset: () => dispatch(actions.reset()),
      },
    }),
    saga: takeLatest(constants.started, function*({ payload }) {
      let data = {};
      try {
        data = yield call(...apiCallParams(payload));
      } catch (err) {
        console.log(err); // eslint-disable-line
        yield put(actions.failed(err.toString()));
      }
      yield put(actions.succeeded(data));
    }),
  };
};
