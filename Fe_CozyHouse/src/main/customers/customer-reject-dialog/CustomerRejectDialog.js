/* eslint-disable no-restricted-imports */
import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ModalProgressBar } from '../../../components/ModalProgressBar';
import * as actions from '../../../redux/customers/customersActions';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../../components/forms';

export function CustomerRejectDialog({ id, show, onHide }) {
  // Customers Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.customers.actionsLoading }),
    shallowEqual,
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const rejectCustomer = (reason) => {
    // server request for reject customer by id
    dispatch(actions.rejectCustomer(id, reason)).then(() => {
      dispatch(actions.fetchCustomer(id));
      onHide();
    });
  };
  const RejectSchema = Yup.object().shape({
    reason: Yup.string().required("Chưa nhập lý do từ chối duyệt"),
  });

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg">
      <Formik
        enableReinitialize={true}
        initialValues={{ reason: '' }}
        validationSchema={RejectSchema}
        onSubmit={(values) => {
          rejectCustomer(values);
        }}>
        {({ handleSubmit }) => (
          <>
            {isLoading && <ModalProgressBar variant="query" />}
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Lý do từ chối duyệt
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {!isLoading && (
                <>
                  <Form className="form form-label-right">
                    <div className="form-group row align-items-end m-3">
                      <Field
                        name="reason"
                        component={Input}
                        label= "Lý do từ chối duyệt"
                        withFeedbackLabel={true}
                      />
                    </div>
                  </Form>
                </>
              )}
              {isLoading && <span>Đang từ chối duyệt</span>}
            </Modal.Body>
            <Modal.Footer>
              <div>
                <button
                  type="button"
                  onClick={onHide}
                  className="btn btn-light btn-elevate">
                  Hủy
                </button>
                <> </>
                <button
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="btn btn-danger btn-elevate">
                  Từ chối duyệt
                </button>
              </div>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  );
}
