import React, { useMemo } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../components/Card';
// import { CustomersFilter } from "./customers-filter/CustomersFilter";
import { CustomersTable } from './customers-table/CustomersTable';
import { useCustomersUIContext } from './CustomersUIContext';
import { CustomersFilter } from './customers-filter/CustomersFilter';
// import i18n from 'i18next';
// import { usePermission } from '../../../hooks/UsePermission';

export function CustomersCard() {
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      ids: customersUIContext.ids,
      newCustomerButtonClick: customersUIContext.newCustomerButtonClick,
      openApproveCustomersDialog: customersUIContext.openApproveCustomersDialog,
    };
  }, [customersUIContext]);

  // const hasCreatePermission = usePermission('IPay.Customers.Create');

  return (
    <Card>
      <CardHeader title= "Danh sách khách hàng">
        <CardHeaderToolbar>
          {/* {hasCreatePermission && ( */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={customersUIProps.newCustomerButtonClick}>
              {"NewCustomer"}
            </button>
          {/* )} */}
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CustomersFilter />
        <CustomersTable />
        {/* {customersUIProps.ids.length > 0 && <CustomersGrouping />} */}
      </CardBody>
    </Card>
  );
}
