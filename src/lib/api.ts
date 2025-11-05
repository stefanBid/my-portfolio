import axios from 'axios';
import qs from 'qs';
import axiosRetry from 'axios-retry';
import { ApiError } from '@/lib/api-error';

const ENDPOINT = import.meta.env.VITE_STRAPI_URL || '';

export const api = axios.create({
  baseURL: `${ENDPOINT}/api`,
  timeout: 10000,
  headers: { Accept: 'application/json' },
  paramsSerializer: (p) => qs.stringify(p, { encodeValuesOnly: true }),
});

axiosRetry(api, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 300, // 300ms, 600ms, 900ms
  retryCondition: (error) => {
    const status = error?.response?.status;
    const isNetwork = axiosRetry.isNetworkOrIdempotentRequestError(error);

    //console.warn('[DEBUG] Retry condition → status:', status, 'isNetwork:', isNetwork);

    return isNetwork || status === 502 || status === 503 || status === 504;
  },
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    // 👇 Verify if it's a retriable AxiosError
    if (!err?.response) return Promise.reject(err);

    const status = err.response.status ?? 0;
    const msg = err.response?.data?.error?.message ?? err.message ?? 'Network/Unknown error';

    return Promise.reject(new ApiError(status, msg, err));
  },
);
