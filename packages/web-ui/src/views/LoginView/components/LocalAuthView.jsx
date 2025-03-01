import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Link } from '../../../components/Link';
import { loginCancel } from '../../../store/auth/auth.actions';
//   import { useSelector } from '../../../store/useSelector';
import { useSelector } from 'react-redux';
import { useLogin } from '../hooks/useLogin';
import { MFATokenModal } from './MFATokenModal';
import { Button, Field, Input, Label, Text } from 'ui-components';

export default () => {
  const authorized = useSelector(s => s.auth.authorized);
  const authorizing = useSelector(s => s.auth.authorizing);
  const require_mfa = useSelector(s => s.auth.require_mfa);
  const require_mfa_configuration = useSelector(s => s.auth.require_mfa_configuration);
  const mfa_secret = useSelector(s => s.auth.mfa_secret);
  const error = useSelector(s => s.auth.error);
  const {
    onLogin,
    onChange,
    onCancel: clearCredentials,
    credentials,
  } = useLogin();
  // console.log("!!!!!", require_mfa, require_mfa_configuration, mfa_secret, credentials, authorizing)

  const dispatch = useDispatch();
  const [t] = useTranslation('auth');
  const navigate = useNavigate();

  const onCancel = async () => {
    clearCredentials();
    await dispatch(loginCancel());
    navigate('/login'); // Replaced history.push() with navigate()
  };

  if (authorized) {
    return navigate('/');
  }

  return (
    <form onSubmit={onLogin}>
      <Field>
        <Label>
          {t('form.email')}
          :
        </Label>
        <Input
          autoFocus
          name="email"
          value={credentials.email || ''}
          onChange={onChange}
        />
      </Field>
      <Field>
        <Label>
          {t('form.password')}
          :
        </Label>
        <Input
          name="password"
          value={credentials.password || ''}
          type="password"
          onChange={onChange}
        />
      </Field>
      <Field>
        <Button onClick={onLogin} disabled={authorizing} type="submit" fluid>{authorizing ? t('common:form.looking_up') : t('common:form.continue')}</Button>
      </Field>
      <Link to="/login/request-password-reset">
        <Text style={{ fontSize: '16px', textAlign: 'center' }}>
          {t('login.forgot_password')}
        </Text>
      </Link>
      {require_mfa || require_mfa_configuration ? (
        <MFATokenModal
          name="code"
          value={credentials.code || ''}
          email={credentials.email}
          secret={mfa_secret}
          authorizing={authorizing}
          error={error}
          onChange={onChange}
          onLogin={onLogin}
          onCancel={onCancel}
        />
      ) : null}
    </form>
  );
};
