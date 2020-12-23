// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useContext } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import { Tabs, Tab } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/rooms/roomsActions';
import { isEqual } from 'lodash';
import moment from 'moment';

import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from '../../../helpers';
import * as uiHelpers from '../RoomsUIHelpers';
import * as columnFormatters from './column-formatters';
import { Pagination } from '../../../components/pagination/Pagination';
import { useRoomsUIContext } from '../RoomsUIContext';
// import { usePermission } from '../../../../hooks/UsePermission';

import authCtx from "../../../contexts/auth";

export function RoomsTable() {
  // Rooms UI Context
  const roomsUIContext = useRoomsUIContext();
  const roomsUIProps = useMemo(() => {
    return {
      ids: roomsUIContext.ids,
      setIds: roomsUIContext.setIds,
      queryParams: roomsUIContext.queryParams,
      setQueryParams: roomsUIContext.setQueryParams,
      openApproveRoomDialog: roomsUIContext.openApproveRoomDialog,
      openEditRoomDialog: roomsUIContext.openEditRoomDialog,
      openDeleteRoomDialog: roomsUIContext.openDeleteRoomDialog,
      openDetailRoomDialog: roomsUIContext.openDetailRoomDialog,
      openRejectRoomDialog: roomsUIContext.openRejectRoomDialog,
    };
  }, [roomsUIContext]);
  //authContext
  const { authUser } = useContext(authCtx);
  const checkTag = (key) => {
    const newQueryParams = {
      ...roomsUIContext.queryParams,
      filter: { ...roomsUIContext.queryParams.filter },
    };

    newQueryParams.filter.roomStatus = key || undefined;

    if (!isEqual(newQueryParams, roomsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      roomsUIProps.setQueryParams(newQueryParams);
    }
  };

  // Getting curret state of rooms list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.rooms }),
    shallowEqual,
  );
  const { totalCount, entities, listLoading } = currentState;
  console.log(entities)

  // Rooms Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    // roomsUIProps.setIds([]);
    dispatch(actions.fetchRooms(roomsUIProps.queryParams, authUser?.token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomsUIProps.queryParams, dispatch, authUser]);

  let timeNow = Date.now();
  // Table columns
  const columns = [
    {
      dataField: 'username',
      text: "Tên người đăng", 
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'title',
      text: "Tiêu đề",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: 'typeOfRoom',
      text: "Loại phòng",
      formatter: columnFormatters.RoomTypeColumnFormatter,
      sortCaret: sortCaret,
    },
    {
      dataField: 'status',
      text: "Trạng thái",
      formatter: columnFormatters.StatusRoomColumnFormatter,
      sortCaret: sortCaret,
    },
    {
      dataField: 'date_create',
      text: "Ngày tạo",
      formatter: (cellContent) => {
        return cellContent
          ? moment(cellContent.creationTime).format('DD/MM/yyyy')
          : timeNow;
      },
    },
    {
      dataField: 'action',
      text: "Hành động",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        queryParams: roomsUIProps.queryParams,
        openEditRoomDialog: roomsUIProps.openEditRoomDialog,
        openDeleteRoomDialog: roomsUIProps.openDeleteRoomDialog,
        openDetailRoomDialog: roomsUIProps.openDetailRoomDialog,
        openApproveRoomDialog: roomsUIProps.openApproveRoomDialog,
        openRejectRoomDialog: roomsUIProps.openRejectRoomDialog,
        // hasEditPermission: usePermission('IPay.Rooms.Edit'),
        // hasDeletePermission: usePermission('IPay.Rooms.Delete'),
        // hasApprovePermission: usePermission('IPay.Rooms.Approve'),
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
    sizePerPage: roomsUIProps.queryParams.pageSize,
    page: roomsUIProps.queryParams.pageNumber,
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
                  roomsUIProps.setQueryParams,
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: roomsUIProps.ids,
                  setIds: roomsUIProps.setIds,
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
