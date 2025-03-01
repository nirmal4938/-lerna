import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { localAuthInitialized, loginSuccess } from '../store/auth/auth.actions';
import { GetAuthenticated } from '../graphql/auth/local.queries';

export const useLocalAuthInitialize = () => {
  const dispatch = useDispatch();
  const { data, loading } = useQuery(GetAuthenticated);
  
  useEffect(() => {
    if (loading) {
      return;
    }

    if (data?.result?.error === false) {
      dispatch(loginSuccess({ email: data.result.payload }));
    } else {
      dispatch(localAuthInitialized());
    }
  }, [data, dispatch, loading]);
};
