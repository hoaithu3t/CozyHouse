import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../../redux/customers/customersActions';
import { useCustomersUIContext } from '../CustomersUIContext';
import { ModalProgressBar } from '../../../components/ModalProgressBar';
import i18n from 'i18next';

export function CustomersDeleteDialog({ show, onHide }) {
  // Customers UI Context
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      ids: customersUIContext.ids,
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

  // if customers weren't selected we should close modal
  useEffect(() => {
    if (!customersUIProps.ids || customersUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customersUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCustomers = () => {
    // server request for deleting customer by selected ids
    dispatch(actions.deleteCustomers(customersUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCustomers(customersUIProps.queryParams)).then(
        () => {
          // clear selections list
          customersUIProps.setIds([]);
          // closing delete modal
          onHide();
        },
      );
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
          {i18n.t('IPay::DeleteCustomer')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span> {i18n.t('IPay::ConfirmDeleteCustomer')}</span>}
        {isLoading && <span>{i18n.t('IPay::CustomerDeleting')}</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate">
            {i18n.t('IPay::Cancel')}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteCustomers}
            className="btn btn-danger btn-elevate">
            {i18n.t('IPay::DeleteCustomer')}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
