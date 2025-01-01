import React, { useMemo } from 'react';
import { Dropdown, Input, CheckBox, Grid } from 'ui-components'; // Assuming these components exist
import { ComponentBar, ComponentBarItem } from 'ui-components'; // Assuming ComponentBar and ComponentBarItem components exist
import { useTranslation } from 'react-i18next';
import evt from '../../../utils/evt';
import throttle from 'lodash/throttle';

const ListFilters = ({
  filter,
  showSourceFilter,
  multi_org,
  subs,
  showStatusFilter,
  isAdminRoute,
  functions,
  noneSelected,
  hideMyAssets,
  onChange,
  bulkActions,
  statuses,
  myAssetTranslation,
}) => {
  const [t] = useTranslation('systems');

  const throttledChange = useMemo(
    () =>
      throttle(
        (value) => {
          onChange(evt('q', value));
        },
        500,
        { leading: true, trailing: true }
      ),
    [onChange]
  );

  return (
    <ComponentBar>
      <Grid innerStyle={{ justifyContent: 'space-between' }}>
        <ComponentBarItem>
          <Input
            search
            placeholder={t('common:form.search')}
            defaultValue={filter?.q || ''}
            onChange={(e) => throttledChange(e.target.value)}
            style={{ width: '220px' }}
          />
          {!noneSelected && (
            <Dropdown
              items={bulkActions}
              placeholder="Actions..."
              style={{
                marginLeft: '16px',
              }}
            />
          )}
        </ComponentBarItem>
        <div
          style={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
          }}
        >
          {showSourceFilter && (
            <ComponentBarItem>
              <Dropdown
                multiple
                style={{ width: '220px' }}
                placeholder={t('filter.all_sources')}
                name="source"
                items={[]}
                displayValue={t('filter.n_sources', {
                  count: filter.source?.$in?.length || 0,
                })}
                value={filter.source?.$in || []}
                onChange={onChange}
              />
            </ComponentBarItem>
          )}
          {multi_org && subs.length ? (
            <ComponentBarItem>
              <Dropdown
                multiple
                style={{ width: '220px' }}
                name="$sub_organizations.id$"
                placeholder={t('filter.all_subsidiaries')}
                items={subs.map((r) => ({ text: r.name, value: r.id }))}
                onChange={onChange}
                displayValue={t('filter.n_subsidiaries', {
                  count: filter['$sub_organizations.id$']?.$in?.length || 0,
                })}
                value={filter['$sub_organizations.id$']?.$in || []}
              />
            </ComponentBarItem>
          ) : (
            ''
          )}
          {showStatusFilter && !isAdminRoute && (
            <ComponentBarItem>
              <Dropdown
                multiple
                style={{ width: '220px' }}
                name="status"
                items={statuses}
                onChange={onChange}
                value={filter.status?.$in || []}
                displayValue={t('filter.n_statuses', {
                  count: filter.status?.$in?.length || 0,
                })}
                placeholder={t('filter.all_statuses')}
              />
            </ComponentBarItem>
          )}
          <ComponentBarItem>
            {/* <TagItemDropdown
              type="business_function"
              name="$business_functions.id$"
              placeholder={t('filter.all_functions')}
              onChange={onChange}
              value={filter['$business_functions.id$']?.$in || []}
              multiple
              style={{ width: '220px' }}
              displayValue={t('filter.n_functions', {
                count: filter['$business_functions.id$']?.$in?.length || 0,
              })}
              items={functions}
            /> */}
          </ComponentBarItem>
          {!hideMyAssets && !isAdminRoute && (
            <Grid
              innerStyle={{ justifyContent: 'flex-end', marginLeft: '0px' }}
            >
              <ComponentBarItem style={{ marginRight: 0, paddingLeft: '0px' }}>
                <CheckBox
                  label={t(myAssetTranslation)}
                  checked={filter.contacts}
                  onChange={() => onChange(('contacts', !filter.contacts))}
                />
              </ComponentBarItem>
            </Grid>
          )}
        </div>
      </Grid>
    </ComponentBar>
  );
};

// Dummy data and functions for testing
ListFilters.defaultProps = {
  filter: {
    q: '',
    source: { $in: [] },
    status: { $in: [] },
    '$sub_organizations.id$': { $in: [] },
    '$business_functions.id$': { $in: [] },
    contacts: false,
  },
  showSourceFilter: true,
  multi_org: true,
  subs: [
    { id: '1', name: 'Sub 1' },
    { id: '2', name: 'Sub 2' },
  ],
  showStatusFilter: true,
  isAdminRoute: false,
  functions: [
    { text: 'Function 1', value: 'function1' },
    { text: 'Function 2', value: 'function2' },
  ],
  noneSelected: false,
  hideMyAssets: false,
  bulkActions: [
    { text: 'Action 1', value: 'action1' },
    { text: 'Action 2', value: 'action2' },
  ],
  statuses: [
    { text: 'Active', value: 'active' },
    { text: 'Inactive', value: 'inactive' },
  ],
  myAssetTranslation: 'My Assets',
  throttledChange: (value) => {
    console.log('Search input changed:', value);
  },
  onChange: (value) => {
    console.log('Filter changed:', value);
  },
  t: (key) => key, // Dummy translation function
};

export default ListFilters;
