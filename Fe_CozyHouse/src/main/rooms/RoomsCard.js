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
      <CardHeader classname= "cardHeader"><h2 className="header-card">Danh sách phòng</h2>
        <CardHeaderToolbar>
          {/* {hasCreatePermission && ( */}
            <span className="button_add " >
            <button 
              type="button"
              className="btn button_add"
              // style = {{color: "#f695a0"}}
              onClick={roomsUIProps.newRoomButtonClick}>
              Tạo phòng mới    
               <span ><i class="plus_button fas fa-plus-circle"></i></span>
            </button>
           
            </span>
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
