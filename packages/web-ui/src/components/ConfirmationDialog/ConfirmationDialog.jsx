// import { Button, Buttons, Field, Text } from '@privacy-request/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../OverlayProvider/Modal';
import { Button, Buttons, Field, Text } from 'ui-components';

export const ConfirmationDialog = ({
  title = 'common:are_you_sure',
  titleVariables,
  width,
  message,
  cancelText = 'common:form.cancel',
  confirmText = 'common:yes',
  children,
  onCancel,
  onConfirm,
  disabled,
}) => {
  const [t] = useTranslation();

  const messageContent = typeof message === 'string' ? t(message) : message;

  return (
    <Modal
      title={t(title, titleVariables)}
      onCancel={disabled ? () => {} : onCancel}
      style={{ maxWidth: `${width || 380}px` }}
    >
      {messageContent && (
        <Field>
          <Text>{messageContent}</Text>
        </Field>
      )}
      {children}
      <Field flex right style={{ paddingBottom: 0 }}>
        <Buttons>
          <Button disabled={disabled} secondary onClick={onCancel}>
            {t(cancelText)}
          </Button>
          <Button disabled={disabled} onClick={onConfirm}>
            {t(confirmText)}
          </Button>
        </Buttons>
      </Field>
    </Modal>
  );
};
