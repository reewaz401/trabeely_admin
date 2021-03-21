import React, { useState, useEffect, useContext } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { USER_UPDATE_PASSWORD_API } from '../../services/api_url'
import axios from '../../services/axios'
import { AuthContext } from '../../contexts/UserAuthentication'
import { useToasts } from 'react-toast-notifications'

const ValidationSchema = Yup.object().shape({
  currentpassword: Yup.string().required('Field is required'),
  password: Yup.string().required('Field is required'),
  cpassword: Yup.string().required('Field is required'),
})
const Profile = () => {
  // const [profile, setProfile] = useState({})
  const { authUser } = useContext(AuthContext)
  const { addToast, removeAllToasts } = useToasts()
  const onUpdatePassword = async (values, actions) => {
    try {
      if (values.password === values.cpassword) {
        let result = await axios.post(USER_UPDATE_PASSWORD_API, values)
        if (result.data.success) {
          addToast(result.data.message, {
            appearance: "success",
            autoDismiss: true,
          });
          actions.resetForm();
          window.location.reload();
        }else{
          addToast(result.data.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      } else {
        addToast("Password not match", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } catch (error) {
      if (error.response) {
        removeAllToasts()
        addToast(error.response.data.error, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  }
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--6" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="no profile"
                        className="rounded-circle"
                        src={`${process.env.PUBLIC_URL}/res/img/default_user.svg`}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  {/* //Content */}
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      {/* <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div> */}
                    </div>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label"   >
                          Your full name
                          </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={authUser.name}
                          readOnly
                          placeholder="Username"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label" >
                          Email address
                          </label>
                        <Input
                          className="form-control-alternative"
                          value={authUser.email}
                          placeholder={authUser.email}
                          type="email"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>

                <hr className="my-4" />
                {/* Address */}
                <h6 className="heading-small text-muted mb-4">
                  Password Section
                  </h6>
                <div className="pl-lg-4">
                  <Formik
                    initialValues={{
                      currentpassword: '',
                      password: '',
                      cpassword: '',
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, actions) => {
                      onUpdatePassword(values, actions)
                    }}>
                    {props => (
                      <Form className='mt-2'>
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label
                                className="form-control-label">Current Password</label>
                              <Field
                                type="password"
                                name="currentpassword"
                                className="form-control"
                                placeholder="Enter your current password"
                                value={props.values.currentpassword}
                                onChange={props.handleChange}
                              />
                              {props.errors.currentpassword && props.touched.currentpassword ? (
                                <small className='form-text text-danger'>{props.errors.currentpassword}</small>
                              ) : null}
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <label
                                className="form-control-label">New Password
                          </label>
                              <Field
                                name="password"
                                className="form-control"
                                placeholder="Enter your new password"
                                type="text"
                                value={props.values.password}
                                onChange={props.handleChange}
                              />
                              {props.errors.password && props.touched.password ? (
                                <small className='form-text text-danger'>{props.errors.password}</small>
                              ) : null}
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <label
                                className="form-control-label">Confirm Password
                          </label>
                              <Field
                                name="cpassword"
                                className="form-control"
                                placeholder="Confirm new password"
                                type="text"
                                value={props.values.cpassword}
                                onChange={props.handleChange}
                              />
                              {props.errors.cpassword && props.touched.cpassword ? (
                                <small className='form-text text-danger'>{props.errors.cpassword}</small>
                              ) : null}
                            </FormGroup>
                          </Col>
                        </Row>
                        <div className="text-left">
                          <button className="btn btn-primary" type="submit">Update Your New Password</button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
