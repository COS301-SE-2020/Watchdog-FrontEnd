// Indicate that something is in progress. This should start the loader and have a 'component' attribute
export var STARTED_LOADING = "STARTED_LOADING";

//Indicate that the operation is complete. Requires 'component', 'success' and 'message'
export var COMPLETED_LOADING = "COMPLETED_LOADING";

export var GET_USER_DATA = "GET_USER_DATA"
export var GET_RECORDINGS = "GET_RECORDINGS"
export var GET_IDENTITIES = "GET_IDENTITIES"
export var GET_LOGS = "GET_LOGS"

export var SUCCESS_GET_USER_DATA = "SUCCESS_GET_USER_DATA"
export var SUCCESS_GET_RECORDINGS = "SUCCESS_GET_RECORDINGS"
export var SUCCESS_GET_IDENTITIES = "SUCCESS_GET_IDENTITIES"
export var SUCCESS_GET_LOGS = "SUCCESS_GET_LOGS"

export var ERROR_GET_USER_DATA = "ERROR_GET_USER_DATA"
export var ERROR_GET_RECORDINGS = "ERROR_GET_RECORDINGS"
export var ERROR_GET_IDENTITIES = "ERROR_GET_IDENTITIES"
export var ERROR_GET_LOGS = "ERROR_GET_LOGS"
