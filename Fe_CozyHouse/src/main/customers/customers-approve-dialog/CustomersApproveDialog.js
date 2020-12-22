/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ModalProgressBar } from '../../../components/ModalProgressBar';
import * as actions from '../../../../redux/customers/customersActions';
import { useCustomersUIContext } from '../CustomersUIContext';
import i18n from 'i18next';

export function CustomersApproveDialog({ show, onHide }) {
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

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  // if there weren't selected Customers we should close modal
  useEffect(() => {
    if (!customersUIProps.ids || customersUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customersUIProps.ids]);

  const approveCustomers = () => {
    dispatch(actions.approveCustomers(customersUIProps.ids)).then(() => {
      // clear selections list
      customersUIProps.setIds([]);
      // refresh list after deletion
      dispatch(actions.fetchCustomers(customersUIProps.queryParams)).then(
        () => {
          // closing approve modal
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
      {isLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {i18n.t('IPay::CustomersApprove')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            {i18n.t('IPay::AreYouSureToPermanentlyApproveSelectedCustomers')}
          </span>
        )}
        {isLoading && <span>{i18n.t('IPay::CustomersAreApproving')}</span>}
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
            onClick={approveCustomers}
            className="btn btn-success btn-elevate">
            {i18n.t('IPay::Approve')}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
