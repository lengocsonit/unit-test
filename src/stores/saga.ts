import { all, fork } from 'redux-saga/effects';
import { SignUpPageSaga } from './SignUpPage/saga'

export const rootSaga = function* root() {
   yield all([fork(SignUpPageSaga)]);
};