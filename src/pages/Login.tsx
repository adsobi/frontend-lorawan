import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/Auth";

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { onLogin, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== null) { navigate('/applications'); }
  }, [token]);

  const initialValues: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("To pole jest wymagane!"),
    password: Yup.string().required("To pole jest wymagane!"),
  });
  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    setMessage("");
    setLoading(true);
    onLogin(username, password).then(
      () => {},
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setMessage(resMessage);
      }
    );
  };
  return (
    <div className="col-md-12 item-align-center">
      <h4 className="text-center mt-5">Serwer LoRaWAN</h4>
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Login</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger mt-1 p-2"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Hasło</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger mt-1 p-2"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block w-100 mt-4" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Zaloguj</span>
              </button>
            </div>
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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
export default Login;