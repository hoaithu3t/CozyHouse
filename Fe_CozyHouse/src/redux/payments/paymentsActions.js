import * as requestFromServer from './paymentsCrud';
import { paymentsSlice, callTypes } from './paymentsSlice';
import moment from 'moment-timezone';

const { actions } = paymentsSlice;

export const fetchAllPayments = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllPayments()
    .then((response) => {
      const allPayments = response.data;
      dispatch(actions.allPaymentsFetched({ allPayments }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find payments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchPayments = (queryParams) => (dispatch) => {
  const newParams = {
    filterName: queryParams.filter.name,
    filterFromDate: queryParams.filter.fromDate,
    filterToDate: queryParams.filter.toDate,
    filterPaymentStatus: queryParams.filter.paymentStatus,
    sorting: `${queryParams.sortField} ${queryParams.sortOrder}`,
    skipCount: (queryParams.pageNumber - 1) * queryParams.pageSize,
    maxResultCount: queryParams.pageSize,
  };
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPayments(newParams)
    .then((response) => {
      const { totalCount, items } = response.data;
      items.forEach((item) => {
        item.amendmentTime = moment
          .tz(item.amendmentTime, 'ETC/GMT+0')
          .toDate();
      });
      dispatch(actions.paymentsFetched({ totalCount, entities: items }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find payments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchPayment = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.paymentFetched({ paymentForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPaymentById(id)
    .then((response) => {
      const payment = response.data;
      dispatch(actions.paymentFetched({ paymentForEdit: payment }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find payment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const getPaymentDetails = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.getPaymentFetched({ paymentDetail: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPaymentById(id)
    .then((response) => {
      const payment = response.data;
      dispatch(actions.getPaymentFetched({ paymentDetail: payment }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find payment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePayment = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePayment(id)
    .then(() => {
      dispatch(actions.paymentDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete payment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const approvePayment = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .approvePayment(id)
    .then(() => {
      dispatch(actions.paymentAppove({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't approve payment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const rejectPayment = (id, reason) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .rejectPayment(id, reason)
    .then(() => {
      dispatch(actions.paymentReject({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't reject customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const approvePayments = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .approvePayments(ids)
    .then(() => {
      dispatch(actions.paymentsApproved({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't approve payments";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createPayment = (paymentForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPayment(paymentForCreation)
    .then((response) => {
      const payment = response.data;
      dispatch(actions.paymentCreated({ payment }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create payment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePayment = (payment) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePayment(payment)
    .then(() => {
      dispatch(actions.paymentUpdated({ payment }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update payment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePaymentsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPayments(ids, status)
    .then(() => {
      dispatch(actions.paymentsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update payments status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePayments = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePayments(ids)
    .then(() => {
      dispatch(actions.paymentsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete payments";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
