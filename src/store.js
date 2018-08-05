import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { AsyncStorage } from "react-native"

const initialState = {}
const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
)

_storePosts = async (posts) => {
  try {
    await AsyncStorage.setItem('POSTS',posts);
  } catch (error) {
    
  }
}


export default store
