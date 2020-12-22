import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ModalProgressBar } from '../../../components/ModalProgressBar';
import * as actions from '../../../redux/rooms/roomsActions';
import { useRoomsUIContext } from '../RoomsUIContext';


export function RoomDeleteDialog({ id, show, onHide }) {
  // Rooms UI Context
  const roomsUIContext = useRoomsUIContext();
  const roomsUIProps = useMemo(() => {
    return {
      setIds: roomsUIContext.setIds,
      queryParams: roomsUIContext.queryParams,
    };
  }, [roomsUIContext]);

  // Rooms Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.rooms.actionsLoading }),
    shallowEqual,
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteRoom = () => {
    // server request for deleting room by id
    dispatch(actions.deleteRoom(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchRooms(roomsUIProps.queryParams));
      // clear selections list
      roomsUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg">
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Xóa người dùng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span>Bạn có chắc chắn muốn xóa bỏ người dùng này không?</span>}
        {isLoading && <span>Đang xóa người dùng...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate">
            Hủy
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteRoom}
            className="btn btn-danger btn-elevate">
            Xóa
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
