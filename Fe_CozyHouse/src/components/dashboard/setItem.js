import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import authCtx from "../../contexts/auth";

const SetItem = (props) => {
  const history = useHistory();
  const {
    _id,
    avatar,
    title,
    date_created,
    author,
    empty,
    detail,
    slug,
  } = props.item;
  const moveToDetail = () => {
    history.push(`/setCard/${slug}`);
  };
  const { authUser } = useContext(authCtx);
  const currentUser = authUser.user.username;
  const [confirmModal, showConfirmModal] = useState(false);

  // function handleDelete() {
  //   showConfirmModal(false);
  //   const data = { _id };
  //   debugger;
  //   fetch(`${process.env.REACT_APP_API_DOMAIN}/setCard`, {
  //     method: "delete",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${authUser.token}`,
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then(
  //       (result) => {
  //         document.location.pathname = "/dashboard";
  //       },
  //       (error) => {
  //         console.log(error.message);
  //       }
  //     );
  // }

  return (
    <>
      {/* <ConfirmModal show={confirmModal} onHide={handleDelete} /> */}

      <div className="set-item">
        <div className="avatar">
          <img
            src={process.env.REACT_APP_API_DOMAIN + "/" + avatar}
            alt="avatar"
          />
        </div>

        <div className="set-content">
          <h4>
            <span onClick={moveToDetail} className="link">
              {title}
            </span>
          </h4>

          <div className="status">
            {empty && <div className="empty">0/0 words learned</div>}

            {!empty && (
              <div
                className={`finish ${
                  detail.filter((item) => item.card_completed === true)
                    .length !== detail.length
                    ? "not-yet"
                    : ""
                }`}
              >
                <span role="img" aria-label="finish-image" className="m-2">
                  {detail.filter((item) => item.card_completed === true)
                    .length === detail.length
                    ? "✔"
                    : "U"}
                </span>

                {`${
                  detail.filter((item) => item.card_completed === true).length
                } / ${detail.length} words learned`}
              </div>
            )}
            <div className="date-created d-flex ">{author.username}</div>
          </div>

          {/* {currentUser === author.username || currentUser === "dvtam99" ? (
            <>
              <div className="edit" title="Edit this  set">
                <a href={`/flashcard/edit/${slug}`} className="text-edit">
                  <i class="material-icons icon-ctrl" title="Edit this card">
                    edit
                  </i>
                </a>
              </div>
              <div
                className="delete"
                title="Delete this set"
                onClick={() => showConfirmModal(true)}
              >
                <i class="material-icons icon-ctrl">delete</i>
              </div>
            </>
          ) : (
            <div>&nbsp;</div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default SetItem;

export const ConfirmModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Chú ý</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete this flashcard? Note that, this
          deletion will not be recoverable.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={props.onHide}>
          Tôi hiểu!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
