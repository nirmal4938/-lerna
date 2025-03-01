// import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { GetMeData, GetMe } from '../apollo/users/users.queries';
// import { setPermissions } from '../store/auth/auth.actions';
// import { useSelector } from '../store/useSelector';
// import { setCountryLanguage } from '../utils/setCountryLanguage';


export const useMe = (options) => {
//   const authorized = useSelector(s => s.auth.authorized);
const authorized = false
  const dispatch = useDispatch();

  const updatePermissions = options?.updatePermissions;
  const  data = []
  const   loading = false
  const   error = null

//   const {
//     data,
//     loading,
//     error,
//   } = useQuery<GetMeData>(GetMe, {
//     skip: !authorized,
//     fetchPolicy: 'cache-first',
//   });

//   const country = data?.me?.organization?.country;
//   const permissions = data?.me?.permissions;
//   const organization = data?.me?.organization;
const country = '';
  const permissions = [];
  const organization = '';

  useEffect(() => {
    // setCountryLanguage(country);
  }, [country]);

  useEffect(() => {
    // if (!updatePermissions || !permissions) {
    //   return;
    // }

    // dispatch(setPermissions(permissions));
  }, [permissions, dispatch]);

  return {
    me: data?.me,
    permissions: data?.me?.permissions,
    isISO: organization?.framework_context === 'ISO',
    requireAssetApproval: organization?.data_map_setting?.require_asset_approval,
    requireProcessingActivityApproval: organization?.data_map_setting?.require_processing_activity_approval,
    requestsDisabled: organization?.features?.requests_disabled,
    loading,
    error,
  };
};
