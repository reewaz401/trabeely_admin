import React, { useState, useRef, useEffect } from 'react'
import {
    Button,
    Card, CardBody,
    FormGroup, Row, Col, CardImg, CardTitle
} from "reactstrap";
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from '../../services/axios'
import { RESTAURANT_ADD_API } from '../../services/api_url'
import { useToasts } from 'react-toast-notifications'
import ImageUploading from "react-images-uploading";
const ValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address room is required'),
    contact: Yup.string().required('Contact is required'),
    desc: Yup.string().required('Description is required'),
    country: Yup.string().required('Country is required'),
})

function RestaurantForm() {
    const [validFiles, setValidFiles] = useState([]);
    const { addToast, removeAllToasts } = useToasts()
    const [images, setImages] = useState([]);
    const maxNumber = 10;
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const onImageSelectChange = (imageList, addUpdateIndex) => {
        // data for submit
        let file = []
        imageList.map(data => file.push(data.file))
        setValidFiles(file)
        setImages(imageList);
    };

    const onAddTrigger = async (values, actions) => {
        if (validFiles.length == 0) {
            addToast("You have not selected any images !", {
                appearance: "error",
                autoDismiss: true,
            });
        } else {
            const formData = new FormData();
            formData.append("event", "restaurant");
            Array.from(validFiles).map(function (value, index) {
                formData.append("picture", validFiles[index]);
            })
            for (const property in values) {
                formData.append(property, values[property]);
            }
            try {
                let result = await axios.post(RESTAURANT_ADD_API, formData);
                if (result.data.success) {
                    removeAllToasts()
                    addToast("Restaurant Added", {
                        appearance: "success",
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

    }

    return (
        <Card className="bg-secondary shadow mb-4">
            <CardBody>
                <Formik
                    initialValues={{
                        name: '',
                        address: '',
                        contact: '',
                        videoUrl: '',
                        desc: '',
                        country: '',
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, actions) => {
                        onAddTrigger(values, actions)
                    }}>
                    {props => (
                        <Form className='mt-2'>
                            <h6 className="heading-small text-muted mb-4">
                                Restaurant Information</h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label className="form-control-label">Restaurant Name</label>
                                            <input
                                                name='name'
                                                className='form-control'
                                                placeholder='Enter restaurant name'
                                                value={props.values.name}
                                                onChange={props.handleChange}
                                            />
                                            {props.errors.name && props.touched.name ? (
                                                <small className='form-text text-danger'>{props.errors.name}</small>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                    <Col lg="2">
                                        <FormGroup>
                                            <label className="form-control-label">Country</label>
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
                                            <label className="form-control-label">Address  </label>
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
                                    
                                    <Col lg="2">
                                        <FormGroup>
                                            <label className="form-control-label">Contact  </label>
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
                                <Row>
                                    <Col lg="12">
                                        <FormGroup>
                                            <label className="form-control-label">Description </label>
                                            <textarea
                                                rows="4"
                                                cols="40"
                                                name='desc'
                                                className='form-control'
                                                placeholder='Enter restaurant description'
                                                value={props.values.desc}
                                                onChange={props.handleChange}
                                            />
                                            {props.errors.desc && props.touched.desc ? (
                                                <small className='form-text text-danger'>{props.errors.desc}</small>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                    <Col lg="12">
                                        <FormGroup>
                                            <label className="form-control-label">Youtube Video Link </label>
                                            <Field
                                                name='videoUrl'
                                                className='form-control'
                                                placeholder='Enter Link (embedded code | share link)'
                                                value={props.values.videoUrl}
                                                onChange={props.handleChange}
                                            />
                                           
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
                            <div className='form-group'>
                                <div className="text-left">
                                    <button className="btn btn-primary" type="submit">
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

export default RestaurantForm

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