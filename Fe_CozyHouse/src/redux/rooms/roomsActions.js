import * as requestFromServer from './roomsCrud';
import { roomsSlice, callTypes } from './roomsSlice';
// import moment from 'moment-timezone';

const { actions } = roomsSlice;

export const fetchAllRooms = (token) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllRooms(token)
    .then((response) => {
      const allRooms = response.data;
      dispatch(actions.allRoomsFetched({ allRooms }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find rooms";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchRooms = (queryParams, token) => (dispatch) => {
  const newParams = {
    filterTitle: queryParams.filter.title,
    filterRoomStatus: queryParams.filter.roomStatus,
    sorting: `${queryParams.sortField} ${queryParams.sortOrder}`,
    skipCount: (queryParams.pageNumber - 1) * queryParams.pageSize,
    maxResultCount: queryParams.pageSize,
  };
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findRooms(newParams, token)
    .then((response) => {
      const { totalCount, room } = response.data;
      
      dispatch(actions.roomsFetched({ totalCount, entities: room }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find rooms";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchRoomsFilter = (queryParams) => (dispatch) => {
  const newParams = {
    filterTitle: queryParams.filter.title,
    filterRoomStatus: queryParams.filter.roomStatus,
    skipCount: (queryParams.pageNumber - 1) * queryParams.pageSize,
    maxResultCount: queryParams.pageSize,
  };
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findRoomsFilter(newParams)
    .then((response) => {
      const { totalCount, room } = response.data;
      
      dispatch(actions.roomsFetched({ totalCount, entities: room }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find rooms";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchRoom = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.roomFetched({ roomForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRoomById(id)
    .then((response) => {
      const room = response.data;
      dispatch(actions.roomFetched({ roomForEdit: room }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find room";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const getRoomDetails = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.getRoomFetched({ roomDetail: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRoomById(id)
    .then((response) => {
      const room = response.data;
      dispatch(actions.getRoomFetched({ roomDetail: room }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find room";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteRoom = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRoom(id)
    .then(() => {
      dispatch(actions.roomDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete room";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const approveRoom = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .approveRoom(id)
    .then(() => {
      dispatch(actions.roomAppove({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't approve room";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const rejectRoom = (id, reason) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .rejectRoom(id, reason)
    .then(() => {
      dispatch(actions.roomReject({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't reject customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const approveRooms = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .approveRooms(ids)
    .then(() => {
      dispatch(actions.roomsApproved({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't approve rooms";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createRoom = (roomForCreation, authToken) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createRoom(roomForCreation, authToken)
    .then((response) => {
      const room = response.data;
      dispatch(actions.roomCreated({ room }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create room";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateRoom = (room) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateRoom(room)
    .then(() => {
      dispatch(actions.roomUpdated({ room }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update room";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateRoomsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForRooms(ids, status)
    .then(() => {
      dispatch(actions.roomsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update rooms status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteRooms = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRooms(ids)
    .then(() => {
      dispatch(actions.roomsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete rooms";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
