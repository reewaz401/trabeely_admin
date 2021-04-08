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
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import { PACKAGE_API } from '../../services/api_url'
import { useToasts } from 'react-toast-notifications'
import ImageUploading from "react-images-uploading";
const ItineraryModel = {
    day: 1,
    routeName: '',
    routeDesc: '',
    routeImg: ''
}
//import images from local
const ValidationSchema = Yup.object().shape({
    title: Yup.string().required('title is required'),
    price: Yup.string().required('price is required'),
    packageType: Yup.string().required('packageType is required'),
    address: Yup.string().required('address is required'),
})

function PackageForm() {
    const [itinerary, setItinerary] = useState([ItineraryModel]);
    const [includes, setIncludes] = useState([]);
    const [validFiles, setValidFiles] = useState([]);
    let includesOption = [
        { name: "Bag" },
        { name: "Sleeping Bag" },
        { name: "Apple" },
        { name: "Orange" },
    ]

    const { addToast } = useToasts()
    const [selectPackageImage, setSelectPackageImage] = useState([]);
    const [preview, setPreview] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef();

    const [images, setImages] = React.useState([]);
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        imageList.map(data=>setValidFiles(data.file))
        setImages(imageList);
    };

    const getSelectedImage = (files) => {
        let fileObj = [];
        let fileArray = []
        fileObj.push(files)
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]))
        }
        setPreview(fileArray);
        setSelectPackageImage(fileObj);

    };

    const handleFiles = (files) => {
        for (let i = 0; i < files.length; i++) {
            // add to an array so we can display the name of file
            setSelectedFiles(prevArray => [...prevArray, files[i]]);
        }
    }

    const handleFileChange = () => {
        getSelectedImage(fileInputRef.current.files)
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }
    useEffect(() => {
        let filteredArray = selectedFiles.reduce((file, current) => {
            const x = file.find(item => item.name === current.name);
            if (!x) {
                return file.concat([current]);
            } else {
                return file;
            }
        }, []);
        setValidFiles([...filteredArray]);

    }, [selectedFiles]);
    const validateFile = (file) => {
        const validTypes = ['application/pdf'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    }
    const removeFile = (name) => {
        // find the index of the item
        // remove the item from array
        const validFileIndex = validFiles.findIndex(e => e.name === name);
        validFiles.splice(validFileIndex, 1);
        // update validFiles array
        setValidFiles([...validFiles]);
        const selectedFileIndex = selectedFiles.findIndex(e => e.name === name);
        selectedFiles.splice(selectedFileIndex, 1);
        // update selectedFiles array
        setSelectedFiles([...selectedFiles]);
    }

    const onAddPackage = async (values, actions) => {
        
        const formData = new FormData();
        formData.append("event", "package");
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

        //Itinerary Array
        // Array.from(itineraryImage).map(function (value, index) {
        //     formData.append("picture", itineraryImage[index]);
        // })
        // formData.append("itinerary", JSON.stringify(itinerary));

        try {
            let result = await axios.post(PACKAGE_API, formData);
            if (result.data.success) {
                addToast("Packages Added", {
                    appearance: "success",
                    autoDismiss: true,
                });
            }
        } catch (error) {
            if (error.response) {
                addToast(error.response.data.message, {
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
        <Card className="bg-secondary shadow mb-4">
            <CardBody>
                <Formik
                    initialValues={{
                        title: '',
                        price: '',
                        destination: '',
                        address: '',
                        duration: '',
                        packageType: '',
                        includes: ''
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
                                            <Field
                                                name='title'
                                                className='form-control'
                                                placeholder='e.g: anapurna base camp'
                                                value={props.values.title}
                                                onChange={props.handleChange('title')}
                                            />
                                            {props.errors.title && props.touched.title ? (
                                                <small className='form-text text-danger'>{props.errors.title}</small>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label className="form-control-label"
                                                htmlFor="input-price"
                                            >Price</label>
                                            <Field
                                                name='price'
                                                className='form-control'
                                                placeholder='enter price'
                                                value={props.values.price}
                                                onChange={props.handleChange('price')}
                                            />
                                            {props.errors.price && props.touched.price ? (
                                                <small className='form-text text-danger'>{props.errors.price}</small>
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
                                                onChange={props.handleChange('destination')}
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
                                                placeholder='enter address'
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
                                                placeholder='enter duration'
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
                                                htmlFor="input-address">
                                                Package Type  </label>
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
                                    <h6 className="heading-small text-muted mb-4"> Includes Section</h6>

                                    <Col md="12">
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
                                </Row>
                            </div>
                            <hr className="my-4" />
                            <h6 className="heading-small text-muted mb-4"> Image Section</h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col md="4">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-day"
                                        > Package Images </label>
                                        <input
                                                multiple
                                                name="picture"
                                                type="file"
                                                accept="image/png, image/jpeg, image/jpg"
                                                ref={fileInputRef}
                                                onChange={() => handleFileChange()}
                                                className="form-control"
                                            /> 
                                    </Col>

                                    <Col md="12">
                                        <FormGroup>
                                            <ImageUploading
                                                multiple
                                                value={images}
                                                onChange={onChange}
                                                maxNumber={maxNumber}
                                                dataURLKey="data_url"
                                            >
                                                {({
                                                    imageList,
                                                    onImageUpload,
                                                    onImageRemoveAll,
                                                    onImageUpdate,
                                                    onImageRemove,
                                                    isDragging,
                                                    dragProps
                                                }) => (
                                                    // write your building UI
                                                    <>
                                                        <a style={isDragging ? { color: "red" } : null}
                                                            onClick={onImageUpload}
                                                            {...dragProps} className="btn btn-primary text-white">Select or drop your image</a>

                                                        <div className="form-group multi-preview">
                                                            {imageList.map((image, index) => (
                                                                <Row>
                                                                    <div className="col-md-8">
                                                                        <CardTitle className="text-uppercase text-muted mb-0">
                                                                            <img className="img-fluid" alt="Responsive image" src={image.data_url} alt="" width="100" />
                                                                        </CardTitle>
                                                                    </div>
                                                                    <Col className="col-auto">
                                                                        <Button color="primary" tooltip="update" className="text-left my-2" onClick={() => onImageUpdate(index)}><i className="fas fa-edit"></i></Button>
                                                                        <Button color="danger" className="text-left my-2" onClick={() => onImageRemove(index)}><i className="fas fa-eraser"></i></Button>

                                                                    </Col>
                                                                </Row>
                                                            ))}
                                                        </div>
                                                    </>
                                                    // <Row>
                                                    //     <Col md="12">
                                                    //         <button  style={isDragging ? { color: "red" } : null}
                                                    //             onClick={onImageUpload}
                                                    //             {...dragProps} className="btn btn-primary">Select or drop your image</button>
                                                    //         <button className="btn btn-primary" onClick={onImageRemoveAll}>Remove all images</button>

                                                    //             <div className="form-group multi-preview">
                                                    //                 {imageList.map((image, index) => (
                                                    //                     <>
                                                    //                         <img className="img-fluid" alt="Responsive image" src={image.data_url} alt="" width="100" />
                                                    //                        <div>
                                                    //                        <Button color="primary"  className="text-left my-2" onClick={() => onImageUpdate(index)}>Update</Button>
                                                    //                         <Button  color="primary" className="text-left my-2" onClick={() => onImageRemove(index)}>Remove</Button>

                                                    //                        </div>
                                                    //                     </>
                                                    //                 ))}
                                                    //             </div>

                                                    //     </Col>
                                                    // </Row>

                                                )}
                                            </ImageUploading>
                                        </FormGroup>
                                    </Col>
                                    {/* <Col md="8">
                                        <FormGroup>
                                            <label className="form-control-label">Selected Images</label>
                                            <small>(You can select particular image - if needed) </small>
                                            {preview.length <= 0 ? "" :
                                                <div className="form-group multi-preview">
                                                    {validFiles && validFiles.map((file, i) =>
                                                        <>
                                                            <span><i className="fa fa-times" onClick={() => removeFile(file.name)}></i></span>
                                                            <img height="100" width="100" className="img-fluid" alt="Responsive image" src={URL.createObjectURL(file)} />

                                                        </>
                                                    )}

                                                </div>}
                                        </FormGroup>
                                    </Col> */}

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

export default PackageForm
