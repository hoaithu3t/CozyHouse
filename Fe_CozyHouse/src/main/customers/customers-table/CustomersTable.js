// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import { Tabs, Tab } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/customers/customersActions';
import { isEqual } from 'lodash';

import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from '../../../helpers';
import * as uiHelpers from '../CustomersUIHelpers';
import * as columnFormatters from './column-formatters';
import { Pagination } from '../../../components/pagination/Pagination';
import { useCustomersUIContext } from '../CustomersUIContext';
// import { usePermission } from '../../../../hooks/UsePermission';

export function CustomersTable() {
  // Customers UI Context
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      ids: customersUIContext.ids,
      setIds: customersUIContext.setIds,
      queryParams: customersUIContext.queryParams,
      setQueryParams: customersUIContext.setQueryParams,
      openApproveCustomerDialog: customersUIContext.openApproveCustomerDialog,
      openEditCustomerDialog: customersUIContext.openEditCustomerDialog,
      openDeleteCustomerDialog: customersUIContext.openDeleteCustomerDialog,
      openDetailCustomerDialog: customersUIContext.openDetailCustomerDialog,
      openRejectCustomerDialog: customersUIContext.openRejectCustomerDialog,
    };
  }, [customersUIContext]);

  const checkTag = (key) => {
    const newQueryParams = {
      ...customersUIContext.queryParams,
      filter: { ...customersUIContext.queryParams.filter },
    };

    newQueryParams.filter.customerStatus = key || undefined;

    if (!isEqual(newQueryParams, customersUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      customersUIProps.setQueryParams(newQueryParams);
    }
  };

  // Getting curret state of customers list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.customers }),
    shallowEqual,
  );
  const { totalCount, entities, listLoading } = currentState;

  // Customers Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    customersUIProps.setIds([]);
    dispatch(actions.fetchAllCustomers(customersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customersUIProps.queryParams, dispatch]);

  // Table columns
  const columns = [
    {
      dataField: 'username',
      text: "Tên người dùng",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'CMND',
      text: "Số CMND",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: 'address',
      text: "Địa chỉ",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'email',
      text: "Email",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'phone',
      text: "Số điện thoại",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'customerStatus',
      text: "Trạng thái",
      sort: false,
      formatter: columnFormatters.StatusCustomerColumnFormatter,
      sortCaret: sortCaret,
    },
    {
      dataField: 'action',
      text: "Hành động",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        queryParams: customersUIProps.queryParams,
        openEditCustomerDialog: customersUIProps.openEditCustomerDialog,
        openDeleteCustomerDialog: customersUIProps.openDeleteCustomerDialog,
        openDetailCustomerDialog: customersUIProps.openDetailCustomerDialog,
        openApproveCustomerDialog: customersUIProps.openApproveCustomerDialog,
        openRejectCustomerDialog: customersUIProps.openRejectCustomerDialog,
        // hasEditPermission: usePermission('IPay.Customers.Edit'),
        // hasDeletePermission: usePermission('IPay.Customers.Delete'),
        // hasApprovePermission: usePermission('IPay.Customers.Approve'),
      },
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '100px',
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: customersUIProps.queryParams.pageSize,
    page: customersUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <Tabs
        defaultActiveKey=""
        id="uncontrolled-tab-example"
        onSelect={checkTag}>
        <Tab eventKey="" title="Tất cả"></Tab>
        <Tab eventKey="0" title="Chưa duyệt"></Tab>
        <Tab eventKey="1" title="Đã duyệt"></Tab>
        <Tab eventKey="2" title="Từ chối duyệt"></Tab>
      </Tabs>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}>
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  customersUIProps.setQueryParams,
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: customersUIProps.ids,
                  setIds: customersUIProps.setIds,
                })}
                {...paginationTableProps}>
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
