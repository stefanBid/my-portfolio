import axios from 'axios';
import qs from 'qs';

const ENDPOINT = import.meta.env.VITE_STRAPI_URL || '';

export const api = axios.create({
  baseURL: `${ENDPOINT}/api`,
  timeout: 10000,
  headers: { Accept: 'application/json' },
  paramsSerializer: (p) => qs.stringify(p, { encodeValuesOnly: true }),
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    const status = err?.response?.status ?? 0;
    const msg = err?.response?.data?.error?.message ?? err?.message ?? 'Network/Unknown error';
    return Promise.reject(Object.assign(new Error(msg), { status, cause: err }));
  },
);
