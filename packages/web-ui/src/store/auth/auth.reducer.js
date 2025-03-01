import omit from '../../utils/omit';
import {
    LOCAL_AUTH_INITIALIZED,
    LOGIN_SUCCESS,
    LOGIN,
    LOGIN_ERROR,
    REQUIRE_MFA,
    REQUIRE_MFA_CONFIGURATION,
    FINISH_MFA,
    LOGOUT
  } from './auth.types';
  
  const initialState = {
    authorized: false,
    authorizing: false,
    accessToken: '',
    idToken: '',
    email: '',
    error: '',
    initializing: true,
    
    isAuthenticated: false,
    user: null,
    initialized: false,
  };
  
  export default function (state = initialState, action) {
  const error = '';
  console.log("action.type", action.type)
    switch (action.type) {
    case LOGIN:
            return {
              ...omit(state, 'error'),
              authorizing: true,
            };
    case LOGIN_ERROR:
        return {
          ...(
            action.payload === 'mfa_invalid'
              ? state
              : omit(state, 'require_mfa', 'require_mfa_configuration', 'mfa_secret')
          ),
          authorizing: false,
          authorized: false,
          initializing: false,
          email: '',
          error: action.payload,
          accessToken: '',
          idToken: '',
        };
    case LOGIN_SUCCESS:
        return {
          ...omit(state, 'require_mfa', 'require_mfa_configuration', 'mfa_secret'),
          authorizing: false,
          authorized: true,
          initializing: false,
          email: action.payload.email,
          idToken: action.payload.idToken,
          error: '',
        //   provider: Provider.LOCAL,
        };
    case LOCAL_AUTH_INITIALIZED:
      return {
        ...omit(state, 'require_mfa', 'require_mfa_configuration', 'mfa_secret'),
        initializing: false,
      };
    case REQUIRE_MFA:
      return {
        ...omit(state, 'require_mfa', 'require_mfa_configuration', 'mfa_secret'),
        require_mfa: true,
        authorizing: false,
      };
    case REQUIRE_MFA_CONFIGURATION:
      return {
        ...omit(state, 'require_mfa', 'require_mfa_configuration', 'mfa_secret'),
        require_mfa_configuration: true,
        authorizing: false,
        mfa_secret: action.secret,
      };
    case FINISH_MFA:
      return omit(state, 'require_mfa', 'require_mfa_configuration', 'mfa_secret');
      case LOGOUT:
        return {
          ...omit(state, 'require_mfa', 'require_mfa_configuration', 'mfa_secret'),
          authorized: false,
          email: '',
          accessToken: '',
          idToken: '',
        };

    default:
    return state;
    }
  };
  
  
  