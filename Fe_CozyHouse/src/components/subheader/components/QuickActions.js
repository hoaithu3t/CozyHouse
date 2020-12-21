/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { forwardRef } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

const QuickActionsDropdownToggle = forwardRef((props, ref) => {
  return (
    <button
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        (props).onClick(e);
      }}
      id="kt_subheader_quick_actions"
      className="btn btn-white font-weight-bold py-3 px-6">
      Actions
    </button>
  );
});

export function QuickActions() {
  return (
    <>
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip id="quick-actions-tooltip">Quick actions</Tooltip>}>
        <Dropdown className="dropdown-inline" drop="down" alignRight>
          <Dropdown.Toggle
            as={QuickActionsDropdownToggle}
            id="dropdown-toggle-quick-actions-subheader"
          />

          <Dropdown.Menu className="dropdown-menu p-0 m-0 dropdown-menu-md dropdown-menu-right">
            <ul className="navi navi-hover py-5">
              <li className="navi-item">
                <a href="#" className="navi-link">
                  <span className="navi-icon">
                    <i className="flaticon2-drop"></i>
                  </span>
                  <span className="navi-text">New Group</span>
                </a>
              </li>
              <li className="navi-item">
                <a href="#" className="navi-link">
                  <span className="navi-icon">
                    <i className="flaticon2-list-3"></i>
                  </span>
                  <span className="navi-text">Contacts</span>
                </a>
              </li>
              <li className="navi-item">
                <a href="#" className="navi-link">
                  <span className="navi-icon">
                    <i className="flaticon2-rocket-1"></i>
                  </span>
                  <span className="navi-text">Groups</span>
                  <span className="navi-link-badge">
                    <span className="label label-light-primary label-inline font-weight-bold">
                      new
                    </span>
                  </span>
                </a>
              </li>
              <li className="navi-item">
                <a href="#" className="navi-link">
                  <span className="navi-icon">
                    <i className="flaticon2-bell-2"></i>
                  </span>
                  <span className="navi-text">Calls</span>
                </a>
              </li>
              <li className="navi-item">
                <a href="#" className="navi-link">
                  <span className="navi-icon">
                    <i className="flaticon2-gear"></i>
                  </span>
                  <span className="navi-text">Settings</span>
                </a>
              </li>

              <li className="navi-separator my-3"></li>

              <li className="navi-item">
                <a href="#" className="navi-link">
                  <span className="navi-icon">
                    <i className="flaticon2-magnifier-tool"></i>
                  </span>
                  <span className="navi-text">Help</span>
                </a>
              </li>
              <li className="navi-item">
                <a href="#" className="navi-link">
                  <span className="navi-icon">
                    <i className="flaticon2-bell-2"></i>
                  </span>
                  <span className="navi-text">Privacy</span>
                  <span className="navi-link-badge">
                    <span className="label label-light-danger label-rounded font-weight-bold">
                      5
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </Dropdown.Menu>
        </Dropdown>
      </OverlayTrigger>
    </>
  );
}
