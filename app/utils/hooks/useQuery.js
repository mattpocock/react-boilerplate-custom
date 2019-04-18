import appConfig from 'appConfig';
import { useReducer } from 'react';
import Api from 'utils/apiClient';

const api = new Api(appConfig.serverUrl);

const initialState = {
  isLoading: false,
  hasError: false,
  hasSucceeded: false,
  data: null,
  errorMessage: '',
  prevPayload: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STARTED:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        hasSucceeded: false,
        errorMessage: '',
        prevPayload: action.payload,
      };
    case SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        hasSucceeded: true,
        errorMessage: '',
        data: action.payload,
      };
    case FAILED:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        hasSucceeded: false,
        errorMessage: action.payload,
        data: null,
      };
    case UPDATE_CACHE:
      return {
        ...state,
        data: action.payload,
      };
    case RESET:
      return initialState;
    default:
      throw new Error();
  }
};

export default ({
  endpoint,
  method = 'GET',
  onSuccess = null,
  mockedData = null,
}: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleApiReturn = res => {
    if (res && res.body) {
      const { Data, Errors } = res.body;
      if (Errors && Errors.length > 0) {
        dispatch({
          type: FAILED,
          payload: Errors[0].Description || Errors[0],
        });
        return;
      }
      dispatch({ type: SUCCEEDED, payload: Data });
      if (onSuccess) {
        onSuccess(Data);
      }
    } else {
      handleError('');
    }
  };

  const handleError = e => {
    dispatch({ type: FAILED, payload: e.toString ? e.toString() : `${e}` });
  };

  const handleSubmit = (params = {}) => {
    dispatch({ type: STARTED, payload: params });

    if (mockedData && process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        dispatch({ type: SUCCEEDED, payload: mockedData });
      }, 400);
      if (onSuccess) {
        onSuccess(mockedData);
      }
      return;
    }

    try {
      if (method === 'GET') {
        api
          .get(endpoint, params)
          .then(handleApiReturn)
          .catch(handleError);
      } else if (method === 'POST_FORM') {
        api
          .postForm(endpoint, params)
          .then(handleApiReturn)
          .catch(handleError);
      } else {
        api
          .post(endpoint, params)
          .then(handleApiReturn)
          .catch(handleError);
      }
    } catch (e) {
      handleError(e);
    }
  };

  return {
    state,
    submit: handleSubmit,
    reset: () => dispatch({ type: RESET }),
    updateCache: changeFunction =>
      dispatch({ type: UPDATE_CACHE, payload: changeFunction(state.data) }),
  };
};

interface Props {
  endpoint: string;
  method: string;
  onSuccess?: Function;
  mockedData?: any;
}

const STARTED = 'STARTED';
const SUCCEEDED = 'SUCCEEDED';
const FAILED = 'FAILED';
const RESET = 'RESET';
const UPDATE_CACHE = 'UPDATE_CACHE';
