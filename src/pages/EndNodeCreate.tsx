import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CreateEndNode } from "../services/endpoints";
import { Button } from "react-bootstrap";

const EndNodeCreate: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  type IApplicationCreate = {
    name: string,
    applicationId: string,
    description: string,
    joinEUI: string,
    devEUI: string,
    downlinkInvoke: number,
  };
  const initialValues: IApplicationCreate = {
    name: "",
    applicationId: "",
    description: "",
    joinEUI: "",
    devEUI: "",
    downlinkInvoke: 10,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("To pole jest wymagane!"),
    joinEUI: Yup.string()
      .test(
        "len",
        "Klucz musi posiadać 16 znaki!",
        (val: any) =>
          val &&
          val.toString().length == 16
      )
      .required("To pole jest wymagane!"),
    devEUI: Yup.string()
      .test(
        "len",
        "Klucz musi posiadać 16 znaki!",
        (val: any) =>
          val &&
          val.toString().length == 16
      )
      .required("To pole jest wymagane!"),
    applicationId: Yup.string()
      .required("To pole jest wymagane!"),
    downlinkInvoke: Yup.string()
      .required("To pole jest wymagane!"),
  });
  const handleCreate = (formValue: IApplicationCreate) => {
    const { name, description, joinEUI, devEUI, downlinkInvoke, applicationId } = formValue;
    CreateEndNode(name, description, joinEUI, devEUI, downlinkInvoke, applicationId).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };
  return (
    <div className="col-md-12">
      <div className="card col-md-8 p-4">
        <h4 className="text-center">Dodaj nowe urządzenie końcowe</h4>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreate}
        >
          {({ setFieldValue }) => (
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="name">Nazwa <span className="text-danger">*</span></label>
                  <Field name="name" type="text" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="alert alert-danger mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="applicationId">Aplikacja <span className="text-danger">*</span></label>
                  <Field name="applicationId" as="select" className="form-control">
                    <option value="" selected>-</option>
                    <option value="1">test-app-for-lorawan</option>
                  </Field>
                  <ErrorMessage
                    name="applicationId"
                    component="div"
                    className="alert alert-danger mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="joinEUI">JoinEUI <span className="text-danger">*</span></label>
                  <div className="d-flex">
                      <Field name="joinEUI" type="text" className="form-control" />
                      <Button className="ms-2" onClick={() => setFieldValue('joinEUI', '0000000000000000')} >Wyzeruj</Button>
                    </div>
                  <ErrorMessage
                    name="joinEUI"
                    component="div"
                    className="alert alert-danger mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="devEUI">DevEUI <span className="text-danger">*</span></label>
                  <Field name="devEUI" type="text" className="form-control" />
                  <ErrorMessage
                    name="devEUI"
                    component="div"
                    className="alert alert-danger mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="downlinkInvoke">Liczba otrzymanych pakietów, po której następuje odpowiedź serwera <span className="text-danger">*</span></label>
                  <Field name="downlinkInvoke" type="text" className="form-control" />
                  <ErrorMessage
                    name="downlinkInvoke"
                    component="div"
                    className="alert alert-danger mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description"> Opis </label>
                  <Field name="description" component="textarea" rows="4" className="form-control" placeholder="Opisz swoją aplikację" />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="alert alert-danger mt-1"
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="mt-2 btn btn-primary btn-block">Zapisz</button>
                </div>
              </div>
            )}
            {message && (
              <div className="form-group mt-2">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default EndNodeCreate;
