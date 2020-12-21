import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/customers/customersActions';
// import * as actionsBank from '../../../../redux/banks/banksActions';
import { CustomerEditDialogHeader } from './CustomerEditDialogHeader';
import { CustomerEditForm } from './CustomerEditForm';
import { CustomerStatus, initCustomer } from '../CustomersUIHelpers';
import { useCustomersUIContext } from '../CustomersUIContext';

export function CustomerEditDialog({ id, show, onHide }) {
  // Customers Redux state
  const dispatch = useDispatch();
  const { actionsLoading, customerForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.customers.actionsLoading,
      customerForEdit: state.customers.customerForEdit,
    }),
    shallowEqual,
  );
  // Customers UI Context
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      setIds: customersUIContext.setIds,
      queryParams: customersUIContext.queryParams,
    };
  }, [customersUIContext]);

  // useEffect(() => {
  //   dispatch(actionsBank.fetchAllBanks());
  // }, [dispatch]);

  useEffect(() => {
    // server call for getting Customer by id
    dispatch(actions.fetchCustomer(id));
  }, [id, dispatch]);

  // server request for saving customer
  const saveCustomer = (customer) => {
    if (!id) {
      // server request for creating customer
      dispatch(actions.createCustomer(customer)).then(() => onHide());
    } else {
      // set customerStatus = NotApprove whenever edit customer
      customer.customerStatus = CustomerStatus.NotApprove;
      // server request for updating customer
      dispatch(actions.updateCustomer(customer)).then(() => {
        // refresh list after approve
        dispatch(actions.fetchCustomers(customersUIProps.queryParams));
        // clear selections list
        customersUIProps.setIds([]);
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
      <CustomerEditDialogHeader id={id} />
      <CustomerEditForm
        saveCustomer={saveCustomer}
        actionsLoading={actionsLoading}
        customer={customerForEdit || initCustomer}
        onHide={onHide}
        disabled={false}
      />
    </Modal>
  );
}
