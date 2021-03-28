
import { put, takeLatest } from 'redux-saga/effects';

import { SignUpPageActions } from './action';
import { UserSignUp } from '../../models/User';
import { ApiClient } from '../../apiClients/api'

function* signUp(action: ReturnType<typeof SignUpPageActions.signUp>) {
  // const { data } = yield ApiClient.signUp(action.payload.toJS())
  console.log('Call saga')
}

export function* SignUpPageSaga() {
  yield takeLatest(SignUpPageActions.signUp, signUp);
}