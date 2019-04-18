/**
 * Merges two api call states together
 */
export default apiCalls =>
  apiCalls.reduce(
    (a, b) => ({
      isLoading: a?.isLoading || b?.isLoading,
      hasError: a?.hasError || b?.hasError,
      hasSucceeded: a?.hasSucceeded && b?.hasSucceeded,
      errorMessage: a?.errorMessage || b?.errorMessage,
    }),
    {},
  );
