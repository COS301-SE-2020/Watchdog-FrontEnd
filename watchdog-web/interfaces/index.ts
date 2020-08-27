// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

import { type } from "os"

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


}

export type stateTopNav = {
  
}

export type propsApp = {


}

export type stateApp = {
  selectedScreen : 1 | 2
  
}