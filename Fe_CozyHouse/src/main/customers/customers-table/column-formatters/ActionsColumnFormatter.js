// please be familiar with react-bootstrap-table-next column formaters
// tslint:disable-next-line: max-line-length
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../../../../helpers';
import { CustomerStatus } from '../../CustomersUIHelpers';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  {
    queryParams,
    openEditCustomerDialog,
    openDeleteCustomerDialog,
    openDetailCustomerDialog,
    openApproveCustomerDialog,
    openRejectCustomerDialog,
    hasApprovePermission,
    hasEditPermission,
    hasDeletePermission,
  },
) {
  const pStyle = {
    width : "100px"
  }
  return (
    <>
      {/* {hasApprovePermission && */}
        {/* row.customerStatus === CustomerStatus.NotApprove && ( */}
          <>
            <OverlayTrigger 
              overlay={
                <Tooltip  style={pStyle} id="customers-approve-tooltip">
                  {('Phê duyệt')}
                </Tooltip>
              }>
              <a
                className="btn btn-icon btn-light btn-hover-success btn-sm"
                onClick={() => openApproveCustomerDialog(row._id)}>
                <i className="far fa-check-circle text-success text-hover-white"></i>
              </a>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={
                <Tooltip  style={pStyle} id="customers-reject-tooltip">
                  {('Từ Chối')}
                </Tooltip>
              }>
              <a
                className="btn btn-icon btn-light btn-hover-danger btn-sm ml-3"
                onClick={() => openRejectCustomerDialog(row._id, queryParams)}>
              <i className="far fa-times-circle text-danger text-hover-white"></i>
             
              </a>
            </OverlayTrigger>
          </>
        {/* )} */}
      <OverlayTrigger
        overlay={
          <Tooltip  style={pStyle} id="customers-detail-tooltip">
            Xem chi tiết
          </Tooltip>
        }>
        <a
          className="btn btn-icon btn-light btn-hover-warning btn-sm ml-3"
          onClick={() => openDetailCustomerDialog(row._id)}>
          <i className="fas fa-info text-warning text-hover-white"></i>
        </a>
      </OverlayTrigger>
      <> </>
      {/* {hasEditPermission && ( */}
        <OverlayTrigger
          overlay={
            <Tooltip  style={pStyle} id="customers-edit-tooltip">
              {('Chỉnh sử')}
            </Tooltip>
          }>
          <a
            className="btn btn-icon btn-light btn-hover-primary btn-sm ml-3"
            onClick={() => openEditCustomerDialog(row._id)}>
            <span className="svg-icon svg-icon-md svg-icon-primary">
            <i class=" edit_button fas fa-edit"></i>
            </span>
          </a>
        </OverlayTrigger>
      {/* )} */}
      <> </>
      {/* {hasDeletePermission && ( */}
        <OverlayTrigger
          overlay={
            <Tooltip  style={pStyle} id="customers-delete-tooltip">
              Xóa
            </Tooltip>
          }
      >
          <a
            className="btn btn-icon btn-light btn-hover-danger btn-sm ml-3"
            onClick={() => openDeleteCustomerDialog(row._id)}>
            <span className="svg-icon svg-icon-md svg-icon-danger">
              <SVG src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} />
            </span>
          </a>
        </OverlayTrigger>
      {/* )} */}
    </>
  );
}
