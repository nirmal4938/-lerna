// import { useMutation } from '@apollo/react-hooks';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
// import {
//   Logout, LogoutResult, LogoutVariables,
// } from '../apollo/auth/local.mutations';
// import { pca } from '../config/msal';
// import { logout as logoutAction } from '../store/auth/auth.actions';
// import { useSelector } from '../store/useSelector';
import { useMe } from './useMe';
// import { msalAuthProvider } from '../config/msalAuthProvider';

export const useAuth = () => {
  const {
    me, loading, error,
  } = useMe({ updatePermissions: true });
  const idToken = ""
//   const [logout] = useMutation<LogoutResult, LogoutVariables>(Logout);
//   const idToken = useSelector(s => s.auth.idToken);
  const dispatch = useDispatch();
 const logout = () => {
  console.log("logout")
 }
  const onLogout = useCallback(async () => {
    if (idToken) {
    //   return pca.logoutRedirect();
    }

    // const { data } = await logout({ variables: { options: {} } });
    // if (!data?.result.error) {
    //   await dispatch(logoutAction());
    // }
    return true;
  }, [idToken, dispatch, logout]);

  return {
    me, loading, error, onLogout,
  };
};
