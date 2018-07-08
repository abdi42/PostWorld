import { SIGNUP } from '../actions/types'

export default function(state = initialState,action) {
  switch(action.type){
    case SIGN_UP:
      return {
        ...state,
        loggedIn:action.payload.success
      }
    default:
      return state;
  }
}
