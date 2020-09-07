// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

import { type } from "os"

export type Login={
  username: string
  password: string
  hasAccount: boolean
}
export type Signup={
  username: string
  fullname: string
  email: string
  password: string
  address: string
  hasSignedup: boolean
  Verified: boolean
}
export type User = {
  id: number
  name: string
}

export type indexProps ={

}

export type indexState = {
  loggedIn : boolean
  
}

export type propsTopNav = {
  changeScreen : Function
  toggle_identites : Function
  toggle_detected_images : Function
  toggle_notifications_modal : Function
  toggle_logout_modal : Function
  toggle_password_modal : Function


}

export type stateTopNav = {
  
}

export type propsApp = {


}

export type stateApp = {
  selectedScreen : 1 | 2,
  identitiesModal : boolean,
  detectedImagesModal : boolean,
  notificationModal : boolean,
  logoutModal :boolean,
  changePasswordModal : boolean
  
}

export type stateIdentitiesModal = {
  
}

export type propsIdentitiesModal = {
  show_modal: boolean
  hide_modal : Function

}

export type stateDetectedImagesModal = {
  
}

export type propsDetectedImagesModal = {
  show_modal: boolean
  hide_modal : Function

}

type notificationOption = {
  name : string
  code : string
}
export type stateNotificationModal = {
  security_company : string,
  notification_type : notificationOption
  
}

export type propsNotificationModal = {
  show_modal: boolean
  hide_modal : Function

}

export type stateLogoutModal = {
  
}

export type propsLogoutModal = {
  show_modal: boolean
  hide_modal : Function

}

export type stateChangePasswordModal = {
  old_password : string,
  new_password : string,
  confirm_password : string
  
}

export type propsChangePasswordModal = {
  show_modal: boolean
  hide_modal : Function

}

export type propsDetectedImages = {

}

type DetectedImages = {
  id : number
  img : string
  key : string

}
export type stateDetectedImages = {
  data  : DetectedImages[] 
  addDetectedModal : boolean
  loading : boolean
  toAddKey : string
  
}


export type propsAddDetected = {
  show_modal: boolean
  hide_modal : Function
  update_key : string
  
  
}

export type stateAddDetected = {
  name : string
  loading : boolean
  
  
}

export type propsIdentities = {

}
type identity ={
  id : number
  name : string
  img : string
  monitor : Monitor
  img_key : string
}
export type stateIdentities = {
  data : identity []
  loading : boolean
  remove_modal : boolean
  remove_name : string
  remove_index : number 
  notifications_modal : boolean
  notifications_name : string
  notifications_monitor : Monitor
  add_identities_modal : boolean
  

}

export type propsRemoveIdentityModal ={
  name : string
  index : number
  show_modal : boolean
  hide_modal : Function

}

export type stateRemoveIdentityModal ={
  loading : boolean
  
}

type Monitor = {
  custom_message : string
  watch : number
}
export type propsIdentityNotificationModal ={
  show_modal : boolean
  hide_modal : Function
  name : string
  monitor : Monitor

}

export type stateIdentityNotificationModal ={
  loading : boolean
  message : string
  watch : number
  
}

export type propsAddIdentityModal ={
  show_modal : boolean
  hide_modal : Function


}

export type stateAddIdentityModal = {
  loading : boolean
  active_page : 0|1
  name : string
  fileInfo : any
  fileName : string

}