/* eslint-disable no-restricted-imports */
import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ModalProgressBar } from '../../../components/ModalProgressBar';
import * as actions from '../../../redux/customers/customersActions';

export function CustomerApproveDialog({ id, show, onHide }) {
  // Customers Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.customers.actionsLoading }),
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

  const approveCustomer = () => {
    // server request for approve customer by id
    dispatch(actions.approveCustomer(id)).then(() => {
      dispatch(actions.fetchCustomer(id));
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
          Duyệt khách hàng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span>Bạn có chắc chắn duyệt thông tin khách hàng này không?</span>}
        {isLoading && <span>Đang duyệt khách hàng</span>}
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
            onClick={approveCustomer}
            className="btn btn-success btn-elevate">
            Duyệt khách hàng
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
