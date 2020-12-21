import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/customers/customersActions';
import { CustomerEditForm } from '../customer-edit-dialog/CustomerEditForm';
import { initCustomer } from '../CustomersUIHelpers';
import { useCustomersUIContext } from '../CustomersUIContext';


export function CustomerDetailDialog({ id, show, onHide }) {
  const customersUIContext = useCustomersUIContext();
  const {openEditCustomerDialog } = useMemo(() => {
    return {
      openEditCustomerDialog: customersUIContext.openEditCustomerDialog,
    };
  }, [customersUIContext]);
  // Customers Redux state
  const dispatch = useDispatch();
  const { actionsLoading, customerForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.customers.actionsLoading,
      customerForEdit: state.customers.customerForEdit,
    }),
    shallowEqual,
  );

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
      // server request for updating customer
      dispatch(actions.updateCustomer(customer)).then(() => onHide());
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
      <CustomerEditForm
        saveCustomer={saveCustomer}
        editCustomerButtonClick = {openEditCustomerDialog}
        actionsLoading={actionsLoading}
        customer={customerForEdit || initCustomer}
        onHide={onHide}
        disabled = {true}
      />
    </Modal>
  );
}
