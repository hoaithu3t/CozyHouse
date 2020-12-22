import { createSlice } from '@reduxjs/toolkit';

const initialCustomersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  customerForEdit: undefined,
  customerDetail: undefined,
  allCustomers: [],
  lastError: null,
};
export const callTypes = {
  list: 'list',
  action: 'action',
};

export const customersSlice = createSlice({
  name: 'customers',
  initialState: initialCustomersState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getCustomerById
    customerFetched: (state, action) => {
      state.actionsLoading = false;
      let { customerForEdit } = action.payload;    
      state.customerForEdit = customerForEdit;
      state.error = null;
    },

    getCustomerFetched: (state, action) => {
      state.actionsLoading = false;
      state.customerDetail = action.payload.customerDetail;
      state.error = null;
    },
    // getAllCustomers
    allCustomersFetched: (state, action) => {
      state.actionsLoading = false;
      state.allCustomers = action.payload.allCustomers;
      state.entities = action.payload.allCustomers;
      state.error = null;
    },
    // findCustomers
    customersFetched: (state, action) => {
      const {entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCustomer
    customerCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.customer);
    },
    // updateCustomer
    customerUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity._id === action.payload.customer._id) {
          return action.payload.customer;
        }
        return entity;
      });
    },
    // approveCustomer
    customerAppove: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
    },
    // approveCustomers
    customersApproved: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload._ids.includes(el._id),
      );
    },
    // deleteCustomer
    customerDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el._id !== action.payload._id,
      );
    },
    // deleteCustomers
    customersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload._ids.includes(el._id),
      );
    },
    // rejectCustomer
    customerReject: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
    },
    // customersUpdateState
    customersStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity._id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
