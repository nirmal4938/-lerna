// import { SideNavigationItem } from '@privacy-request/ui';
import {SideNavigationItem} from 'ui-components';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FeedbackIcon } from '../icons/FeedbackIcon';
import { FeedbackModal } from './FeedbackModal';

export const Feedback = () => {
  const [show, setShowing] = useState(false);
  const [t] = useTranslation('common');

  const onCancel = useCallback((e) => {
    e?.stopPropagation?.();
    setShowing(false);
  }, []);

  return (
    <a style={{ textDecoration: 'none' }} href="https://privacyrequest.notion.site/User-Guides-0d79f8b2aa234285bffa4936405f3c34" target="_blank" rel="noreferrer">
      <SideNavigationItem key="1" icon={<FeedbackIcon style={{ marginRight: '8px' }} />}>
        <span>{t('help_guides')}</span>
        {show && <FeedbackModal onCancel={onCancel} />}
      </SideNavigationItem>
    </a>
  );
};
