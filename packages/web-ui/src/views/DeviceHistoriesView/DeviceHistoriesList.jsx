import React, { useCallback, useEffect, useMemo, useState } from 'react';
import update from 'immutability-helper';
import { Link } from 'react-router-dom';
import {
  Button,
  Grid,
  List,
  ListHead,
  ListRow,
  ListText,
  ListTitle,
  TitleBar,
} from 'ui-components';
import { useTranslation } from 'react-i18next';
import { useRouting } from '../../hooks/useRouting';
import Toggle from 'ui-components/src/organisms/Toggle/Toggle';
import ListFilters from './components/ListFilters';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_DEVICE_HISTORY } from '../../graphql/queries';
import { useQueryPager } from '../../hooks/useQueryPager/useQueryPager';
import { sortProps } from '../../hooks/useQueryPager/pagerUtils';
import { appendIf } from '../../utils/apendIf';
import { useMe } from '../../hooks/useMe';
import { DateTime } from '../../components/DateTime/DateTime';

export const DeviceHistoriesList = () => {
  const [t] = useTranslation('devices');
  const { push } = useRouting();
  const { isISO, me } = useMe();

  const [filter, setFilter] = useState({
    // status: { $in: ['waiting-review', 'waiting-approval', 'active'] },
  });
  const { results, sort, onSortChange, Pager } = useQueryPager(
    GET_DEVICE_HISTORY,
    { limit: 5, where: filter }
  );
  useEffect(() => {
    console.log('results', results);
  }, [results]);
  const onFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    console.log('name, value', name, value);
    const operation = {};

    if (
      name === '$business_functions.id$' ||
      name === '$sub_organizations.id$'
    ) {
      if (value.length) {
        operation[name] = { $set: { $in: value } };
      } else {
        operation.$unset = [name];
      }
    } else if (name === 'status') {
      if (value.length) {
        operation[name] = { $set: { $in: value } };
      } else {
        operation.$unset = [name];
      }
    } else if (typeof value === 'string') {
      if (value.length) {
        operation[name] = { $set: value };
      } else {
        operation.$unset = [name];
      }
    } else if (typeof value === 'boolean') {
      if (value) {
        operation[name] = { $set: value };
      } else {
        operation.$unset = [name];
      }
    }
    console.log('operation', operation);
    setFilter((f) => update(f, operation));
  }, []);
  console.log('filter', filter);
  return (
    <div>
      <TitleBar
        title={t('title')}
        right={[
          <Link key="0" to="/users/create">
            <Button padded key="cta">
              {t('create_employee')}
            </Button>
          </Link>,
        ]}
      />
      <ListFilters
        filter={filter}
        onChange={onFilterChange}
        showStatusFilter
        myAssetTranslation={`my_processing_activities${appendIf(
          isISO,
          '_service'
        )}`}
        usedFunctionsUrl="processing-activities/used-functions"
        noneSelected={true}
        bulkActions={[]}
        t={t}
      />
      <Grid container style={{ marginTop: '32px' }}>
        <List>
          <ListHead>
            <ListTitle {...sortProps('device_id', sort, onSortChange)}>
              {t('table.device_id')}
            </ListTitle>
            <ListTitle {...sortProps('device_type', sort, onSortChange)}>
              {t('table.device_type')}
            </ListTitle>
            <ListTitle {...sortProps('timestamp', sort, onSortChange)}>
              {t('table.last_maintenance')}
            </ListTitle>
            <ListTitle {...sortProps('location', sort, onSortChange)}>
              {t('table.location')}
            </ListTitle>
            <ListTitle {...sortProps('reading', sort, onSortChange)}>
              {t('table.reading')}
            </ListTitle>
            {/* <ListTitle basis="44px" style={{ paddingRight: 0 }} /> */}
          </ListHead>
          {results.map((device) => (
            <ListRow
              key={device._id}
              onClick={() => push(`/users/${device._id}`)}
            >
              <ListText bold>{device.device_id}</ListText>
              <ListText>{device.device_type}</ListText>
              <ListText>
                <DateTime date={device.timestamp} />
              </ListText>
              <ListText>{device.metadata?.location}</ListText>
              <ListText>
                {device.data?.value + ' ' + device.data?.unit}
              </ListText>
            </ListRow>
          ))}
          <Pager />
        </List>
        {/* <Route path="/users/:id" component={UserEdit} /> */}
      </Grid>
    </div>
  );
};
