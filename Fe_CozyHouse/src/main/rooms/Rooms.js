import React from 'react';
import { Route } from 'react-router-dom';
import * as actions from '../../redux/rooms/roomsActions';
import { useDispatch } from 'react-redux';
// import { RoomsLoadingDialog } from './rooms-loading-dialog/RoomsLoadingDialog';
import { RoomEditDialog } from './room-edit-dialog/RoomEditDialog';
import { RoomDeleteDialog } from './room-delete-dialog/RoomDeleteDialog';
import { RoomDetailDialog } from './room-detail-dialog/RoomDetailDialog';
import { RoomApproveDialog } from './room-approve-dialog/RoomApproveDialog';
import { RoomRejectDialog } from './room-reject-dialog/RoomRejectDialog';
// import { RoomsFetchDialog } from './rooms-fetch-dialog/RoomsFetchDialog';
import { RoomsUIProvider } from './RoomsUIContext';
import { RoomsCard } from './RoomsCard';
export default function Rooms({ history }) {
  const dispatch = useDispatch();
  const roomsUIEvents = {
    newRoomButtonClick: () => {
      history.push('/rooms/new');
    },
    openEditRoomDialog: (id) => {
      history.push(`/rooms/${id}/edit`);
    },
    openDeleteRoomDialog: (id) => {
      history.push(`/rooms/${id}/delete`);
    },
    openApproveRoomDialog: (id) => {
      history.push(`/rooms/${id}/approve`);
    },
    openRejectRoomDialog: (id, queryparams) => {
      history.push(`/rooms/${id}/reject`, queryparams);
    },
    openDetailRoomDialog: (id) => {
      history.push(`/rooms/${id}/detail`);
    },
    openApproveRoomsDialog: () => {
      history.push(`/rooms/approveRooms`);
    },
    openDeleteRoomsDialog: () => {
      history.push(`/rooms/deleteRooms`);
    },
    openFetchRoomsDialog: () => {
      history.push(`/rooms/fetch`);
    },
    openUpdateRoomsStatusDialog: () => {
      history.push('/rooms/updateStatus');
    },
  };

  return (
    <RoomsUIProvider roomsUIEvents={roomsUIEvents}>
      {/* <RoomsLoadingDialog /> */}
      <Route path="/rooms/new">
        {({ history, match }) => (
          <RoomEditDialog
            id={null}
            show={match != null}
            onHide={() => {
              history.push('/rooms');
            }}
          />
        )}
      </Route>
      <Route path="/rooms/:id/edit">
        {({ history, match }) => (
          <RoomEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/rooms');
            }}
          />
        )}
      </Route>
       {/* <Route path="/rooms/approveRooms">
        {({ history, match }) => (
          <RoomsApproveDialog
            show={match != null}
            onHide={() => {
              history.push('/rooms');
            }}
          />
        )}
      </Route> */}
      {/* <Route path="/rooms/deleteRooms">
        {({ history, match }) => (
          <RoomsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push('/rooms');
            }}
          />
        )}
      </Route> */}
      <Route path="/rooms/:id/delete">
        {({ history, match }) => (
          <RoomDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/rooms');
            }}
          />
        )}
      </Route>
      <Route path="/rooms/:id/detail">
        {({ history, match }) => (
          <RoomDetailDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/rooms');
            }}
          />
        )}
      </Route>
      <Route path="/rooms/:id/approve">
        {({ history, match }) => (
          <RoomApproveDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.location.state &&
                dispatch(actions.fetchRooms(history.location.state));
              history.push('/rooms');
            }}
          />
        )}
      </Route>
      <Route path="/rooms/:id/reject">
        {({ history, match }) => (
          <RoomRejectDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              // history.location.state &&
              //   dispatch(actions.fetchRooms(history.location.state));
              history.push('/rooms');
            }}
          />
        )}
      </Route>
      {/* <Route path="/rooms/fetch">
        {({ history, match }) => (
          <RoomsFetchDialog
            show={match != null}
            onHide={() => {
              history.push('/rooms');
            }}
          />
        )}
      </Route> */}
      {/* <Route path="/rooms/updateStatus">
        {({ history, match }) => (
          <RoomsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push('/rooms');
            }}
          />
        )}
      </Route> */}
      <RoomsCard />
    </RoomsUIProvider>
  );
}
