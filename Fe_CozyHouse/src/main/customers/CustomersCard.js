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
      <CardHeader classname= "cardHeader"><h2 className="header-card">Danh sách khách hàng</h2>
        <CardHeaderToolbar>
          {/* {hasCreatePermission && ( */}
            <button
              type="button"
              className="btn button_add"
              onClick={customersUIProps.newCustomerButtonClick}>
              Tạo mới khách hàng
              <span ><i class="plus_button fas fa-plus-circle"></i></span>
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
