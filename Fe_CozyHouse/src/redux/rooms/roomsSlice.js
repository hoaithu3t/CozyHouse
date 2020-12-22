import { createSlice } from '@reduxjs/toolkit';
// import moment from 'moment-timezone';



const initialRoomsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  roomForEdit: undefined,
  roomDetail: undefined,
  allRooms: [],
  lastError: null,
};
export const callTypes = {
  list: 'list',
  action: 'action',
};

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState: initialRoomsState,
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
    // getRoomById
    roomFetched: (state, action) => {
      state.actionsLoading = false;
      let { roomForEdit } = action.payload;     
      state.roomForEdit = roomForEdit;
      state.error = null;
    },

    getRoomFetched: (state, action) => {
      state.actionsLoading = false;
      state.roomDetail = action.payload.roomDetail;
      state.error = null;
    },
    // getAllRooms
    allRoomsFetched: (state, action) => {
      state.actionsLoading = false;
      state.allRooms = action.payload.allRooms;
      state.entities = action.payload.allRooms;
      state.error = null;
    },
    // findRooms
    roomsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRoom
    roomCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.room);
    },
    // updateRoom
    roomUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.room.id) {
          return action.payload.room;
        }
        return entity;
      });
    },
    // approveRoom
    roomAppove: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id,
      );
    },
     // RejectRoom
     roomReject: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
    },
    // approveRooms
    roomsApproved: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id),
      );
    },
    // deleteRoom
    roomDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id,
      );
    },
    // deleteRooms
    roomsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id),
      );
    },
    // roomsUpdateState
    roomsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
