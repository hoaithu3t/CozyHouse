// please be familiar with react-bootstrap-table-next column formaters
// tslint:disable-next-line: max-line-length
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../../../../helpers';
import { RoomStatus } from '../../RoomsUIHelpers';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  {
    queryParams,
    openEditRoomDialog,
    openDeleteRoomDialog,
    openDetailRoomDialog,
    openApproveRoomDialog,
    openRejectRoomDialog,
    hasApprovePermission,
    hasEditPermission,
    hasDeletePermission,
  },
) {
  return (
    <>
      {/* {hasApprovePermission && */}
        {/* row.roomStatus === RoomStatus.NotApprove && ( */}
          <>
            <OverlayTrigger
              overlay={
                <Tooltip id="rooms-approve-tooltip">
                  {('IPay::ApproveRoom')}
                </Tooltip>
              }>
              <a
                className="btn btn-icon btn-light btn-hover-success btn-sm"
                onClick={() => openApproveRoomDialog(row._id)}>
                <i className="far fa-check-circle text-success text-hover-white"></i>
              </a>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={
                <Tooltip id="rooms-reject-tooltip">
                  {('IPay::RejectRoom')}
                </Tooltip>
              }>
              <a
                className="btn btn-icon btn-light btn-hover-danger btn-sm ml-3"
                onClick={() => openRejectRoomDialog(row._id, queryParams)}>
              <i className="far fa-times-circle text-danger text-hover-white"></i>
             
              </a>
            </OverlayTrigger>
          </>
        {/* )} */}
      <OverlayTrigger
        overlay={
          <Tooltip id="rooms-detail-tooltip">
            Xem chi tiết
          </Tooltip>
        }>
        <a
          className="btn btn-icon btn-light btn-hover-warning btn-sm ml-3"
          onClick={() => openDetailRoomDialog(row._id)}>
          <i className="fas fa-info text-warning text-hover-white"></i>
        </a>
      </OverlayTrigger>
      <> </>
      {/* {hasEditPermission && ( */}
        <OverlayTrigger
          overlay={
            <Tooltip id="rooms-edit-tooltip">
              {('IPay::EditRoom')}
            </Tooltip>
          }>
          <a
            className="btn btn-icon btn-light btn-hover-primary btn-sm ml-3"
            onClick={() => openEditRoomDialog(row._id)}>
            <i class=" edit_button fas fa-edit"></i>
          </a>
        </OverlayTrigger>
      {/* )} */}
      <> </>
      {/* {hasDeletePermission && ( */}
        <OverlayTrigger
          overlay={
            <Tooltip id="rooms-delete-tooltip">
              Xóa
            </Tooltip>
          }
      >
          <a
            className="btn btn-icon btn-light btn-hover-danger btn-sm ml-3"
            onClick={() => openDeleteRoomDialog(row._id)}>
            <span className="svg-icon svg-icon-md svg-icon-danger">
              <SVG src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} />
            </span>
          </a>
        </OverlayTrigger>
      {/* )} */}
    </>
  );
}
