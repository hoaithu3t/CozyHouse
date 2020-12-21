import * as requestFromServer from './customersCrud';
import { customersSlice, callTypes } from './customersSlice';

const { actions } = customersSlice;

export const fetchAllCustomers = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllCustomers()
    .then((response) => {
      const allCustomers = response.data;
      dispatch(actions.allCustomersFetched({ allCustomers }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find customers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCustomers = (queryParams) => (dispatch) => {
  const newParams = {
    filterName: queryParams.filter.name,
    filterEmail: queryParams.filter.email,
    filterCustomerStatus: queryParams.filter.customerStatus,
    sorting: `${queryParams.sortField} ${queryParams.sortOrder}`,
    skipCount: (queryParams.pageNumber - 1) * queryParams.pageSize,
    maxResultCount: queryParams.pageSize,
  };
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCustomers(newParams)
    .then((response) => {
      const { totalCount, items } = response.data;     
      dispatch(actions.customersFetched({ totalCount, entities: items }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find customers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCustomer = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.customerFetched({ customerForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCustomerById(id)
    .then((response) => {
      const customer = response.data;
      dispatch(actions.customerFetched({ customerForEdit: customer }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const getCustomerDetails = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.getCustomerFetched({ customerDetail: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCustomerById(id)
    .then((response) => {
      const customer = response.data;
      dispatch(actions.getCustomerFetched({ customerDetail: customer }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCustomer = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCustomer(id)
    .then(() => {
      dispatch(actions.customerDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const approveCustomer = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .approveCustomer(id)
    .then(() => {
      dispatch(actions.customerAppove({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't approve customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const approveCustomers = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .approveCustomers(ids)
    .then(() => {
      dispatch(actions.customersApproved({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't approve customers";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const rejectCustomer = (id, reason) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .rejectCustomer(id, reason)
    .then(() => {
      dispatch(actions.customerReject({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't reject customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCustomer = (customerForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCustomer(customerForCreation)
    .then((response) => {
      const customer = response.data;
      dispatch(actions.customerCreated({ customer }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCustomer = (customer) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCustomer(customer)
    .then(() => {
      dispatch(actions.customerUpdated({ customer }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCustomersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCustomers(ids, status)
    .then(() => {
      dispatch(actions.customersStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update customers status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCustomers = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCustomers(ids)
    .then(() => {
      dispatch(actions.customersDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete customers";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
