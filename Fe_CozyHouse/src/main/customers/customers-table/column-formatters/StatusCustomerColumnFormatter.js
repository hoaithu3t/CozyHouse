// please be familiar with react-bootstrap-table-next column formaters
// tslint:disable-next-line: max-line-length
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from 'react';
import { CustomerStatus } from '../../CustomersUIHelpers';

export function StatusCustomerColumnFormatter(cellContent, row) {
  return (
    <>
      <span>
        {
          row.status == 0 ? "NotApprove" : (row.status == 1 ? "Approve" :(row.status == 2 ? "Reject" : ""))
        }
      </span>
    </>
  );
}
