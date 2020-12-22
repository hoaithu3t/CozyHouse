import React from 'react';
import { Route } from 'react-router-dom';
import * as actions from '../../redux/customers/customersActions';
import { useDispatch } from 'react-redux';
// import { CustomersLoadingDialog } from './customers-loading-dialog/CustomersLoadingDialog';
import { CustomerEditDialog } from './customer-edit-dialog/CustomerEditDialog';
import { CustomerDeleteDialog } from './customer-delete-dialog/CustomerDeleteDialog';
import { CustomerDetailDialog } from './customer-detail-dialog/CustomerDetailDialog';
import { CustomerApproveDialog } from './customer-approve-dialog/CustomerApproveDialog';
import { CustomerRejectDialog } from './customer-reject-dialog/CustomerRejectDialog';
// import { CustomersFetchDialog } from './customers-fetch-dialog/CustomersFetchDialog';
import { CustomersUIProvider } from './CustomersUIContext';
import { CustomersCard } from './CustomersCard';
export default function Customers({ history }) {
  const dispatch = useDispatch();
  const customersUIEvents = {
    newCustomerButtonClick: () => {
      history.push('/customer/new');
    },
    openEditCustomerDialog: (id) => {
      history.push(`/customer/${id}/edit`);
    },
    openDeleteCustomerDialog: (id) => {
      history.push(`/customer/${id}/delete`);
    },
    openApproveCustomerDialog: (id) => {
      history.push(`/customer/${id}/approve`);
    },
    openRejectCustomerDialog: (id, queryparams) => {
      history.push(`/customer/${id}/reject`, queryparams);
    },
    openDetailCustomerDialog: (id) => {
      history.push(`/customer/${id}/detail`);
    },
    openApproveCustomersDialog: () => {
      history.push(`/customers/approveCustomers`);
    },
    openDeleteCustomersDialog: () => {
      history.push(`/customers/deleteCustomers`);
    },
    openFetchCustomersDialog: () => {
      history.push(`/customers/fetch`);
    },
    openUpdateCustomersStatusDialog: () => {
      history.push('/customers/updateStatus');
    },
  };

  return (
    <CustomersUIProvider customersUIEvents={customersUIEvents}>
      {/* <CustomersLoadingDialog /> */}
      <Route path="/customer/new">
        {({ history, match }) => (
          <CustomerEditDialog
            id={null}
            show={match != null}
            onHide={() => {
              history.push('/customer');
            }}
          />
        )}
      </Route>
      <Route path="/customer/:id/edit">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/customer');
            }}
          />
        )}
      </Route>
       {/* <Route path="/customers/approveCustomers">
        {({ history, match }) => (
          <CustomersApproveDialog
            show={match != null}
            onHide={() => {
              history.push('/customers');
            }}
          />
        )}
      </Route> */}
      {/* <Route path="/customers/deleteCustomers">
        {({ history, match }) => (
          <CustomersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push('/customers');
            }}
          />
        )}
      </Route> */}
      <Route path="/customer/:id/delete">
        {({ history, match }) => (
          <CustomerDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/customer');
            }}
          />
        )}
      </Route>
      <Route path="/customer/:id/detail">
        {({ history, match }) => (
          <CustomerDetailDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/customer');
            }}
          />
        )}
      </Route>
      <Route path="/customer/:id/approve">
        {({ history, match }) => (
          <CustomerApproveDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.location.state &&
                dispatch(actions.fetchCustomers(history.location.state));
              history.push('/customer');
            }}
          />
        )}
      </Route>
      <Route path="/customer/:id/r6eject">
        {({ history, match }) => (
          <CustomerRejectDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              // history.location.state &&
              //   dispatch(actions.fetchCustomers(history.location.state));
              history.push('/customer');
            }}
          />
        )}
      </Route>
      {/* <Route path="/customers/fetch">
        {({ history, match }) => (
          <CustomersFetchDialog
            show={match != null}
            onHide={() => {
              history.push('/customers');
            }}
          />
        )}
      </Route> */}
      {/* <Route path="/customers/updateStatus">
        {({ history, match }) => (
          <CustomersUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push('/customers');
            }}
          />
        )}
      </Route> */}
      <CustomersCard />
    </CustomersUIProvider>
  );
}
