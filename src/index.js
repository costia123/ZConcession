import React from "react";
import ReactDOM from "react-dom";
import "./globals.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "redux/configstore";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
serviceWorkerRegistration.register();
