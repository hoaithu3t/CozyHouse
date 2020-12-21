import axios from 'axios';
import config from '../config';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  responseType: 'json',
});

export const setupAxios = (store) => {
  const requestHandler = (request) => {
    const {
      auth: { authToken, tenant, language },
    } = store.getState();

    if (authToken) {
      request.headers.Authorization = `Bearer ${authToken}`;
    }

    if (language) {
      request.headers['Accept-Language'] = language;
    }

    if (tenant) {
      request.headers.__tenant = tenant.tenantId;
    }

    return request;
  };

  const successHandler = (response) => {
    return response;
  };

  const errorHandler = (error) => {
    const errorRes = error.response;
    if (errorRes) {
      if (errorRes.headers._abperrorformat && errorRes.status === 401) {
        // store.dispatch(PersistentStorageActions.setToken({}));
        // TODO: reset token
      }

      showError({ error: errorRes.data.error || {}, status: errorRes.status });
    } else {
      toast.error('An unexpected error has occurred');
    }

    return Promise.reject(error);
  };

  const showError = ({ error, status }) => {
    let message = '';
    // let title = i18n.t('AbpAccount::DefaultErrorMessage');

    if (typeof error === 'string') {
      message = error;
    } else if (error.details) {
      message = error.details;
      // title = error.message;
    } else if (error.message) {
      message = error.message;
    } else {
      switch (status) {
        case 401:
          // title = i18n.t('AbpAccount::DefaultErrorMessage401');
          message = 'ErrorMessage401Detail'; // message = i18n.t('AbpAccount::DefaultErrorMessage401Detail');
          break;
        case 403:
          // title = i18n.t('AbpAccount::DefaultErrorMessage403');
          message = 'ErrorMessage403Detail'; // message = i18n.t('AbpAccount::DefaultErrorMessage403Detail');
          break;
        case 404:
          // title = i18n.t('AbpAccount::DefaultErrorMessage404');
          message = 'ErrorMessage404Detail'; // message = i18n.t('AbpAccount::DefaultErrorMessage404Detail');
          break;
        case 500:
          // title = i18n.t('AbpAccount::500Message');
          message = 'ErrorMessage500Detail'; // message = i18n.t('AbpAccount::InternalServerErrorMessage');
          break;
        default:
          break;
      }
    }

    toast.error(`${message}`);
  };

  axiosInstance.interceptors.request.use((request) => requestHandler(request));

  axiosInstance.interceptors.response.use(
    (response) => successHandler(response),
    (error) => errorHandler(error),
  );
};

export default axiosInstance;
