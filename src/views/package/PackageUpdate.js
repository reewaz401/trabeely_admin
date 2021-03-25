import React, { useState, useRef, useEffect } from 'react'
import { Multiselect } from 'multiselect-react-dropdown'
import {
    Button,
    Card, CardBody,
    FormGroup, Row, Col, CardImg, CardTitle
} from "reactstrap";
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from '../../services/axios'
import { PACKAGES_TYPE } from './PackageType';
import { PACKAGE_UPDATE_API } from '../../services/api_url'
import { useToasts } from 'react-toast-notifications'
import DateTimePicker from 'react-datetime-picker';
import { includesOption } from '../../MultipleOption'

function PackageUpdate({ pckg, pkgId, setIsUpdate }) {
    const initialValue = pckg;
    const [includes, setIncludes] = useState([]);
    const [value, onChange] = useState(new Date());
    const [isPrice, setIsPrice] = useState(false)
    const { addToast, removeAllToasts } = useToasts()
    const GroupDiscountModel = {
        people: 0,
        discount: 0,
    }
    const [groupDiscount, setGroupDiscount] = useState([GroupDiscountModel]);
    const onUpdate = async (values, actions) => {
        return
        const formData = new FormData();
        formData.append("event", "package");
        formData.append("startDate", value);
        formData.append("_id", pkgId);
        //Includes Array
        for (var i = 0; i < includes.length; i++) {
            formData.append('includes', includes[i].name);
        }
        formData.append("groupDiscount", JSON.stringify(groupDiscount));
        //Non-Array Value to store package desc, name, title
        for (const property in values) {
            formData.append(property, values[property]);
        }
        try {
            let result = await axios.post(PACKAGE_UPDATE_API, formData);
            if (result.data.success) {
                removeAllToasts()
                actions.resetForm();
                addToast("Packages Added", {
                    appearance: "success",
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

    // multiselect on select and remove
    const onSelect = (selectedList) => {
        setIncludes(selectedList);
    };

    const onRemove = (selectedList) => {
        setIncludes(selectedList);
    };
    return (
        <>
            <div className="pb-3">
                <button className="btn btn-primary"
                    onClick={(e) => setIsUpdate(false)}
                >Bacl to list</button>
            </div>
            <Formik
            enableReinitialize
                initialValues={initialValue}
                // validationSchema={ValidationSchema}
                onSubmit={(values, actions) => {
                    onUpdate(values, actions)
                }}>
                {props => (
                    <Form className='mt-2'>
                        <h6 className="heading-small text-muted mb-4">Add Packages</h6>
                        <div className="pl-lg-4">
                            {!isPrice ? (
                                <React.Fragment>
                                    <Row>
                                        <Col lg="4">
                                            <FormGroup>
                                                <label className="form-control-label">Package Type  </label>
                                                <select onChange={props.handleChange} name='packageType' className='form-control'>
                                                    <option>Select Package Type</option>
                                                    {PACKAGES_TYPE.map((data, i) => (
                                                        <option key={i} value={data}
                                                        // selected={type?.includes(data.packageType)}
                                                        >
                                                            {data}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FormGroup>
                                        </Col>
                                        <Col lg="4">
                                            <FormGroup>
                                                <label className="form-control-label"
                                                    htmlFor="input-username" >Package Title</label>
                                                <input
                                                    name='title'
                                                    className='form-control'
                                                    placeholder='e.g: anapurna base camp'
                                                    value={props.values.title}
                                                    onChange={props.handleChange}
                                                />
                                                {props.errors.title && props.touched.title ? (
                                                    <small className='form-text text-danger'>{props.errors.title}</small>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                       
                                        <Col lg="4">
                                            <FormGroup>
                                                <label className="form-control-label"
                                                    htmlFor="input-first-name"
                                                > Destination</label>
                                                <Field
                                                    name='destination'
                                                    className='form-control'
                                                    placeholder='e.g. Kathmandu'
                                                    value={props.values.destination}
                                                    onChange={props.handleChange}
                                                />
                                                {props.errors.destination && props.touched.destination ? (
                                                    <small className='form-text text-danger'>{props.errors.destination}</small>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col lg="4">
                                            <FormGroup>
                                                <label className="form-control-label"
                                                    htmlFor="input-address">
                                                    Meeting Point  </label>
                                                <Field
                                                    name='address'
                                                    className='form-control'
                                                    placeholder='Enter address'
                                                    value={props.values.address}
                                                    onChange={props.handleChange('address')}
                                                />
                                                {props.errors.address && props.touched.address ? (
                                                    <small className='form-text text-danger'>{props.errors.address}</small>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col lg="2">
                                            <FormGroup>
                                                <label className="form-control-label">Minimum traveler</label>
                                                <Field
                                                    name='minTraveler'
                                                    className='form-control'
                                                    placeholder='Enter minimum traveler'
                                                    value={props.values.minTraveler}
                                                    onChange={props.handleChange}
                                                />
                                                {props.errors.minTraveler && props.touched.minTraveler ? (
                                                    <small className='form-text text-danger'>{props.errors.minTraveler}</small>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col lg="2">
                                            <FormGroup>
                                                <label className="form-control-label">Duration  </label>
                                                <Field
                                                    name='duration'
                                                    className='form-control'
                                                    placeholder='Enter duration'
                                                    value={props.values.duration}
                                                    onChange={props.handleChange}
                                                />
                                                {props.errors.duration && props.touched.duration ? (
                                                    <small className='form-text text-danger'>{props.errors.duration}</small>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col lg="4">
                                            <FormGroup>
                                                <label className="form-control-label">
                                                    Start Date  </label>
                                                <DateTimePicker
                                                    className="react-datetime-picker form-control"
                                                    onChange={onChange}
                                                    value={value}
                                                    format="y-MM-dd h:mm:ss a"
                                                    minDate={new Date()}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="12">
                                            <FormGroup>
                                                <label className="form-control-label">Overview </label>
                                                <textarea
                                                    rows="4"
                                                    cols="40"
                                                    name='overview'
                                                    className='form-control'
                                                    placeholder='Specify your package overview'
                                                    value={props.values.overview}
                                                    onChange={props.handleChange}
                                                />
                                                {props.errors.overview && props.touched.overview ? (
                                                    <small className='form-text text-danger'>{props.errors.overview}</small>
                                                ) : null}
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                </React.Fragment>
                            ) : (
                                <>
                                    <Row>
                                        <Col lg="2">
                                            <FormGroup>
                                                <label className="form-control-label">Price per person  </label>
                                                <Field
                                                    name='price'
                                                    className='form-control'
                                                    placeholder='Price per person'
                                                    value={props.values.price}
                                                    onChange={props.handleChange}
                                                />
                                                {props.errors.price && props.touched.price ? (
                                                    <small className='form-text text-danger'>{props.errors.price}</small>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col lg="4">
                                            <h2>10% Commission wil be charged on every booking</h2></Col>
                                    </Row>
                                    <h6 className="heading-small text-muted mb-4"> Group Discount</h6>
                                    <Row>
                                        <Col lg="4">
                                            {groupDiscount.map((p, index) => {
                                                return (
                                                    <Row>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <label
                                                                    className="form-control-label">Number of people </label>
                                                                <Field
                                                                    name='people'
                                                                    className='form-control'
                                                                    placeholder='Enter number of people'
                                                                    // value={p.people ? p.people: null}
                                                                    onChange={e => {
                                                                        const people = e.target.value;
                                                                        var temp = groupDiscount
                                                                        temp[index].people = people
                                                                        setGroupDiscount(temp)
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="6">
                                                            <FormGroup>
                                                                <label
                                                                    className="form-control-label"> Discount (in Rs) </label>
                                                                <Field
                                                                    name='discount'
                                                                    className='form-control'
                                                                    placeholder='Enter your discount rate'
                                                                    // value={p}
                                                                    onChange={e => {
                                                                        const discount = e.target.value;
                                                                        var temp = groupDiscount
                                                                        temp[index].discount = discount
                                                                        setGroupDiscount(temp)
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>

                                                    </Row>
                                                );
                                            })}
                                        </Col>
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setGroupDiscount(discount => [
                                                    ...discount,
                                                    {
                                                        people: "",
                                                        discount: "",
                                                    }
                                                ]);
                                            }}
                                            className="text-left my-2" color="primary" type="button">
                                            <li className="fas fa-plus"></li>
                                        </Button>
                                    </Row>
                                    <hr className="my-2" />
                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label className="form-control-label">Include Section </label>
                                                <Multiselect
                                                    displayValue="key"
                                                    className='form-control'
                                                    options={includesOption}
                                                    displayValue="name"
                                                    onSelect={onSelect}
                                                    onRemove={onRemove}
                                                    style={{
                                                        chips: { background: "#0f367c" },
                                                        searchBox: {
                                                            border: "none", "borderBottom": "1px solid blue", "borderRadius": "0px"
                                                        }
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="12">
                                            <FormGroup>
                                                <label className="form-control-label">
                                                    Cancellation Policy </label>
                                                <select onChange={props.handleChange} name='cancelPolicy' className='form-control'>
                                                    <option value="One day before check in (6 pm)">One day before check in (6 pm)</option>
                                                    <option value="Two day before check in (6 pm)">Two day before check in (6 pm)</option>
                                                </select>
                                                {props.errors.cancelPolicy && props.touched.cancelPolicy ? (
                                                    <small className='form-text text-danger'>{props.errors.cancelPolicy}</small>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </div>
                        <div className='pl-lg-4 form-group'>
                            <div className="text-left">
                                {isPrice ? (
                                    <>
                                        <button className="btn btn-primary" onClick={(e) => setIsPrice(false)} type="button">
                                            Back </button>
                                        <button className="btn btn-primary" type="submit">
                                            Confirm</button>
                                    </>) :
                                    <button className="btn btn-primary" onClick={(e) => setIsPrice(true)} type="button">
                                        Next
                                        </button>
                                }
                            </div>
                        </div>


                    </Form>
                )}
            </Formik>
        </>

    )
}

export default PackageUpdate

// const getSelectedImage = (files) => {
//     let fileObj = [];
//     let fileArray = []
//     fileObj.push(files)
//     for (let i = 0; i < fileObj[0].length; i++) {
//         fileArray.push(URL.createObjectURL(fileObj[0][i]))
//     }
//     setPreview(fileArray);
//     setSelectPackageImage(fileObj);

// };