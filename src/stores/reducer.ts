import { History } from "history";
import { combineReducers } from "redux";
import { RouterState, connectRouter } from "connected-react-router";
import { SignUpState } from "./SignUpPage/model";
import { signUpReducer } from "./SignUpPage/reducer";

export interface State {
  router: RouterState;
  signUpPage: SignUpState;
}

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    signUpPage: signUpReducer,
  });
