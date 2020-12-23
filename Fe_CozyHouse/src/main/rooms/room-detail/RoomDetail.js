import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/rooms/roomsActions';


export function RoomDetail({
  history,
  match: {
    params: { id },
  },
}) {

    const dispatch = useDispatch();
    const { actionsLoading, roomForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.rooms.actionsLoading,
      roomForEdit: state.rooms.roomForEdit,
    }),
    shallowEqual,
  );

   useEffect(() => {
    // server call for getting Room by id
    dispatch(actions.fetchRoom(id));
  }, [id, dispatch]);
  return (
    <>
     làm theo biến "roomForEdit"
    </>
  );
}
