import React, { useEffect, useState } from "react";
import { Col, Container, Form, FormLabel, Row, Spinner } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { login } from "../../Service/services";
import LoginSlider from "../../components/LoginSlider";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isInput, setIsInput] = useState({
    email: "",
    password: "",
  });
  const [redirectToMain, setRedirectToMain] = useState(false);
  const [isCustomError, setIsCustomError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await login(data);
      if (response.status === 200) {
        const accessTokenId = response.data.token;
        localStorage.setItem("accessToken", accessTokenId);
        window.location.href = "/home";
      } else {
        setIsCustomError("Try again");
      }
    } catch (error) {
      setIsCustomError("Email or password is incorrect");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsCustomError(false);
  }, [isInput.email, isInput.password]);

  return (
    <>
      <Container fluid>
        {redirectToMain && <Navigate to="/home" />}
        <Row>
          <Col lg={5} md={12} xs={12} className="p-0">
            <LoginSlider />
          </Col>
          <Col
            lg={7}
            md={12}
            xs={12}
            className="p-0 d-flex justify-content-center align-items-center"
          >
            <div className="login-form-section">
              <div className="login-form-content">
                <h1 className="mb-2">
                  Sign in at <span>Comapany</span>
                </h1>
                <p>Empower your experience, sign in for a account today</p>
              </div>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {isCustomError ? (
                  <span className="error-message text-danger sapn-text-error mb-3">
                    {isCustomError}
                  </span>
                ) : null}
                <Form.Group className="mb-3">
                  <FormLabel className="label-text">Work email*</FormLabel>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    className="form-input-text"
                    {...register("email", {
                      required: "*Please enter your email",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="error-message text-danger sapn-text-error ">
                      {errors.email.message}
                    </span>
                  )}
                </Form.Group>
                <div className="mb-0 password-cont">
                  <Form.Group
                    className="mb-3 relative"
                    controlId="formBasicPassword"
                  >
                    <FormLabel className="label-text">Password*</FormLabel>
                    <Form.Control
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Enter your password"
                      className="form-input-text"
                      {...register("password", {
                        required: "*Please enter your password",
                        pattern: {
                          value:
                            /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?])[A-Za-z\d!@#$%^&*()_+{}|:"<>?]+$/,
                          message: "Password is incorrect",
                        },
                      })}
                    />
                    <span
                      className="show-password"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={isPasswordVisible ? faEyeSlash : faEye}
                      />
                    </span>
                    {errors.password && (
                      <span className="error-message text-danger sapn-text-error ">
                        {errors.password.message}
                      </span>
                    )}
                  </Form.Group>
                </div>
                {/* <div className="d-flex justify-content-end align-items-end mt-2 mb-3">
                  <span onClick={() => navigate("/forgot-password")} className="forgot-password">Forgot Password?</span>
                </div> */}
                <div>
                  <button
                    type="submit"
                    className="login-btn"
                    disabled={loading}
                  >
                    {!loading ? (
                      "Log in"
                    ) : (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="loader"
                      />
                    )}
                  </button>
                </div>
                <p className="create-account text-center">
                  Don’t have an account?{" "}
                  <span onClick={() => navigate("/signup")}>Sign Up</span>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
