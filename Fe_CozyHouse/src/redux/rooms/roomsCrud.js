import axios from '../../utils/api';
export const ROOM_URL = 'room';


// CREATE =>  POST: add a new room to the server
export function createRoom(room, token) {
  return axios.post(ROOM_URL, room, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
}

// READ
export function getAllRooms(token) {
  return axios.get(ROOM_URL,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
}

export function getRoomsManyView() {
  return axios.get(`${ROOM_URL}/roomManyView`);
}


export function findRoomsFilter(queryParams) {
  console.log(queryParams)
  return axios.get(`${ROOM_URL}/search`, { params: queryParams });
}

export function getRoomById(roomId) {
  return axios.get(`${ROOM_URL}/${roomId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findRooms(queryParams, token) {
  return axios.post(`${ROOM_URL}/find`, {querys: queryParams},{
    headers: {
      Authorization: "Bearer " + token,
    }
  }
  );
}

// UPDATE => PUT: update the room on the server
export function updateRoom(room) {
  return axios.put(`${ROOM_URL}/${room.id}`, room);
}

// UPDATE Status
export function updateStatusForRooms(ids, status) {
  return axios.post(`${ROOM_URL}/updateStatusForRooms`, {
    ids,
    status,
  });
}

// APPROVE
export function approveRoom(roomId) {
  return axios.post(
    `${ROOM_URL}/${roomId}/approve`,
  );
}
// REJECT
export function rejectRoom(customerId, reason) {
  return axios.post(`${ROOM_URL}/${customerId}/reject`, reason);
}

// APPROVE Rooms by ids
export function approveRooms(ids) {
  return axios.post(
    `${ROOM_URL}/approveRooms`,
    ids,
  );
}

// DELETE => delete the room from the server
export function deleteRoom(roomId) {
  return axios.delete(`${ROOM_URL}/${roomId}`);
}

// DELETE Rooms by ids
export function deleteRooms(ids) {
  return axios.post(`${ROOM_URL}/roomsdelete`, ids);
}
