import axios from '../../utils/api';
export const PAYMENT_URL = 'room';


// CREATE =>  POST: add a new room to the server
export function createRoom(room, token) {
  return axios.post(PAYMENT_URL, room, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
}

// READ
export function getAllRooms(token) {
  return axios.get(PAYMENT_URL,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function getRoomById(roomId) {
  return axios.get(`${PAYMENT_URL}/${roomId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findRooms(queryParams) {
  return axios.get(`${PAYMENT_URL}/find`, { params: queryParams });
}

// UPDATE => PUT: update the room on the server
export function updateRoom(room) {
  return axios.put(`${PAYMENT_URL}/${room.id}`, room);
}

// UPDATE Status
export function updateStatusForRooms(ids, status) {
  return axios.post(`${PAYMENT_URL}/updateStatusForRooms`, {
    ids,
    status,
  });
}

// APPROVE
export function approveRoom(roomId) {
  return axios.post(
    `${PAYMENT_URL}/${roomId}/approve`,
  );
}
// REJECT
export function rejectRoom(customerId, reason) {
  return axios.post(`${PAYMENT_URL}/${customerId}/reject`, reason);
}

// APPROVE Rooms by ids
export function approveRooms(ids) {
  return axios.post(
    `${PAYMENT_URL}/approveRooms`,
    ids,
  );
}

// DELETE => delete the room from the server
export function deleteRoom(roomId) {
  return axios.delete(`${PAYMENT_URL}/${roomId}`);
}

// DELETE Rooms by ids
export function deleteRooms(ids) {
  return axios.post(`${PAYMENT_URL}/roomsdelete`, ids);
}
