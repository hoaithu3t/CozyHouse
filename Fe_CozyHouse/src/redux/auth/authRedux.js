import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { put, takeLatest } from 'redux-saga/effects';

export const actionTypes = {
  Login: '[Login] Action',
  Logout: '[Logout] Action',
  Register: '[Register] Action',
  SwitchTenant: '[Switch Tenant] Action',
  ChangeLanguage: '[ChangeLanguage] Action',
  UserRequested: '[Request User] Action',
  UserLoaded: '[Load User] Auth API',
};


const initialAuthState = {
  user: undefined,
  authToken: undefined,
  tenant: undefined,
  language: 'vi',
};

export const reducer = persistReducer(
  {
    storage,
    key: 'v1-ipay-auth',
    whitelist: ['user', 'authToken', 'tenant', 'language'],
  },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken } = action.payload;

        return { ...state, authToken, user: undefined };
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;

        return { ...state, authToken, user: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return { ...state, user: undefined, authToken: undefined };
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user };
      }

      case actionTypes.SwitchTenant: {
        const { tenant } = action.payload;
        return { ...state, tenant };
      }

      case actionTypes.ChangeLanguage: {
        const { language } = action.payload;
        return { ...state, language };
      }

      default:
        return state;
    }
  },
);

export const actions = {
  login: (authToken) => ({ type: actionTypes.Login, payload: { authToken } }),
  register: (authToken) => ({
    type: actionTypes.Register,
    payload: { authToken },
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: () => ({
    type: actionTypes.UserRequested,
    payload: {},
  }),
  switchTenant: (tenant) => ({
    type: actionTypes.SwitchTenant,
    payload: { tenant },
  }),
  changeLanguage: (language) => ({
    type: actionTypes.ChangeLanguage,
    payload: { language },
  }),
  fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    // const { data: user } = yield getUserByToken();

    // yield put(actions.fulfillUser(user));
  });
}
