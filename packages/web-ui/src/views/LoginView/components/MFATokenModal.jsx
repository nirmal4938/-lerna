// import {
//     Field, Input, Button, ErrorText,
//   } from '@privacy-request/ui';
  import React from 'react';
  import { useTranslation } from 'react-i18next';
  import { QRCode } from 'react-qr-svg';
  import Modal from '../../../components/OverlayProvider/Modal';
  import { useRouting } from '../../../hooks/useRouting';
import { Button, Field, Input } from 'ui-components';
  
  const infoParaStyle = {
    marginLeft: '20px',
    marginRight: '20px',
    textAlign: 'center',
  };
  
  export const MFATokenModal = ({
    name,
    value,
    email,
    secret,
    authorizing,
    error,
    onChange,
    onLogin,
    onCancel,
  }) => {
    const { goBack } = useRouting();
    const [t] = useTranslation('common');
    return (
      <Modal title={t('auth:form.enter-token')} style={{ maxWidth: '480px' }} onCancel={goBack}>
        <form onSubmit={onLogin}>
          <p style={infoParaStyle}>Two-factor authentication increases the security of your Privacy Request account.</p>
          { secret && (
            <div>
              <p style={infoParaStyle}>You will need a compatible app on your smartphone, for example Google Authenticator, Duo, or Authy.</p>
              <QRCode
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="Q"
                style={{
                  display: 'block', margin: '0 auto', marginBottom: '15px', width: 256,
                }}
                value={`otpauth://totp/${email}?secret=${secret}&issuer=Privacy%20Request`}
              />
              <p style={infoParaStyle}>Scan the above image with your app. You will see a 6-digit code on your screen.</p>
            </div>
          )}
          <p style={infoParaStyle}>
            <span>Enter the time-based password generated by your authentication app below and click </span>
            <em>continue</em>
            .
          </p>
          { error && (
            <Field style={{ paddingBottom: 0 }}>
              <p>{t(`errors.${error}`)}</p>
              {/* <ErrorText>{t(`errors.${error}`)}</ErrorText> */}
            </Field>
          )}
          <Field fluid flex>
            <Field>
              <Input
                name="code"
                value={value}
                onChange={onChange}
                autoFocus
                style={{ textAlign: 'center' }}
              />
            </Field>
          </Field>
          <Field>
            <Button onClick={onLogin} disabled={authorizing} type="submit" fluid>{authorizing ? t('common:form.looking_up') : t('common:form.continue')}</Button>
          </Field>
          <Field>
            <Button onClick={onCancel} secondary disabled={authorizing} fluid>{t('common:form.cancel')}</Button>
          </Field>
        </form>
       </Modal>
    );
  };
  