/* eslint-disable no-restricted-imports */
import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ModalProgressBar } from '../../../components/ModalProgressBar';
import * as actions from '../../../redux/rooms/roomsActions';

export function RoomApproveDialog({ id, show, onHide }) {
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

  const approveRoom = () => {
    // server request for approve room by id
    dispatch(actions.approveRoom(id)).then(() => {
      dispatch(actions.fetchRoom(id));
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg">
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Duyệt bài đăng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span>Bạn có chắc chắn duyệt bài đăng này không?</span>}
        {isLoading && <span>Đang duyệt bài đăng</span>}
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
            onClick={approveRoom}
            className="btn btn-success btn-elevate">
            Duyệt bài đăng
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
