import axios from '../../utils/api';
import { connection } from '../../utils/signalr';
import '../../utils/signalr';
export const PAYMENT_URL = 'api/app/payment';

// CREATE =>  POST: add a new payment to the server
export function createPayment(payment) {
  return axios.post(PAYMENT_URL, payment);
}

// READ
export function getAllPayments() {
  return axios.get(PAYMENT_URL);
}

export function getPaymentById(paymentId) {
  return axios.get(`${PAYMENT_URL}/${paymentId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findPayments(queryParams) {
  return axios.get(`${PAYMENT_URL}/find`, { params: queryParams });
}

// UPDATE => PUT: update the payment on the server
export function updatePayment(payment) {
  return axios.put(`${PAYMENT_URL}/${payment.id}`, payment);
}

// UPDATE Status
export function updateStatusForPayments(ids, status) {
  return axios.post(`${PAYMENT_URL}/updateStatusForPayments`, {
    ids,
    status,
  });
}

// APPROVE
export function approvePayment(paymentId) {
  return axios.post(
    `${PAYMENT_URL}/${paymentId}/approve/${connection.connectionId}`,
  );
}
// REJECT
export function rejectPayment(customerId, reason) {
  return axios.post(`${PAYMENT_URL}/${customerId}/reject`, reason);
}

// APPROVE Payments by ids
export function approvePayments(ids) {
  return axios.post(
    `${PAYMENT_URL}/approvePayments/${connection.connectionId}`,
    ids,
  );
}

// DELETE => delete the payment from the server
export function deletePayment(paymentId) {
  return axios.delete(`${PAYMENT_URL}/${paymentId}`);
}

// DELETE Payments by ids
export function deletePayments(ids) {
  return axios.post(`${PAYMENT_URL}/paymentsdelete`, ids);
}
