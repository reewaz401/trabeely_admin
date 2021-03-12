import React, { useState, useContext, useEffect } from 'react'
import {
    Button,
    Card, CardBody,
    FormGroup, Row, Col, CardImg, CardTitle
} from "reactstrap";
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from '../../services/axios'
import { HOTEL_ROOM_ADD_API, AGENT_HOTEL_API } from '../../services/api_url'
import { useToasts } from 'react-toast-notifications'
import ImageUploading from "react-images-uploading";
import Select from 'react-select'
import { HotelContext } from '../../contexts/HotelContext'
import { ROOM_TYPE } from '../../MultipleOption'
const ValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    totalRoom: Yup.string().required('Total room is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    hotelDesc: Yup.string().required('Description is required'),
})

function HotelRoomForm() {
    const [validFiles, setValidFiles] = useState([]);
    const { addToast, removeAllToasts } = useToasts()
    const [images, setImages] = useState([]);
    const [hotelId, setHotelId] = useState(null)
    const maxNumber = 10;
    const { hotels } = useContext(HotelContext)
    let obj = {};
    let arr = [];
    const newObj = (value, label) => {
        obj = {
            value: value,
            label: label,
        };
        arr.push(obj);
    };

    const onImageSelectChange = (imageList, addUpdateIndex) => {
        let file = []
        imageList.map(data => file.push(data.file))
        setValidFiles(file)
        setImages(imageList);
    };
    useEffect(() => {
        hotels.map((option, i) =>
            newObj(option._id, option.name)
        );
    }, [arr])

    const onAddTrigger = async (values, actions) => {
        if (validFiles.length == 0) {
            addToast("You have not selected any images !", {
                appearance: "error",
                autoDismiss: true,
            });
        } else {
            const formData = new FormData();
            formData.append("event", "room");
            //Package Image Arrary
            Array.from(validFiles).map(function (value, index) {
                formData.append("picture", validFiles[index]);
            })
            //Non-Array Value to store package desc, name, title
            for (const property in values) {
                formData.append(property, values[property]);
            }
            try {
                let result = await axios.post(HOTEL_ROOM_ADD_API, formData);
                if (result.data.success) {
                    removeAllToasts()
                    addToast("Hotel Added", {
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
    const onSelectHotelOption = (hotel) => {
        setHotelId(hotel.value)
    }
    const onSelectRoomType = (roomType) => {
        setHotelId(roomType.value)
    }
    return (
        <Card className="bg-secondary shadow mb-4">
            <CardBody>
                <Formik
                    initialValues={{
                        name: '',
                        totalRoom: '',
                        address: '',
                        country: '',
                        // checkIn: '',
                        // checkOut: '',
                        hotelDesc: ''
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, actions) => {
                        onAddTrigger(values, actions)
                    }}>
                    {props => (
                        <Form className='mt-2'>
                            <h6 className="heading-small text-muted mb-4">
                                Hotel Room Information</h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label className="form-control-label"
                                                htmlFor="input-username" >Hotel Name</label>
                                            <Select
                                                onChange={onSelectHotelOption}
                                                options={arr} />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label className="form-control-label"
                                                htmlFor="input-price"
                                            >Room Type</label>
                                            <Select
                                                onChange={onSelectHotelOption}
                                                options={ROOM_TYPE} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label className="form-control-label"> Price</label>
                                            <Field
                                                name='price'
                                                className='form-control'
                                                placeholder='enter price'
                                                value={props.values.price}
                                                onChange={props.handleChange}
                                            />
                                            {props.errors.price && props.touched.price ? (
                                                <small className='form-text text-danger'>{props.errors.price}</small>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label className="form-control-label"
                                                htmlFor="input-address">
                                                Room  </label>
                                            <Field
                                                name='numberOfRoom'
                                                className='form-control'
                                                placeholder='Enter number of room'
                                                value={props.values.numberOfRoom}
                                                onChange={props.handleChange}
                                            />
                                            {props.errors.numberOfRoom && props.touched.numberOfRoom ? (
                                                <small className='form-text text-danger'>{props.errors.numberOfRoom}</small>
                                            ) : null}
                                        </FormGroup>
                                    </Col>

                                    <Col lg="4">
                                        <FormGroup>
                                            <label className="form-control-label"
                                                htmlFor="input-address">
                                                Available Seat(Person per bed)</label>
                                            <Field
                                                name='seat'
                                                className='form-control'
                                                placeholder='Enter Seat per person'
                                                value={props.values.seat}
                                                onChange={props.handleChange}
                                            />
                                            {props.errors.seat && props.touched.seat ? (
                                                <small className='form-text text-danger'>{props.errors.seat}</small>
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
                                                    onImageRemove
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

export default HotelRoomForm