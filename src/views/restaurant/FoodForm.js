import React, { useState, useContext, useEffect } from 'react'
import {
    Button,
    Card, CardBody,
    FormGroup, Row, Col, CardImg, CardTitle
} from "reactstrap";
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from '../../services/axios'
import { FOOD_ADD_API } from '../../services/api_url'
import { useToasts } from 'react-toast-notifications'
import ImageUploading from "react-images-uploading";
import Select from 'react-select'
import { FOOD_TYPE } from 'MultipleOption';
import {RestaurantContext} from '../../contexts/AgentRestaurantContext'
const ValidationSchema = Yup.object().shape({
    foodName: Yup.string().required('Name is required'),
    price: Yup.string().required('Contact is required'),
})
function FoodForm() {
    const {restaurants} =  useContext(RestaurantContext)
    const [restaurantId, setRestaurantId] = useState('')
    const [foodType, setFoodType] = useState('')
    const [validFiles, setValidFiles] = useState([]);
    const { addToast, removeAllToasts } = useToasts()
    const [images, setImages] = useState([]);
    const maxNumber = 4;
    let obj = {};
    let arr = [];
    const newObj = (value, label) => {
        obj = {
            value: value,
            label: label,
        };
        arr.push(obj);
    };
    useEffect(() => {
        restaurants.map((option, i) =>
            newObj(option._id, option.name)
        );
    }, [arr])
    const onImageSelectChange = (imageList, addUpdateIndex) => {
        // data for submit
        let file = []
        imageList.map(data => file.push(data.file))
        setValidFiles(file)
        setImages(imageList);
    };
    const onSelectRestaurant = (item) => {
        setRestaurantId(item.value)
    }
    const onSelectFoodType = (item) => {
        setFoodType(item.value)
    }

    const onAddTrigger = async (values, actions) => {
        if (validFiles.length == 0) {
            addToast("You have not selected any images !", {
                appearance: "error",
                autoDismiss: true,
            });
        } else {
            const formData = new FormData();
            formData.append("event", "food");
            formData.append("foodType", foodType);
            formData.append("restaurant", restaurantId);
            Array.from(validFiles).map(function (value, index) {
                formData.append("picture", validFiles[index]);
            })
            for (const property in values) {
                formData.append(property, values[property]);
            }
            try {
                let result = await axios.post(FOOD_ADD_API, formData);
                if (result.data.success) {
                    addToast("Food Added", {
                        appearance: "success",
                        autoDismiss: true,
                    });
                }
            } catch (error) {
                if (error.response) {
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
                        foodName: '',
                        price: '',
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, actions) => {
                        onAddTrigger(values, actions)
                    }}>
                    {props => (
                        <Form className='mt-2'>
                            <h6 className="heading-small text-muted mb-4">
                                Food Information</h6>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label className="form-control-label" >Restaurant Name</label>
                                            <Select
                                                onChange={onSelectRestaurant}
                                                options={arr} />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label className="form-control-label">Food Name</label>
                                            <Field
                                                name='foodName'
                                                className='form-control'
                                                placeholder='e.g: anapurna hotel'
                                                value={props.values.foodName}
                                                onChange={props.handleChange}
                                            />
                                            {props.errors.foodName && props.touched.foodName ? (
                                                <small classfoodName='form-text text-danger'>{props.errors.foodName}</small>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label className="form-control-label">Price</label>
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
                                    <Col lg="4">
                                        <FormGroup>
                                            <label className="form-control-label">Food Types</label>
                                            <Select onChange={onSelectFoodType}
                                                options={FOOD_TYPE} />
                                        </FormGroup>
                                    </Col> 
                                    <Col lg="4">
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

export default FoodForm
