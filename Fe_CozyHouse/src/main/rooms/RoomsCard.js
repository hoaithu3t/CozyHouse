import React, { useMemo } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../components/Card';
// import { RoomsFilter } from "./rooms-filter/RoomsFilter";
import { RoomsTable } from './rooms-table/RoomsTable';
import { useRoomsUIContext } from './RoomsUIContext';
import { RoomsFilter } from './rooms-filter/RoomsFilter';
// import { usePermission } from '../../../hooks/UsePermission';

export function RoomsCard() {
  const roomsUIContext = useRoomsUIContext();
  const roomsUIProps = useMemo(() => {
    return {
      ids: roomsUIContext.ids,
      newRoomButtonClick: roomsUIContext.newRoomButtonClick,
      openApproveRoomsDialog: roomsUIContext.openApproveRoomsDialog,
    };
  }, [roomsUIContext]);

  // const hasCreatePermission = usePermission('IPay.Rooms.Create');

  return (
    <Card>
      <CardHeader title= "Danh sách phòng">
        <CardHeaderToolbar>
          {/* {hasCreatePermission && ( */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={roomsUIProps.newRoomButtonClick}>
              Tạo phòng mới
            </button>
          {/* )} */}
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RoomsFilter />
        <RoomsTable />
        {/* {roomsUIProps.ids.length > 0 && <RoomsGrouping />} */}
      </CardBody>
    </Card>
  );
}
