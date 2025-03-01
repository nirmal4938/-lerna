import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
// import {
//   Logout, LogoutResult, LogoutVariables,
// } from '../apollo/auth/local.mutations';
import { Logout } from '../graphql/auth/local.mutation';
// import { pca } from '../config/msal';
import { logout as logoutAction } from '../store/auth/auth.actions';
// import { useSelector } from '../store/useSelector';
import { useMe } from './useMe';
import { useSelector } from 'react-redux';
// import { msalAuthProvider } from '../config/msalAuthProvider';

export const useAuth = () => {
  const {
    me, loading, error,
  } = useMe({ updatePermissions: true });
  const [logout] = useMutation(Logout);
  const idToken = useSelector(s => s.auth.idToken);
  const dispatch = useDispatch();
  const onLogout = useCallback(async () => {
    if (idToken) {
    //   return pca.logoutRedirect();
    }

    const { data } = await logout({ variables: { options: {} } });
    if (!data?.result.error) {
      await dispatch(logoutAction());
    }
    return true;
  }, [idToken, dispatch, logout]);

  return {
    me, loading, error, onLogout,
  };
};
