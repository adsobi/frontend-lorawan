import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CreateApplication } from "../services/endpoints";
import generateKey from "../features/key";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ApplicationCreate: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  type IApplicationCreate = {
    name: string,
    description: string,
    appKey: string,
  };
  const initialValues: IApplicationCreate = {
    name: "",
    description: "",
    appKey: ""
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("To pole jest wymagane!"),
    appKey: Yup.string()
      .required("To pole jest wymagane!")
      .test(
        "len",
        "Klucz musi posiadać 32 znaki!",
        (val: any) =>
          val &&
          val.toString().length == 32
      )
  });
  const handleCreate = (formValue: IApplicationCreate) => {
    const { name, description, appKey } = formValue;
    CreateApplication(name, description, appKey).then(
      (response) => {
        setSuccessful(true);
        navigate('applications');
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
        <h4 className="text-center">Dodaj nową aplikację</h4>
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
                  <label htmlFor="appKey">Klucz aplikacji <span className="text-danger">*</span></label>
                  <div className="d-flex">
                      <Field name="appKey" type="text" className="form-control" />
                      <Button className="ms-2" onClick={() => setFieldValue('appKey', generateKey(32))} >Generuj</Button>
                    </div>
                  <ErrorMessage
                    name="appKey"
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
export default ApplicationCreate;
