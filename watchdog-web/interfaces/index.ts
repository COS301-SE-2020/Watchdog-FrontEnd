// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

export type stateIndex ={
  loggedIn : boolean,
  darkMode : boolean
}

export type propsIndex ={
  
}

export type appProps = {
  toggleDark : Function

}

export type appState ={
  currentScreen : 1 | 2,
  darkMode : boolean
}

