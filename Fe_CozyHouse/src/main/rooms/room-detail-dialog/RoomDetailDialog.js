import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/rooms/roomsActions';
import { RoomEditForm } from '../room-edit-dialog/RoomEditForm';
import { initRoom } from '../RoomsUIHelpers';
import { useRoomsUIContext } from '../RoomsUIContext';


export function RoomDetailDialog({ id, show, onHide }) {
  const roomsUIContext = useRoomsUIContext();
  const {openEditRoomDialog } = useMemo(() => {
    return {
      openEditRoomDialog: roomsUIContext.openEditRoomDialog,
    };
  }, [roomsUIContext]);
  // Rooms Redux state
  const dispatch = useDispatch();
  const { actionsLoading, roomForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.rooms.actionsLoading,
      roomForEdit: state.rooms.roomForEdit,
    }),
    shallowEqual,
  );

  useEffect(() => {
    // server call for getting Room by id
    dispatch(actions.fetchRoom(id));
  }, [id, dispatch]);

  // server request for saving room
  const saveRoom = (room) => {
    if (!id) {
      // server request for creating room
      dispatch(actions.createRoom(room)).then(() => onHide());
    } else {
      // server request for updating room
      dispatch(actions.updateRoom(room)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      backdrop="static"
      aria-labelledby="example-modal-sizes-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">thông tin khách hàng</Modal.Title>
      </Modal.Header>
      <RoomEditForm
        saveRoom={saveRoom}
        editRoomButtonClick = {openEditRoomDialog}
        actionsLoading={actionsLoading}
        room={roomForEdit || initRoom}
        onHide={onHide}
        disabled = {true}
      />
    </Modal>
  );
}
