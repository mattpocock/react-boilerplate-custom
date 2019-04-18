import { connect } from 'react-redux';
import { combineReducers, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ApiCallArray from 'utils/helperFunctions/ApiCallArray';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

const connectApiCalls = ({ container, apiCalls }) => {
  const apiCallArray = new ApiCallArray(apiCalls);

  const mapStateToProps = createStructuredSelector({
    // Selectors go in here
    ...apiCallArray.mapNestedStateToProps(),
  });

  function mapDispatchToProps(dispatch) {
    return {
      ...apiCallArray.mapNestedDispatchToProps(dispatch),
    };
  }

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
    apiCallArray.mergeNestedProps(),
  );

  const withReducer = injectReducer({
    key: container,
    reducer: combineReducers({
      ...apiCallArray.mapReducers(),
      // add reducers here
    }),
  });

  const withSaga = injectSaga({
    key: container,
    // eslint-disable-next-line
    saga: function*() {
      const sagaList = apiCallArray.mapSaga();
      for (let i = 0; i < sagaList.length; i += 1) {
        yield sagaList[i];
      }
      // add sagas here
    },
  });

  return compose(
    withReducer,
    withSaga,
    withConnect,
  );
};

export default connectApiCalls;

/**
 * Use like this:
 *
 * export default connectApiCalls({
 *   container: 'containerKey',
 *   apiCalls: apiCalls,
 * })(ComponentToWrap);
 */
