import { combineReducers, createStore, applyMiddleware } from "redux";
import strapiReducer from "redux/strapi/reducer";
import thunk from "redux-thunk";
const reducer = combineReducers({
	strapi: strapiReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
