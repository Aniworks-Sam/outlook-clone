import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./components/store/auth-context";
// import { AuthContextProviderBharath } from './components/store/auth-context';
import { BrowserRouter } from "react-router-dom";
import store from "./components/store/Redux-store";
import { Provider } from "react-redux";
ReactDOM.render(
  <Provider store={store}>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </Provider>,
  document.getElementById("root")
);
