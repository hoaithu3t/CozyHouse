import React, { createContext, useContext, useState, useCallback } from 'react';
import { isEqual, isFunction } from 'lodash';
import { initialFilter } from './RoomsUIHelpers';

const RoomsUIContext = createContext(null);

export function useRoomsUIContext() {
  return useContext(RoomsUIContext);
}

export const RoomsUIConsumer = RoomsUIContext.Consumer;

export function RoomsUIProvider({ roomsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    newRoomButtonClick: roomsUIEvents.newRoomButtonClick,
    openEditRoomDialog: roomsUIEvents.openEditRoomDialog,
    openDeleteRoomDialog: roomsUIEvents.openDeleteRoomDialog,
    openApproveRoomDialog: roomsUIEvents.openApproveRoomDialog,
    openRejectRoomDialog: roomsUIEvents.openRejectRoomDialog,
    openDetailRoomDialog: roomsUIEvents.openDetailRoomDialog,
    openApproveRoomsDialog: roomsUIEvents.openApproveRoomsDialog,
    openDeleteRoomsDialog: roomsUIEvents.openDeleteRoomsDialog,
    openFetchRoomsDialog: roomsUIEvents.openFetchRoomsDialog,
    openUpdateRoomsStatusDialog:
      roomsUIEvents.openUpdateRoomsStatusDialog,
  };

  return (
    <RoomsUIContext.Provider value={value}>
      {children}
    </RoomsUIContext.Provider>
  );
}
