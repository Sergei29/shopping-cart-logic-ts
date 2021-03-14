/**
 * @description util function to log nested values in readable format
 * @param {Array| Object} mixedNestedValue nested value
 * @returns {undefined} logs the value
 */
export const print = (
  mixedNestedValue: Record<string, any> | Record<string, any>[]
) => console.log(JSON.stringify(mixedNestedValue, null, 2));
