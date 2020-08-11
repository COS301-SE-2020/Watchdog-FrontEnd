// Indicate that something is in progress. This should start the loader and have a 'component' attribute
export var STARTED_LOADING = "STARTED_LOADING";

//Indicate that the operation is complete. Requires 'component', 'success' and 'message'
export var COMPLETED_LOADING = "COMPLETED_LOADING";

export var SUCCESS_GET_RECORDINGS = "SUCCESS_GET_RECORDINGS"