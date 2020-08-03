// Indicate that something is in progress. This should start the loader and have a 'component' attribute
export var STARTED_LOADING = "STARTED_LOADING";

//Indicate that the operation is complete. Requires 'component', 'success' and 'message'
export var COMPLETED_LOADING = "COMPLETED_LOADING";

//
export var MAKE_REQUEST = "MAKE_REQUEST";

//Fetch full set of data
export var LOADED_DATA = "LOADED_DATA";
export var LOADED_RECORDINGS = "LOADED_RECORDINGS";
export var DELETED_RECORDING = "DELETED_RECORDING";
export var LOADED_LOCATIONS = "LOADED_LOCATIONS";
export var LOADED_LOGS = "LOADED_LOGS";
export var LOADED_CAMERA_STATUS = "LOADED_CAMERA_STATUS";
export var LOADED_AVAILABLE_STORAGE = "LOADED_AVAILABLE_STORAGE";
export var LOADED_STATISTICS = "LOADED_STATISTICS";
export var LOADED_SECURITY_LEVEL = "LOADED_SECURITY_LEVEL";
export var CHANGED_SECURITY_LEVEL = "CHANGED_SECURITY_LEVEL";
export var LOADED_SETTINGS = "LOADED_SETTINGS";
export var CHANGED_SETTINGS = "CHANGED_SETTINGS";