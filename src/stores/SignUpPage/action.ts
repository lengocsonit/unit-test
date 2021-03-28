import actionCreatorFactory from "typescript-fsa";
import { setUserName, setUserPassword, signUp } from "./type";
import { UserSignUp } from '../../models/User'

const actionCreator = actionCreatorFactory("SignUpPage");

export const SignUpPageActions = {
  setUserName: actionCreator<string>(setUserName),
  setUserPassword: actionCreator<string>(setUserPassword),
  signUp: actionCreator<UserSignUp>(signUp),
};
