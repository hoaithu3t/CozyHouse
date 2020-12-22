export const RoomStatusCssClasses = ['danger', 'success', 'info', ''];
export const RoomStatusTitles = ['Suspended', 'Active', 'Pending', ''];
export const RoomTypeCssClasses = ['success', 'primary', ''];
export const Gender = {
  Male : 0,
  Female : 1,
}
export const RoomStatus = {
  NotApprove : 0,
  Approved : 1,
  Reject : 2,
}
export const timeRemainType = {
  Week : 0,
  Month: 1,
  Year: 2
}
export const kitchenType = {  
  privateKitchen: 0,  
  sharedKitchen : 1,  
  notCooking: 2
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
    roomStatus: undefined,
  },
  sortOrder: 'ASC', // ASC|DESC
  sortField: 'Name',
  pageNumber: 1,
  pageSize: 10,
};

export const initRoom = {
  id: undefined,
  title: '',
  address: '',
  nearbyPlace: '',
  typeOfRoom: 0,
  numberOfRoom: '',
  price: '',
  rentalTime: '',
  area: '',
  bathroom: '',
  electricWaterHeater: '',
  kitchen: null,
  conditioner: null,
  balcony: null,
  electricWaterPrice: null,
  otherUtility: null,
  inputTimeRemain: '',
  timeRemain: null,
};
