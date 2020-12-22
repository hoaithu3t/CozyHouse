export const CustomerStatusCssClasses = ['danger', 'success', 'info', ''];
export const CustomerStatusTitles = ['Suspended', 'Active', 'Pending', ''];
export const CustomerTypeCssClasses = ['success', 'primary', ''];

export const CustomerStatus = {
  NotApprove : 0,
  Approved : 1,
  Reject : 2,
}
export const CustomerType = {
  Owner : 0,
  Renter : 1
}
export const defaultSorted = [{ dataField: 'id', order: 'asc' }];
export const sizePerPageList = [
  { text: '3', value: 3 },
  { text: '5', value: 5 },
  { text: '10', value: 10 },
];
export const initialFilter = {
  filter: {
    name: '',
    email: '',
    customerStatus: undefined,
  },
  sortOrder: 'ASC', // ASC|DESC
  sortField: 'Name',
  pageNumber: 1,
  pageSize: 10,
};

export const initCustomer = {
  username: '',//oke
  password:'',
  CMND: '',
  address: '', //oke
  phone: '',//oke
  email: '', //oke
  birthDate: null,
  gender: null, //oke
  role: CustomerType.Renter,//oke
  status: '', 
  reasonReject: '',
  photoUrl: '',
  roomsLike: null
};
