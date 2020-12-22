import axios from '../../utils/api';

export const CUSTOMERS_URL = 'customer';

// CREATE =>  POST: add a new customer to the server
export function createCustomer(customer) {
  return axios.post(CUSTOMERS_URL, customer);
}

// READ
export function getAllCustomers() {
  return axios.get(CUSTOMERS_URL);
}

export function getCustomerById(customerId) {
  return axios.get(`${CUSTOMERS_URL}/${customerId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCustomers(queryParams) {
    console.log(queryParams)
  return axios.get(`${CUSTOMERS_URL}/find`, { params: queryParams });
}

// UPDATE => PUT: update the customer on the server
export function updateCustomer(customer) {
  return axios.put(`${CUSTOMERS_URL}/${customer._id}`, customer);
}

// UPDATE Status
export function updateStatusForCustomers(ids, status) {
  return axios.post(`${CUSTOMERS_URL}/updateStatusForCustomers`, {
    ids,
    status,
  });
}

// APPROVE
export function approveCustomer(customerId) {
  return axios.post(`${CUSTOMERS_URL}/${customerId}/approve`);
}

// APPROVE Customers by ids
export function approveCustomers(ids) {
  return axios.post(`${CUSTOMERS_URL}/approveCustomers`, ids);
}

// REJECT
export function rejectCustomer(customerId, reason) {
  return axios.post(`${CUSTOMERS_URL}/${customerId}/reject`, reason);
}
// DELETE => delete the customer from the server
export function deleteCustomer(customerId) {
  return axios.delete(`${CUSTOMERS_URL}/${customerId}`);
}

// DELETE Customers by ids
export function deleteCustomers(ids) {
  return axios.post(`${CUSTOMERS_URL}/customersdelete`, ids);
}
