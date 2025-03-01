import React from 'react';
import {
  Button,
  Grid,
  List,
  ListHead,
  ListRow,
  ListText,
  ListTitle,
  TitleBar,
  Toggle,
} from 'ui-components';
import { useTranslation } from 'react-i18next';
import { Link } from '../../components/Link';
import { useQueryPager } from '../../hooks/useQueryPager/useQueryPager';
import { GetUsers } from '../../graphql/user/user.queries';
import { Route } from 'react-router-dom';
import { UserEdit } from './UserEdit';
import { sortProps } from '../../hooks/useQueryPager/pagerUtils';
import { useMutation } from '@apollo/client';
import { UpdateUser } from '../../graphql/user/user.mutation';

export const UserList = () => {
  const [t] = useTranslation('users');
  const [saveUser] = useMutation(UpdateUser);
  const { results, sort, onSortChange, Pager } = useQueryPager(GetUsers, {
    limit: 45,
  });

  return (
    <React.Fragment>
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
        <Grid container style={{ marginTop: '32px' }}>
          <List>
            <ListHead>
              <ListTitle {...sortProps('email', sort, onSortChange)} grow={2}>
                {t('table.email')}
              </ListTitle>
              <ListTitle {...sortProps('first_name', sort, onSortChange)}>
                {t('table.first_name')}
              </ListTitle>
              <ListTitle {...sortProps('last_name', sort, onSortChange)}>
                {t('table.last_name')}
              </ListTitle>
              <ListTitle>{t('table.role')}</ListTitle>
              <ListTitle basis="44px" style={{ paddingRight: 0 }} />
            </ListHead>
            {results?.map((user) => (
              <ListRow>
                <ListText>{user?.email}</ListText>
                <ListText>{user?.first_name}</ListText>
                <ListText>{user?.last_name}</ListText>
                <ListText>{user?.role}</ListText>
                <ListText
                  basis="44px"
                  onClick={(e) => e.stopPropagation()}
                  style={{ overflow: 'visible', paddingRight: 0 }}
                >
                  <Toggle
                    name="enabled"
                    checked={user.enabled}
                    onChange={() =>
                      saveUser({
                        variables: {
                          id: user.id,
                          user: { enabled: !user.enabled },
                        },
                      })
                    }
                  />
                </ListText>
              </ListRow>
            ))}
            <Pager />
          </List>
          <Route path="/users/:id" component={UserEdit} />
        </Grid>
      </div>
    </React.Fragment>
  );
};
