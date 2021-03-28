import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Record } from 'immutable';

import { SignUpPageActions } from './action';
import { SignUpState } from './model'

export const signUpReducer = reducerWithInitialState(new SignUpState())
  .case(SignUpPageActions.setUserName, (state, payload) => {
    return state.set('userName', payload);
  })
  .case(SignUpPageActions.setUserPassword, (state, payload) => {
    return state.set('userPassword', payload);
  });