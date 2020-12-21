/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { shallowEqual, useSelector } from 'react-redux';
import * as actions from '../../../../redux/customers/customersActions';
import * as actionsCustomer from '../../../../redux/customers/customersActions';
import * as actionsBank from '../../../../redux/banks/banksActions';

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../components/Card';
import { CustomerEditForm } from './CustomerEditForm';
import { ModalProgressBar } from '../../../components/ModalProgressBar';

import i18n from '../../../helpers/node_modules/i18next';

import { initCustomer } from '../CustomersUIHelpers';

export default function CustomerEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const [tab, setTab] = useState('basic');
  const dispatch = useDispatch();
  const { actionsLoading, customerForEdit, allBanks } = useSelector(
    (state) => ({
      actionsLoading: state.customers.actionsLoading,
      customerForEdit: state.customers.customerForEdit,
      allBanks: state.banks.allBanks,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(actionsBank.fetchAllBanks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(actionsCustomer.fetchAllCustomers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(actions.fetchCustomer(id));
  }, [id, dispatch]);

  const saveCustomer = (values) => {
    if (!id) {
      dispatch(actions.createCustomer(values)).then(() =>
        backToCustomersList(),
      );
    } else {
      dispatch(actions.updateCustomer(values)).then(() =>
        backToCustomersList(),
      );
    }
  };

  const backToCustomersList = () => {
    history.push(`/customers`);
  };

  return (
    <>
      <Card>
        {actionsLoading && <ModalProgressBar />}
        <CardHeader title={i18n.t('IPay::EditCustomer')}>
          <CardHeaderToolbar>
            <button
              type="button"
              onClick={backToCustomersList}
              className="btn btn-light">
              <i className="fa fa-arrow-left"></i>
              {i18n.t('AbpUi::Back')}
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          {tab === 'basic' && (
            <CustomerEditForm
              allBanks={allBanks}
              actionsLoading={actionsLoading}
              customer={customerForEdit || initCustomer}
              saveCustomer={saveCustomer}
              onHide={backToCustomersList}
              disabled={false}
            />
          )}
        </CardBody>
      </Card>
    </>
  );
}
