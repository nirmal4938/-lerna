import {
    LOGIN,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGIN_CANCEL,
    LOGOUT,
    SET_PERMISSIONS,
    SET_PERMISSION_OVERRIDES,
    LOCAL_AUTH_INITIALIZED,
    REQUIRE_MFA,
    REQUIRE_MFA_CONFIGURATION,
    FINISH_MFA,
  } from './auth.types';
  
  // Action creators
  
  export const localAuthInitialized = () => ({ type: LOCAL_AUTH_INITIALIZED });
  
  export const login = () => ({ type: LOGIN });
  
  export const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });
  
  export const loginError = (payload) => ({ type: LOGIN_ERROR, payload });
  
  export const loginCancel = () => ({ type: LOGIN_CANCEL });
  
  export const logout = () => ({ type: LOGOUT });
  
  export const setPermissions = (payload) => ({ type: SET_PERMISSIONS, payload });
  
  export const setPermissionOverrides = (payload) => ({ type: SET_PERMISSION_OVERRIDES, payload });
  
  export const requireMFA = () => ({ type: REQUIRE_MFA });
  
  export const requireMFAConfiguration = (secret) => ({ type: REQUIRE_MFA_CONFIGURATION, secret });
  
  export const finishMFA = (secret) => ({ type: FINISH_MFA, secret });
  