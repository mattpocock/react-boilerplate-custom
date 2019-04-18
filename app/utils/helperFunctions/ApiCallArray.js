import reduceToObject from 'utils/helperFunctions/reduceToObject';

function ApiCallArray(apiCalls) {
  this.array = Object.keys(apiCalls).map(key => apiCalls[key]);
}

ApiCallArray.prototype.mapStateToProps = function mapStateToProps() {
  return this.array
    .map(apiCall => ({ [apiCall.name]: apiCall.mapStateToProps() }))
    .reduce(reduceToObject, {});
};

ApiCallArray.prototype.mapNestedStateToProps = function mapNestedStateToProps() {
  return this.array
    .map(apiCall => ({ [apiCall.name]: apiCall.mapNestedStateToProps() }))
    .reduce(reduceToObject, {});
};

ApiCallArray.prototype.mapDispatchToProps = function mapDispatchToProps(
  dispatch,
) {
  return this.array
    .map(apiCall => ({
      ...apiCall.mapDispatchToProps(dispatch),
    }))
    .reduce(reduceToObject, {});
};

ApiCallArray.prototype.mapNestedDispatchToProps = function mapNestedDispatchToProps(
  dispatch,
) {
  return this.array
    .map(apiCall => ({
      ...apiCall.mapNestedDispatchToProps(dispatch),
    }))
    .reduce(reduceToObject, {});
};

ApiCallArray.prototype.mergeNestedProps = function mergeNestedProps() {
  return (stateProps, dispatchProps, otherProps) => {
    const mergedProps = Object.keys(stateProps)
      .map(key => {
        if (!Object.keys(dispatchProps).includes(key)) {
          return { [key]: stateProps[key] };
        }
        return { [key]: { ...stateProps[key], ...dispatchProps[key] } };
      })
      .reduce(reduceToObject, {});
    return {
      ...dispatchProps,
      ...stateProps,
      ...mergedProps,
      ...otherProps,
    };
  };
};

ApiCallArray.prototype.mapReducers = function mapReducers() {
  return this.array
    .map(apiCall => ({ [apiCall.name]: apiCall.reducer }))
    .reduce(reduceToObject, {});
};

ApiCallArray.prototype.mapSaga = function mapSaga() {
  return this.array
    .map(({ saga, resetSaga }) => [saga, resetSaga])
    .reduce((a, b) => [...a, ...b], []);
};

export default ApiCallArray;
