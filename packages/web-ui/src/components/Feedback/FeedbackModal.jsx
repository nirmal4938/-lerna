// import { useMutation } from '@apollo/client';
import {
  Button, Buttons, Field, TextArea, Title,
} from 'ui-components';
import React, { useCallback, useState } from 'react';
// import { useToasts } from 'react-toast-notifications';
// import { SendFeedback } from '../../apollo/feedback/feedback.mutations';
import Modal from '../OverlayProvider/Modal';

export const FeedbackModal = ({ onCancel, title }) => {
    const loading = false
//   const [saveFeedback, { loading }] = useMutation(SendFeedback);
  const [feedback, setFeedback] = useState('');
//   const { addToast } = useToasts();

  const onSubmit = useCallback(async () => {
    // await saveFeedback({
    //   variables: {
    //     feedback: {
    //       location: window.location.href,
    //       feedback,
    //     },
    //   },
    // });
    onCancel();
    // addToast('Feedback has been sent.', {
    //   autoDismiss: true,
    //   appearance: 'success',
    // });
  }, [ feedback, onCancel]);

  return (
    <Modal onCancel={onCancel} style={{ maxWidth: '512px' }}>
      <Field>
        <Title style={{ marginBottom: 0 }}>{title || 'Submit Feedback'}</Title>
      </Field>
      <Field>
        <TextArea style={{ height: '140px' }} value={feedback} onChange={(e) => setFeedback(e.target.value)} />
      </Field>
      <Field style={{ paddingBottom: 0 }}>
        <Buttons style={{ float: 'right' }}>
          <Button onClick={onCancel} disabled={loading} secondary>Cancel</Button>
          <Button onClick={onSubmit} disabled={loading} padded>Submit</Button>
        </Buttons>
      </Field>
    </Modal>
  );
};
