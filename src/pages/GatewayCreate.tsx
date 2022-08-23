import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { CreateGateway } from "../services/endpoints";
import { Button } from "react-bootstrap";
import generateKey from "../features/key";
import { useNavigate } from "react-router-dom";

const GatewayCreate: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  type IGatewayCreate = {
    name: string,
    description: string,
    gatewayEUI: string,
  };
  const initialValues: IGatewayCreate = {
    name: "",
    description: "",
    gatewayEUI: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("To pole jest wymagane!"),
    gatewayEUI: Yup.string()
      .required("To pole jest wymagane!")
      .test(
        "len",
        "Klucz musi posiadać 16 znaków!",
        (val: any) =>{
          return val &&
          val.toString().length == 16}
      ),
  });
  const handleCreate = (formValue: IGatewayCreate) => {
    const { name, description, gatewayEUI } = formValue;
    CreateGateway(name, description, gatewayEUI).then(
      (response) => {
        setErrorMessage(response.data.message);
        setSuccessful(true);
        navigate('gateways');
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setErrorMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div className="col-md-12">
      <div className="card col-md-8 p-4">
        <h4 className="text-center">Dodaj nową bramkę sieciową</h4>
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
                    <label htmlFor="gatewayEUI">Gateway EUI <span className="text-danger">*</span></label>
                    <div className="d-flex">
                      <Field name="gatewayEUI" type="text" className="form-control" />
                      <Button className="ms-2" onClick={() => setFieldValue('gatewayEUI', generateKey(16))} >Generuj</Button>
                    </div>
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
            {errorMessage && (
              <div className="form-group mt-2">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {errorMessage}
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
export default GatewayCreate;
