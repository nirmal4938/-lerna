import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouting } from '../useRouting'; // Make sure to adjust paths according to your project structure
// import { validateDocumentNode } from './validateDocumentNode'; // Make sure to adjust paths according to your project structure
import {
  Field,
  Input,
  Label,
  LoadingProvider,
  Pagination,
} from 'ui-components';
import { useTranslation } from 'react-i18next';
import { ConfirmationDialog } from '../../components/ConfirmationDialog/ConfirmationDialog';
import { useSelection } from '../shared/useSelection';
import { validateDocumentNode } from './validateDocumentNode';
// Default options for pagination and query variables
const defaults = {
  limit: 10,
  page: 1,
  pageSizes: [25, 50, 100, 250],
  where: {},
  parameterPrefix: '',
  variables: {},
  defaultSort: [],
  skip: false,
  pollInterval: 0,
  fetchPolicy: 'cache-and-network',
  getIDQuery: undefined,
  onSelectAllFilter: () => true,
};

export const useQueryPager = function (GraphQLQuery, options = {}) {
  console.log('options', options);
  const [t] = useTranslation('common');

  const { replace } = useRouting();
  const [pageValue, setPageValue] = useState('');
  const [chooser, setChooser] = useState(false);
  const [sort, setSort] = useState(options.defaultSort || []);
  const parameterPrefix = options.parameterPrefix || defaults.parameterPrefix;
  const where = useMemo(() => options.where || defaults.where, [options.where]);
  const fetchPolicy = options.fetchPolicy || defaults.fetchPolicy;
  const { pollInterval } = options;

  const _k = useRef((key) => `${parameterPrefix}${key}`);
  const k = _k.current;

  const location = useLocation();
  const search = useRef(new URLSearchParams(location.search));
  const pathname = useRef(location.pathname);

  const limit =
    Number(search.current.get(k('limit'))) || options.limit || defaults.limit;
  const page =
    Number(search.current.get(k('page'))) || options.page || defaults.page;

  useEffect(() => {
    search.current = new URLSearchParams(location.search);
  }, [location.search]);

  useEffect(() => {
    pathname.current = location.pathname;
  }, [location.pathname]);

  const onPagerChange = useCallback(
    (number, limit) => {
      search.current.set(k('page'), number.toString());

      if (limit) {
        search.current.set(k('limit'), limit.toString());
      }

      replace(`${location.pathname}?${search.current}`)();
    },
    [replace, location.pathname, k]
  );

  useEffect(() => {
    const currPage = search.current.get(k('page'));
    if (!currPage || Number(currPage) === 1) {
      return;
    }

    search.current.set(k('page'), '1');
    replace(`${pathname.current}?${search.current}`)();
  }, [replace, k]);

  const onSortChange = useCallback((e) => {
    const { name } = e.target;

    setSort((s) => {
      const srt = s.find((_s) => _s[0] === name);

      if (!srt) {
        return [[name, 'DESC']];
      }

      if (srt[1] === 'DESC') {
        return [[name, 'ASC']];
      }

      return [[name, 'DESC']];
    });
  }, []);

  const { key, params } = validateDocumentNode(GraphQLQuery);

  const query = { limit, offset: Math.round((page - 1) * limit) };
  //   console.log('params', params, key);
  for (const param of params) {
    const key = param.key === 'offset' ? 'page' : param.key;
    let value = search.current.get(k(key));
    if (value) {
      if (param.type === 'number') {
        value = Number(value);
      }
      query[param.key] = value;
      if (param.key === 'offset') {
        query[param.key] = Math.round((page - 1) * limit);
      }
    } else {
      if (param.key === 'limit') query[param.key] = limit;
      if (param.key === 'offset')
        query[param.key] = Math.round((page - 1) * limit);
      if (param.key === 'filter' && Object.keys(where).length) {
        query.filter = JSON.stringify(options.where);
      }
    }
  }

  if (sort.length) {
    query.sort = JSON.stringify(sort);
  }

  const variables = { ...options.variables, ...query };
  const variableRef = useRef(variables);
  variableRef.current = variables;
  console.log('variables', variables);
  const { data, loading, error, refetch } = useQuery(GraphQLQuery, {
    variables,
    fetchPolicy,
    pollInterval,
    skip: options.skip,
  });
  console.log('data useQueryResult', variables, data);

  const [getIDs, { data: IDs }] = useLazyQuery(options.getIDQuery, {
    fetchPolicy: 'network-only',
  });

  const [results, count] = useMemo(() => {
    if (data?.[key]) {
      return [data[key].rows, data[key].count];
    }
    return [[], 0];
  }, [data, key]);
  const onConfirmPageChange = useCallback(
    (e) => {
      if (e instanceof Event) {
        e.stopPropagation();
        e.preventDefault();
      }

      const totalPages = Math.ceil(count / query.limit);
      const nextPage = Math.max(1, Math.min(totalPages, Number(pageValue)));

      onPagerChange(nextPage);

      setChooser(false);
      setPageValue('');
    },
    [onPagerChange, pageValue, count, query.limit]
  );

  const onCancelPageChange = useCallback(() => {
    setChooser(false);
    setPageValue('');
  }, []);
  const onSelectAllServer = useCallback(() => {
    getIDs({
      variables: {
        ...variableRef.current,
        get_ids: true,
      },
    });
  }, [getIDs]);
  const { setSelected, ...selection } = useSelection(results, {
    onSelectAllFilter: options.onSelectAllFilter,
  });
  useEffect(() => {
    if (IDs) {
      const [key] = Object.keys(IDs);
      const next = {};
      IDs[key].ids?.forEach((id) => {
        next[id.toString()] = true;
      });
      setSelected(next);
    }
  }, [IDs, setSelected]);
  return {
    results,
    loading,
    error,
    count,
    refetch,
    onSortChange,
    sort,
    onSelectAllServer,
    Pager: ({ style, noModal }) => {
      return count <= query.limit && !options.pageSizes ? (
        <div />
      ) : (
        <LoadingProvider
          overlayStyle={{ backgroundColor: 'transparent' }}
          style={{ marginTop: '40px', ...style }}
        >
          <Pagination
            onRequestPageEntry={() => setChooser(true)}
            onChange={onPagerChange}
            pageNumber={Math.round(query.offset / query.limit) + 1}
            pageSize={query.limit}
            totalEntries={count}
            totalPages={Math.ceil(count / query.limit)}
            noRecordsText={t('no_results_found')}
            loading={loading}
            pageSizes={options.pageSizes || defaults.pageSizes}
          />
          {chooser && !noModal && (
            <ConfirmationDialog
              message=""
              title="Jump to page..."
              confirmText="Jump!"
              onCancel={onCancelPageChange}
              onConfirm={onConfirmPageChange}
            >
              <form onSubmit={onConfirmPageChange}>
                <Field>
                  <Label>Page:</Label>
                  <Input
                    autoFocus
                    value={pageValue}
                    onChange={(e) => setPageValue(e.target.value)}
                  />
                </Field>
              </form>
            </ConfirmationDialog>
          )}
        </LoadingProvider>
      );
    },
  };
};
