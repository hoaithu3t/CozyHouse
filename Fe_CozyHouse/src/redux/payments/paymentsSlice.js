// import { createSlice } from '@reduxjs/toolkit';
// import moment from 'moment-timezone';



// const initialPaymentsState = {
//   listLoading: false,
//   actionsLoading: false,
//   totalCount: 0,
//   entities: null,
//   paymentForEdit: undefined,
//   paymentDetail: undefined,
//   allPayments: [],
//   lastError: null,
// };
// export const callTypes = {
//   list: 'list',
//   action: 'action',
// };

// export const paymentsSlice = createSlice({
//   name: 'payments',
//   initialState: initialPaymentsState,
//   reducers: {
//     catchError: (state, action) => {
//       state.error = `${action.type}: ${action.payload.error}`;
//       if (action.payload.callType === callTypes.list) {
//         state.listLoading = false;
//       } else {
//         state.actionsLoading = false;
//       }
//     },
//     startCall: (state, action) => {
//       state.error = null;
//       if (action.payload.callType === callTypes.list) {
//         state.listLoading = true;
//       } else {
//         state.actionsLoading = true;
//       }
//     },
//     // getPaymentById
//     paymentFetched: (state, action) => {
//       state.actionsLoading = false;
//       let { paymentForEdit } = action.payload;
//       if (paymentForEdit && paymentForEdit.amendmentTime) {
//         paymentForEdit.amendmentTime = moment
//           .tz(paymentForEdit.amendmentTime, 'ETC/GMT+0')
//           .toDate();
//       }
//       state.paymentForEdit = paymentForEdit;
//       state.error = null;
//     },

//     getPaymentFetched: (state, action) => {
//       state.actionsLoading = false;
//       state.paymentDetail = action.payload.paymentDetail;
//       state.error = null;
//     },
//     // getAllPayments
//     allPaymentsFetched: (state, action) => {
//       state.actionsLoading = false;
//       state.allPayments = action.payload.allPayments;
//       state.error = null;
//     },
//     // findPayments
//     paymentsFetched: (state, action) => {
//       const { totalCount, entities } = action.payload;
//       state.listLoading = false;
//       state.error = null;
//       state.entities = entities;
//       state.totalCount = totalCount;
//     },
//     // createPayment
//     paymentCreated: (state, action) => {
//       state.actionsLoading = false;
//       state.error = null;
//       state.entities.push(action.payload.payment);
//     },
//     // updatePayment
//     paymentUpdated: (state, action) => {
//       state.error = null;
//       state.actionsLoading = false;
//       state.entities = state.entities.map((entity) => {
//         if (entity.id === action.payload.payment.id) {
//           return action.payload.payment;
//         }
//         return entity;
//       });
//     },
//     // approvePayment
//     paymentAppove: (state, action) => {
//       state.error = null;
//       state.actionsLoading = false;
//       state.entities = state.entities.filter(
//         (el) => el.id !== action.payload.id,
//       );
//     },
//      // RejectPayment
//      paymentReject: (state, action) => {
//       state.error = null;
//       state.actionsLoading = false;
//     },
//     // approvePayments
//     paymentsApproved: (state, action) => {
//       state.error = null;
//       state.actionsLoading = false;
//       state.entities = state.entities.filter(
//         (el) => !action.payload.ids.includes(el.id),
//       );
//     },
//     // deletePayment
//     paymentDeleted: (state, action) => {
//       state.error = null;
//       state.actionsLoading = false;
//       state.entities = state.entities.filter(
//         (el) => el.id !== action.payload.id,
//       );
//     },
//     // deletePayments
//     paymentsDeleted: (state, action) => {
//       state.error = null;
//       state.actionsLoading = false;
//       state.entities = state.entities.filter(
//         (el) => !action.payload.ids.includes(el.id),
//       );
//     },
//     // paymentsUpdateState
//     paymentsStatusUpdated: (state, action) => {
//       state.actionsLoading = false;
//       state.error = null;
//       const { ids, status } = action.payload;
//       state.entities = state.entities.map((entity) => {
//         if (ids.findIndex((id) => id === entity.id) > -1) {
//           entity.status = status;
//         }
//         return entity;
//       });
//     },
//   },
// });
