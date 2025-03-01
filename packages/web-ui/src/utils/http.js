// import { getIdToken } from '../config/msal';
// import { SUBDOMAIN } from '../constants';
// import store from '../store';
import store from '../store';
// import { msalAuthProvider } from '../config/msalAuthProvider';
import { Provider } from '../store/auth/auth.types';

// const SUBDOMAIN = window.location.origin
const SUBDOMAIN = window.location.origin.match(/\/\/([^:]+)/)[1]; // "http://localhost:3000"
// const match = SUBDOMAIN.match(/\/\/([^:]+)/); // Extracts the part after '//' and before ':'
// const localhost = match ? match[1] : null;

/**
 * Augment Headers with Authorization and Domain
 * @param {object | Headers} headers - The headers object to augment.
 * @param {string} [domain] - Optional domain to include in the headers.
 * @returns {Promise<object | Headers>} Augmented headers object.
 */
export const augmentHeaders = async (headers, domain) => {
  // Ensure token freshness
//   if (store.getState().auth.provider === Provider.AAD) {
//     await getIdToken();
//   }

  // Get token
  const token = store.getState().auth.idToken || 'skksksskksks';

  // Support for Headers object to maintain fileEncode compatibility in Apollo
  if (headers instanceof Headers) {
    headers.set('x-pr-domain', domain || SUBDOMAIN);
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Return augmented plain object headers
  return {
    ...headers,
    authorization: token ? `Bearer ${token}` : '',
    'x-pr-domain': domain || SUBDOMAIN,
  };
};
