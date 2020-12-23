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
export const TypeOfRoom = ["phòng trọ", "chung cư mimi", "nhà nguyên căn", "chung cư nguyên căn"]
export const defaultSorted = [{ dataField: 'id', order: 'asc' }];
export const sizePerPageList = [
  { text: '3', value: 3 },
  { text: '5', value: 5 },
  { text: '10', value: 10 },
];
export const initialFilter = {
  filter: {
    title: '',
    roomStatus: undefined,
  },
  sortOrder: 'ASC', // ASC|DESC
  sortField: 'Name',
  pageNumber: 1,
  pageSize: 10,
};

export const initRoom = {
  id: undefined,
  title: '', //tiêu đề
  description: '', //mới thêm
  address: '', //địa chỉ *số nhà-đường(thôn) - phường - quận - tỉnh
  nearbyPlace: '',// địa điểm công cộng xung quanh
  typeOfRoom: 0, // loại phòng trọ/ trung cư mini- vừa chuyển kiểu
  numberOfRoom: null, // số lượng phòng
  price: '',// giá phòng
  rentalTime: '', // thời gian thuê - vừa chuyển kiểu select-> string 
  area: '', // diện tích
  bathroom: false, // phòng tắm khép kín
  electricWaterHeater: false, // nóng lạnh
  kitchen: 0, // phòng bếp chung, riêng, ko nấu - vừa chuyển kiểu
  conditioner: false,// điều hòa
  balcony: false,// ban công
  electricWaterPrice: null, //giá điện dân
  otherUtility: null, //tiện ích khác
  inputTimeRemain: '', // thời gian bài đăng hiển thị
  timeRemain: 0, //tuần/tháng năm
  photoUrl: [], // ảnh bài đăng
};
