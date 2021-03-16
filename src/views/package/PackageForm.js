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
import { PACKAGE_API } from '../../services/api_url'
import { useToasts } from 'react-toast-notifications'
import ImageUploading from "react-images-uploading";
import DateTimePicker from 'react-datetime-picker';
import {includesOption} from '../../MultipleOption'
const ValidationSchema = Yup.object().shape({
    title: Yup.string().required('title is required'),
    price: Yup.string().required('price is required'),
    packageType: Yup.string().required('packageType is required'),
    address: Yup.string().required('address is required'),
})

function PackageForm() {
    const [includes, setIncludes] = useState([]);
    const [validFiles, setValidFiles] = useState([]);
    const [value, onChange] = useState(new Date());
   
    const { addToast,removeAllToasts } = useToasts()
    const [images, setImages] = useState([]);
    const maxNumber = 10;
    const onImageSelectChange = (imageList, addUpdateIndex) => {
        // data for submit
        let file = []
        imageList.map(data => file.push(data.file))
        setValidFiles(file)
        setImages(imageList);
    };

    const onAddPackage = async (values, actions) => {
        if(validFiles.length == 0 ){
            addToast("You have not selected any images !", {
                appearance: "error",
                autoDismiss: true,
            });
        }else if(includes.length ==0){
            addToast("You have not included item for package !", {
                appearance: "error",
                autoDismiss: true,
            });
        }else{
            const formData = new FormData();
            formData.append("event", "package");
            formData.append("startDate", value);
            //Includes Array
            for (var i = 0; i < includes.length; i++) {
                formData.append('includes', includes[i].name);
            }
            //Package Image Arrary
            Array.from(validFiles).map(function (value, index) {
                formData.append("picture", validFiles[index]);
            })
            //Non-Array Value to store package desc, name, title
            for (const property in values) {
                formData.append(property, values[property]);
            }
            try {
                let result = await axios.post(PACKAGE_API, formData);
                if (result.data.success) {
                    removeAllToasts()
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
       
    }

    // multiselect on select and remove
    const onSelect = (selectedList) => {
        setIncludes(selectedList);
    };

    const onRemove = (selectedList) => {
        setIncludes(selectedList);
    };
    return (
        <Card className="bg-secondary shadow mb-4">
            <CardBody>
                
                <Formik
                    initialValues={{
                        title: '',
                        price: '',
                        destination: '',
                        address: '',
                        duration: '',
                        cancelPolicy: '',
                        packageType: ''
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, actions) => {
                        onAddPackage(values, actions)
                    }}>
                    {props => (
                        <Form className='mt-2'>
                            <h6 className="heading-small text-muted mb-4">
                                Package information</h6>
                            <div className="pl-lg-4">
                                <Row>
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
                                    <Col lg="2">
                                        <FormGroup>
                                            <label className="form-control-label"
                                                htmlFor="input-price"
                                            >Price</label>
                                            <Field
                                                name='price'
                                                className='form-control'
                                                placeholder='Enter price'
                                                value={props.values.price}
                                                onChange={props.handleChange}
                                            />
                                            {props.errors.price && props.touched.price ? (
                                                <small className='form-text text-danger'>{props.errors.price}</small>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                    <Col lg="2">
                                        <FormGroup>
                                            <label className="form-control-label"
                                                htmlFor="input-price"
                                            >Minimum traveler</label>
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

                                </Row>
                                <Row>
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

                                    <Col lg="4">
                                        <FormGroup>
                                            <label className="form-control-label"
                                                htmlFor="input-address">
                                                Duration  </label>
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
                                            <label className="form-control-label"
                                                htmlFor="input-address">Package Type  </label>
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
                                </Row>
                                <h6 className="heading-small text-muted mb-4"> Includes Section</h6>
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
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
                                    <Col lg="6">
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
                                    <Col lg="12">
                                        <FormGroup>
                                            <label className="form-control-label">
                                            Cancellation Policy </label>
                                            <textarea
                                                rows="4"
                                                cols="40"
                                                name='cancelPolicy'
                                                className='form-control'
                                                placeholder='Enter cancel policy'
                                                value={props.values.cancelPolicy}
                                                onChange={props.handleChange}
                                            />
                                            {props.errors.cancelPolicy && props.touched.cancelPolicy ? (
                                                <small className='form-text text-danger'>{props.errors.cancelPolicy}</small>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </div>
                            <hr className="my-4" />
                            <h6 className="heading-small text-muted mb-4"> Image Section</h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            {/* <ImageUploader
                                                withIcon={true}
                                                withPreview={true}
                                                buttonText='Choose images'
                                                onChange={onDrop}
                                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                                maxFileSize={15242880}
                                            /> */}
                                            <ImageUploading
                                                multiple
                                                value={images}
                                                onChange={onImageSelectChange}
                                                maxNumber={maxNumber}
                                                dataURLKey="data_url"
                                            >
                                                {({
                                                    imageList,
                                                    onImageUpload,
                                                    onImageUpdate,
                                                    onImageRemove,
                                                }) => (
                                                    <>
                                                        <Row>
                                                            <Col md="2">
                                                                <div 
                                                                    onClick={onImageUpload}>
                                                                   <a className="btn btn-primary"> <span className="text-white">Open image</span></a>
                                                                </div>
                                                            </Col>
                                                            <Col md="8">
                                                                {imageList.length != 0 ?
                                                                    <div className="form-group multi-preview">
                                                                        {imageList.map((image, index) => (
                                                                            <Row>
                                                                                <div className="col-md-8">
                                                                                    <CardTitle className="text-uppercase text-muted mb-0">
                                                                                        <img className="img-fluid" alt="Responsive image" src={image.data_url} alt="" width="100" />
                                                                                    </CardTitle>
                                                                                </div>
                                                                                <Col className="col-auto">
                                                                                    <Button color="primary" tooltip="update" className="text-left my-2" onClick={() => onImageUpdate(index)}><i class="fas fa-edit"></i></Button>
                                                                                    <Button color="danger" className="text-left my-2" onClick={() => onImageRemove(index)}><i class="fas fa-eraser"></i></Button>

                                                                                </Col>
                                                                            </Row>
                                                                        ))}
                                                                    </div> : "Image not selected."}

                                                            </Col>
                                                        </Row>



                                                    </>
                                                )}
                                            </ImageUploading>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </div>
                            <div className='pl-lg-4 form-group'>
                                <div className="text-left">
                                    <button className="btn btn-primary col-md-1" type="submit">
                                        Add
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </CardBody>
        </Card>

    )
}

export default PackageForm

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