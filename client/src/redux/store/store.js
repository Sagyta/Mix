import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk"; // 🔥 NO necesita llaves 🔥
import rootReducer from "../reducer/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk)) // 🔥 Cambio aquí 🔥
);

export default store;