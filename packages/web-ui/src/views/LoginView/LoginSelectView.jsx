// import { useQuery } from '@apollo/client';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// import { GetAuthenticationStrategies } from '../../apollo/auth/local.queries';
import Divider from '../../components/Divider';
// import { loginRedirect } from '../../config/msal';
// import { useSelector } from '../../store/useSelector';
import { useSelector } from 'react-redux';
import LocalAuthView from './components/LocalAuthView';
import { GetAuthenticationStrategies } from '../../graphql/auth/local.queries';
import { Button, Field, LoadingIndicator, LoadingProvider, Text } from 'ui-components';
import NoAuthorizationTemplate from 'ui-components/src/organisms/NoAuthorizationTemplate/NoAuthorizationTemplate';
import { useLazyQuery, useQuery } from '@apollo/client';
// import { useLazyQuery, useQuery } from '@apollo/client';

export const PrivacyLink = styled.a`
  font-size: 12px;
  margin: 0 6px;
  color: ${({ theme }) => theme.CTA_COLOR};

  &:visited {
    color: ${({ theme }) => theme.CTA_COLOR};
  }
`;
PrivacyLink.defaultProps = {
  target: '_blank',
  rel: 'noreferrer',
};

export default () => {
  const navigate = useNavigate()
  const authorized = useSelector(s => s.auth.authorized);
  const authorizing = useSelector(s => s.auth.authorizing);
  const error = useSelector(s => s.auth.error);
  // const domain = window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
  const domain = window.location.hostname;
  // console.log("domain", domain)
  const { data, loading, error: _error } = useQuery(GetAuthenticationStrategies, {
    variables: { domain },
    errorPolicy: 'all',
  });

  const [t] = useTranslation('auth');
//   const onMicrosoft = useCallback(() => {
//     loginRedirect();
//   }, []);
useEffect(() => {
  console.log('Current State:', { data, loading, _error });
}, [data, loading, _error]);
  if (authorized) {
    return navigate('/');
  }

  return (
    <LoadingProvider>
      {loading && <LoadingIndicator />}
      <NoAuthorizationTemplate>
        {error && (
          <Field>
            {/* <ErrorText>{t(`common:errors.${error}`)}</ErrorText> */}
            <p>{t(`common:errors.${error}`)}</p>
          </Field>
        )}
        { data?.result?.local && (<LocalAuthView />) }

        {/* { data?.result?.local && (data?.result?.azure || data?.result?.strategies?.length > 0) && (<Divider style={{ margin: '2em' }} />) } */}

        {/* { data?.result?.azure && (
          <Field>
            <Button secondary onClick={onMicrosoft} disabled={authorizing} fluid>{authorizing ? t('common:form.looking_up') : t('form.microsoft')}</Button>
          </Field>
        )} */}
        { data?.result?.strategies?.map(({ name, login_url }, i) => (
          <Field key={i}>
            <Button secondary fluid href={login_url}>{name}</Button>
          </Field>
        ))}
        {/* <Field style={{
          paddingBottom: 0, display: 'flex', justifyContent: 'center',
        }}
        >
          <PrivacyLink href="https://privacyrequest.com/privacy-policy">{t('privacy_policy')}</PrivacyLink>
          <Text style={{ transform: 'translateY(-2px)' }}>|</Text>
          <PrivacyLink href="https://privacyrequest.com/acceptable-use-policy">{t('applicable_use')}</PrivacyLink>
        </Field> */}
      </NoAuthorizationTemplate>
    </LoadingProvider>
  );
};
