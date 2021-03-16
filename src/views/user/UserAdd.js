import React, { useState, useRef, useEffect } from 'react'
import {
    Button,
    Card, CardBody,
    FormGroup, Row, Col, CardTitle
} from "reactstrap";
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from '../../services/axios'
import { USERS_ADD_API } from '../../services/api_url'
import { useToasts } from 'react-toast-notifications'
const ValidationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    contact: Yup.string().required('Contact is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    gender: Yup.string().required('Gender is required'),
    fullname: Yup.string().required('Fullname is required')
})
function UserAdd() {
    const { addToast, removeAllToasts } = useToasts()
    const onAddTrigger = async (values, actions) => {
        try {
            let result = await axios.post(USERS_ADD_API, values);
            if (result.data.success) {
                removeAllToasts()
                window.location.reload();
            }else{
                addToast(result.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                });
            }
        } catch (error) {
            if (error.response) {
                removeAllToasts()
                addToast(error.response.data.err, {
                    appearance: "error",
                    autoDismiss: true,
                });
            }
        }
    }
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">User Add Form</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <Formik
                        initialValues={{
                            email: '',
                            contact: '',
                            gender: '',
                            country: '',
                            address: '',
                            fullname: ''
                        }}
                        validationSchema={ValidationSchema}
                        onSubmit={(values, actions) => {
                            onAddTrigger(values, actions)
                        }}>
                        {props => (
                            <Form className='col-md-12'>
                                <div className="pl-lg-2">
                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label className="form-control-label">Full Name</label>
                                                <input
                                                    name='fullname'
                                                    className='form-control'
                                                    placeholder='Enter your fullname'
                                                    value={props.values.fullname}
                                                    onChange={props.handleChange}
                                                />
                                                {props.errors.fullname && props.touched.fullname ? (
                                                    <small className='form-text text-danger'>{props.errors.fullname}</small>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label className="form-control-label">Email</label>
                                                <Field
                                                    name='email'
                                                    className='form-control'
                                                    placeholder='Enter email'
                                                    value={props.values.email}
                                                    onChange={props.handleChange}
                                                />
                                                {props.errors.email && props.touched.email ? (
                                                    <small className='form-text text-danger'>{props.errors.email}</small>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="4">
                                            <FormGroup>
                                                <label className="form-control-label">Country  </label>
                                                <Field
                                                    name='country'
                                                    className='form-control'
                                                    placeholder='Enter country'
                                                    value={props.values.country}
                                                    onChange={props.handleChange}
                                                />
                                                {props.errors.country && props.touched.country ? (
                                                    <small className='form-text text-danger'>{props.errors.country}</small>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col lg="4">
                                            <FormGroup>
                                                <label className="form-control-label">
                                                    Address  </label>
                                                <Field
                                                    name='address'
                                                    className='form-control'
                                                    placeholder='Enter address'
                                                    value={props.values.address}
                                                    onChange={props.handleChange}
                                                />
                                                {props.errors.address && props.touched.address ? (
                                                    <small className='form-text text-danger'>{props.errors.address}</small>
                                                ) : null}
                                            </FormGroup>
                                        </Col>

                                        <Col lg="4">
                                            <FormGroup>
                                                <label className="form-control-label">Gender</label>
                                                <select className='form-control' name="gender"
                                                    onChange={props.handleChange}>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </select>
                                            </FormGroup>
                                        </Col>
                                        <Col lg="4">
                                            <FormGroup>
                                                <label className="form-control-label">Contact </label>
                                                <Field
                                                    name='contact'
                                                    className='form-control'
                                                    placeholder='Enter contact'
                                                    value={props.values.contact}
                                                    onChange={props.handleChange}
                                                />
                                                {props.errors.contact && props.touched.contact ? (
                                                    <small className='form-text text-danger'>{props.errors.contact}</small>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='pl-lg-4 form-group'>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default UserAdd