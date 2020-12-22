import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { ModalProgressBar } from '../../../components/ModalProgressBar';

export function RoomEditDialogHeader({ id }) {
  // Rooms Redux state
  const { roomForEdit, actionsLoading } = useSelector(
    (state) => ({
      roomForEdit: state.rooms.roomForEdit,
      actionsLoading: state.rooms.actionsLoading,
    }),
    shallowEqual,
  );

  const [title, setTitle] = useState('');
  // Title couting
  useEffect(() => {
    let _title = id ? '' : "Thêm phòng mới";
    if (roomForEdit && id) {
      _title = "Sửa thông tin";
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [roomForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
