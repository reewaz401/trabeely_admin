import React, { useContext } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Col,
} from "reactstrap";
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from '../../services/axios'
import { AuthContext } from '../../contexts/UserAuthentication'
import { useToasts } from 'react-toast-notifications'
import { LOGIN_API } from "services/api_url";
import gotoPage from "services/gotoPage";
import {PreLoaderContext} from '../../contexts/PreLoaderContext'
const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
})
const Login = () => {
  const { setIsLoading } = useContext(PreLoaderContext)
  const { setIsAuthenticated, setAuthUser } = useContext(AuthContext)
  const { addToast } = useToasts()
  
  //For Agent Authentication
  const onLogin = async (values) => {
    try {
      setIsLoading(true)
      let result = await axios.post(LOGIN_API, values);
      if (result.data.success) {
      setIsLoading(false)
        setAuthUser(result.data.user)
        setIsAuthenticated(true)
        gotoPage(result.data.user.token, result.data.user, "/app/dashboard")
      }
    } catch (error) {
      setIsLoading(false)
      if (error.response) {
        addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  }
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
         
          <CardBody className="px-lg-5 py-lg-2">
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={SignInSchema}
              onSubmit={values => {
                onLogin(values)
              }}
            >
              {props => (
                <Form className='mt-5'>
                  <div className='form-group'>
                    <label className='font-weight-bold'>Email</label>
                    <Field
                      name='email'
                      className='form-control'
                      placeholder='e.g: example@gmail.com'
                      value={props.values.email}
                      onChange={props.handleChange('email')}
                    />
                    {props.errors.email && props.touched.email ? (
                      <small className='form-text text-danger'>{props.errors.email}</small>
                    ) : null}
                  </div>

                  <div className='form-group'>
                    <label className='font-weight-bold'>Password</label>
                    <Input
                      name='password'
                      type='password'
                      className='form-control'
                      placeholder='********'
                      value={props.values.password}
                      onChange={props.handleChange('password')}
                    />
                    {props.errors.password && props.touched.password ? (
                      <small className='form-text text-danger'>{props.errors.password}</small>
                    ) : null}
                  </div>
                  <div className='form-group'>
                    <div className="text-center">
                      <Button className="my-4" color="primary" type="submit">
                        Sign in
                     </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
