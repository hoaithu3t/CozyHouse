import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ModalProgressBar } from '../../../components/ModalProgressBar';
import * as actions from '../../../redux/customers/customersActions';
import { useCustomersUIContext } from '../CustomersUIContext';


export function CustomerDeleteDialog({ id, show, onHide }) {
  // Customers UI Context
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      setIds: customersUIContext.setIds,
      queryParams: customersUIContext.queryParams,
    };
  }, [customersUIContext]);

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

  const deleteCustomer = () => {
    // server request for deleting customer by id
    dispatch(actions.deleteCustomer(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCustomers(customersUIProps.queryParams));
      // clear selections list
      customersUIProps.setIds([]);
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
            onClick={deleteCustomer}
            className="btn btn-danger btn-elevate">
            Xóa
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
