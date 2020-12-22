import React, { useEffect, useMemo, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/rooms/roomsActions';
// import * as actionsBank from '../../../../redux/banks/banksActions';
import { RoomEditDialogHeader } from './RoomEditDialogHeader';
import { RoomEditForm } from './RoomEditForm';
import { RoomStatus, initRoom } from '../RoomsUIHelpers';
import { useRoomsUIContext } from '../RoomsUIContext';
import authCtx from "../../../contexts/auth";


export function RoomEditDialog({ id, show, onHide }) {
  // Rooms Redux state
  const dispatch = useDispatch();
  const { actionsLoading, roomForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.rooms.actionsLoading,
      roomForEdit: state.rooms.roomForEdit,
    }),
    shallowEqual,
  );
  // Rooms UI Context
  const roomsUIContext = useRoomsUIContext();
  const roomsUIProps = useMemo(() => {
    return {
      setIds: roomsUIContext.setIds,
      queryParams: roomsUIContext.queryParams,
    };
  }, [roomsUIContext]);

  //authUser
    const { authUser } = useContext(authCtx);

  // useEffect(() => {
  //   dispatch(actionsBank.fetchAllBanks());
  // }, [dispatch]);

  useEffect(() => {
    // server call for getting Room by id
    dispatch(actions.fetchRoom(id));
  }, [id, dispatch]);

  // server request for saving room
  const saveRoom = (room) => {
    if (!id) {
      // server request for creating room
      dispatch(actions.createRoom(room, authUser.token)).then(() => onHide());
    } else {
      // set roomStatus = NotApprove whenever edit room
      room.roomStatus = RoomStatus.NotApprove;
      // server request for updating room
      dispatch(actions.updateRoom(room)).then(() => {
        // refresh list after approve
        dispatch(actions.fetchRooms(roomsUIProps.queryParams));
        // clear selections list
        roomsUIProps.setIds([]);
        onHide();
      });
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      backdrop="static"
      aria-labelledby="example-modal-sizes-title-lg">
      <RoomEditDialogHeader id={id} />
      <RoomEditForm
        saveRoom={saveRoom}
        actionsLoading={actionsLoading}
        room={roomForEdit || initRoom}
        onHide={onHide}
        disabled={false}
      />
    </Modal>
  );
}
