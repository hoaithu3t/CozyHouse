/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { shallowEqual, useSelector } from 'react-redux';
import * as actions from '../../../../redux/rooms/roomsActions';
import * as actionsRoom from '../../../../redux/rooms/roomsActions';
import * as actionsBank from '../../../../redux/banks/banksActions';

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../components/Card';
import { RoomEditForm } from './RoomEditForm';
import { ModalProgressBar } from '../../../components/ModalProgressBar';

import i18n from '../../../helpers/node_modules/i18next';

import { initRoom } from '../RoomsUIHelpers';

export default function RoomEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const [tab, setTab] = useState('basic');
  const dispatch = useDispatch();
  const { actionsLoading, roomForEdit, allBanks } = useSelector(
    (state) => ({
      actionsLoading: state.rooms.actionsLoading,
      roomForEdit: state.rooms.roomForEdit,
      allBanks: state.banks.allBanks,
    }),
    shallowEqual,
  );

  // useEffect(() => {
  //   dispatch(actionsBank.fetchAllBanks());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(actionsRoom.fetchAllRooms());
  }, [dispatch]);

  useEffect(() => {
    dispatch(actions.fetchRoom(id));
  }, [id, dispatch]);

  const saveRoom = (values) => {
    if (!id) {
      dispatch(actions.createRoom(values)).then(() =>
        backToRoomsList(),
      );
    } else {
      dispatch(actions.updateRoom(values)).then(() =>
        backToRoomsList(),
      );
    }
  };

  const backToRoomsList = () => {
    history.push(`/rooms`);
  };

  return (
    <>
      <Card>
        {actionsLoading && <ModalProgressBar />}
        <CardHeader title={i18n.t('IPay::EditRoom')}>
          <CardHeaderToolbar>
            <button
              type="button"
              onClick={backToRoomsList}
              className="btn btn-light">
              <i className="fa fa-arrow-left"></i>
              {i18n.t('AbpUi::Back')}
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          {tab === 'basic' && (
            <RoomEditForm
              allBanks={allBanks}
              actionsLoading={actionsLoading}
              room={roomForEdit || initRoom}
              saveRoom={saveRoom}
              onHide={backToRoomsList}
              disabled={false}
            />
          )}
        </CardBody>
      </Card>
    </>
  );
}
