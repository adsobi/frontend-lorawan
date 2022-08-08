import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CreateApplication } from "../services/endpoints";

const GatewayCreate: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  type IApplicationCreate = {
    name: string,
    description: string,
    gatewayEUI: string,
  };
  const initialValues: IApplicationCreate = {
    name: "",
    description: "",
    gatewayEUI: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("To pole jest wymagane!"),
    gatewayEUI: Yup.string()
      .required("To pole jest wymagane!"),
  });
  const handleCreate = (formValue: IApplicationCreate) => {
    const { name, description, gatewayEUI } = formValue;
    CreateApplication(name, description, gatewayEUI).then(
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
        <h4 className="text-center">Dodaj nową aplikację</h4>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreate}
        >
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
                  <label htmlFor="gatewayEUI">Gateway EUI <span className="text-danger">*</span></label>
                  <Field name="gatewayEUI" type="text" className="form-control" />
                  <ErrorMessage
                    name="gatewayEUI"
                    component="div"
                    className="alert alert-danger mt-1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Opis </label>
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
        </Formik>
      </div>
    </div>
  );
};
export default GatewayCreate;
