import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Chip } from './Chip';

export const LikelihoodChip = ({ likelihood }) => {
  const [t] = useTranslation('systems');

  const color = useMemo(() => {
    switch (likelihood) {
      case 'unlikely':
        return '#d4ac27';
      case 'likely':
      case 'very-likely':
        return '#15c51c';
      case 'if-configured':
      default:
        return '#707070';
    }
  }, [likelihood]);

  return (
    <Chip color={color} style={{ color: 'white' }}>
      {t(`likelihood.${likelihood}`)}
    </Chip>
  );
};
