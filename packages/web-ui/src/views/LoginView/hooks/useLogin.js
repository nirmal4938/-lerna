import { useMutation } from '@apollo/client';
import update from 'immutability-helper';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Login } from '../../../graphql/auth/local.mutation';
import {
  login as actionLogin,
  loginSuccess as actionLoginSuccess,
  loginError as actionLoginError,
  requireMFA,
  requireMFAConfiguration,
} from '../../../store/auth/auth.actions';

export const useLogin = () => {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({});
  const [login] = useMutation(Login);

  const onLogin = useCallback(async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    try {
      await dispatch(actionLogin());
      const { data } = await login({ variables: { credentials } });
      if (!data?.result.error) {
        await dispatch(actionLoginSuccess({ email: credentials.email }));
      } else {
        // All validation issues
        await dispatch(actionLoginError('credentials_invalid'));
      }
      setCredentials(o => update(o, {
        password: { $set: '' },
        code: { $set: '' },
      }));
    } catch ({
      graphQLErrors,
      networkError,
      message,
      extraInfo,
    }) {
      console.log("networkError,networkError", networkError.result)
      if (networkError?.result?.message === 'mfa_not_configured') {
        // User hasn't configured MFA yet. Make them do so now
        await dispatch(requireMFAConfiguration(networkError?.result?.mfa_secret));
        return;
      }
      if (networkError?.result?.message === 'mfa_required') {
        await dispatch(requireMFA());
      } else if (networkError?.result?.message) {
        // Important messages from the server (eg. missing credentials)
        await dispatch(actionLoginError(networkError.result?.message));
      } else {
        // All validation issues
        await dispatch(actionLoginError('credentials_invalid'));
      }
      setCredentials(o => update(o, { code: { $set: '' } }));
    }
  }, [credentials, login, dispatch]);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setCredentials(o => update(o, { [name]: { $set: value } }));
  }, []);

  const onCancel = useCallback((e) => {
    setCredentials(o => update(o, {
      email: { $set: '' },
      password: { $set: '' },
      code: { $set: '' },
    }));
  }, [setCredentials]);

  return {
    onLogin,
    onChange,
    onCancel,
    credentials,
  };
};
