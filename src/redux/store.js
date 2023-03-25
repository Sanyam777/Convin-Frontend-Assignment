import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import bucketsReducer from "./reducers"
const rootReducer = combineReducers({
    bucketsReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));