// import { Input } from '@privacy-request/ui';
import {
  differenceInDays,
  format as dateFnsFormat,
  formatDistanceToNow,
} from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'ui-components';

const DEFAULT_FORMAT = 'human-datetime'; // Default format for dates

export const prFormatDate = (date, t, format = DEFAULT_FORMAT) => {
  let _date = date;
  if (!_date) {
    return '';
  }

  if (typeof _date === 'string' || typeof _date === 'number') {
    _date = new Date(_date);
  }

  if (format === 'human') {
    return formatDistanceToNow(_date, { addSuffix: true });
  }

  if (format === 'human-datetime') {
    if (Math.abs(differenceInDays(_date, new Date())) > 30) {
      return dateFnsFormat(_date, t('common:datetime_format'));
    }
    return formatDistanceToNow(_date, { addSuffix: true });
  }

  if (format === 'human-date') {
    if (Math.abs(differenceInDays(_date, new Date())) > 30) {
      return dateFnsFormat(_date, t('common:date_format'));
    }
    return formatDistanceToNow(_date, { addSuffix: true });
  }

  if (format === 'datetime') {
    return dateFnsFormat(_date, t('common:datetime_format'));
  }

  if (format === 'date') {
    return dateFnsFormat(_date, t('common:date_format'));
  }

  return '';
};

export const DateTimeInput = ({ date, format = DEFAULT_FORMAT }) => {
  const { t } = useTranslation();
  const [display, setDisplay] = useState(prFormatDate(date, t, format));

  useEffect(() => {
    setDisplay(prFormatDate(date, t, format));
  }, [date, format, t]);

  return <Input value={display} readOnly disabled />;
};

export const DateTime = ({ date, format = DEFAULT_FORMAT }) => {
  const { t } = useTranslation();
  const [display, setDisplay] = useState(prFormatDate(date, t, format));

  useEffect(() => {
    setDisplay(prFormatDate(date, t, format));
  }, [date, format, t]);

  return (
    <span>
      {display ? (
        <time title={date ? dateFnsFormat(new Date(date), 'PPPppp') : ''}>
          {display}
        </time>
      ) : (
        display
      )}
    </span>
  );
};
