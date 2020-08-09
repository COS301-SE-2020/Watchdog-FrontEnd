# File Structure

/components
    -> /recordings.tsx
    -> /live.tsx
    -> /dashboard.tsx
/api
/app.tsx

# TODO:

### 03/08
- [x] Change app.tsx to class based component
- [x] Create simple nav bar with core components (tabs) linked
- [] Copy Api from Webapp to Mobile app
- [x] Npm install: Axios, react-native-elements, redux, redux-thunk, redux-logger

### 04/08
- [] Settings Tab
- [] User Auth:Login
- [] Live Tab
- [] Dashboard

# Redux

GET_DATA
- Get all data from api

### Recordings:

GET_RECORDINGS
- Get recordings from api
- Add them to store

DELETE_RECORDING
- Delete from store
- Make api call to delete

### Live:

GET_LOCATIONS
- Get routes from api
- Add to store

### Dashboard

GET_LOGS
- Retrieve from api
- Update store

GET_CAMERA_STATUS
- Retrieve from api
- Update store

GET_AVAILABLE_STORAGE*
GET_STATISTICS*

GET_SECURITY_LEVEL
- Retrieve from api
- Update store

CHANGE_SECURITY_LEVEL
- Send api request
- Update store

### SETTINGS

LOAD_SETTINGS (called when the drawer opens)
- Retrieve from api
- Update Store

CHANGE_SETTINGS
- Update Store
- Send to api

ADD_TO_WHITELIST
- Upload Image
- Update image name
- Use image as thumb - store in local data
    - Set the path to null
    - Update on request
- Update Store

REMOVE_FROM_WHITELIST
- Send api request
- Update store

Cuts out
++++++
user act 1 -> enq
user act 2 -> enq
user act 3 -> enq
Comes back
------
Deq -> execute on fresh data
