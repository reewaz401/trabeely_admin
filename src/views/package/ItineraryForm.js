import React, { useState, useContext, useRef, useEffect } from 'react'
import {
    Button,
    Card, CardBody,
    FormGroup, Row, Col, CardTitle
} from "reactstrap";
import { useToasts } from 'react-toast-notifications'
import axios from '../../services/axios'
import { ITINERARY_API } from '../../services/api_url';
import { PackagesContext } from '../../contexts/AgentPackageContext'
import _ from "lodash"
import { Multiselect } from 'multiselect-react-dropdown'
import ImageUploading from "react-images-uploading";


function ItineraryForm() {
    var step = 1
    const ItineraryModel = {
        day: step,
        routeName: '',
        routeDesc: ''
        // routeImg: ''
    }
    let obj = {};
    let arr = [];
    const newObj = (key, value, name) => {
        obj = {
            key: key,
            value: value,
            name: name,
        };

        arr.push(obj);
    };

    const { packages } = useContext(PackagesContext)
    const [itinerary, setItinerary] = useState([ItineraryModel]);
    const [itineraryImage, setItineraryImage] = useState([]);
    const [id, setId] = useState("");
    const [day, setDay] = useState(step)
    const { addToast } = useToasts()
    const [preview, setPreview] = useState([]);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef();
    const [validFiles, setValidFiles] = useState([]);
    //    let pckgJSON = {}
    const getSelectedImage = (files) => {
        let fileObj = [];
        let fileArray = []
        fileObj.push(files)
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]))
        }
        setPreview(fileArray)
        setItineraryImage(fileObj);
        // const routeImg = e.target.files[0];
        // let temp2 = itineraryImage
        // temp2.push(routeImg)
        // setItineraryImage(temp2)
    };
    useEffect(() => {
        packages.map((option, i) =>
            newObj(i, option._id, option.title, option.title)
        );
    }, [arr])
    const onUpdateItinerary = async (e) => {
        const formData = new FormData();
        formData.append("event", "itinerary");
        formData.append("packageId", id);
        //Itinerary Array
        Array.from(validFiles).map(function (value, index) {
            formData.append("picture", validFiles[index]);
        })
        formData.append("itinerary", JSON.stringify(itinerary));
        try {
            let result = await axios.post(ITINERARY_API, formData);
            if (result.data.success) {
                addToast("Itinerary Added", {
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
        setId(selectedList[0].value)
    };
    // const fileType = (fileName) => {
    //     return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    // }

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
    const handleFiles = (files) => {
        for (let i = 0; i < files.length; i++) {
            // add to an array so we can display the name of file
            setSelectedFiles(prevArray => [...prevArray, files[i]]);
            // add a new property called invalid
            // files\[i\]['invalid'] = true;
            // add to the same array so we can display the name of the file
            // set error message
        }
    }
    const handleFileChange = () => {
        getSelectedImage(fileInputRef.current.files)
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }
    return (
        <>
            <Card className="bg-secondary shadow mb-4">
                <CardBody>
                    <h6 className="heading-small text-muted mb-4"> Make sure you have added your package first</h6>
                    <Col md="12">
                        <FormGroup>
                            <label className="form-control-label">Package Type</label>
                            <Multiselect
                                selectionLimit="1"
                                displayValue="name"
                                className='form-control'
                                options={arr}
                                onSelect={onSelect}
                                style={{
                                    searchBox: {
                                        border: "none", "borderBottom": "1px solid blue", "borderRadius": "0px"
                                    }
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <div className="pl-lg-4">
                        {itinerary.map((p, index) => {
                            return (
                                <Row>
                                    <label className="my-4">Day {step++}</label>
                                    <Col md="2">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-address"
                                            > Route Name </label>
                                            <input
                                                name='routeName'
                                                className='form-control'
                                                placeholder='enter route name'
                                                onChange={e => {
                                                    const routeName = e.target.value;
                                                    var temp = itinerary
                                                    temp[index].routeName = routeName
                                                    setItinerary(temp)
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-description"
                                            > Route Description </label>
                                            <textarea
                                                rows="1"
                                                cols="40"
                                                name='routeDesc'
                                                className='form-control'
                                                placeholder='enter route description'
                                                onChange={e => {
                                                    const routeDesc = e.target.value;
                                                    var temp = itinerary
                                                    temp[index].routeDesc = routeDesc
                                                    setItinerary(temp)
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup>
                                            <label
                                                className="form-control-label" htmlFor="input-description">Image</label>
                                            <input
                                                name="picture"
                                                type="file"
                                                accept="image/png, image/jpeg, image/jpg"
                                                // onChange={(e) => getSelectedImage(e)}
                                                ref={fileInputRef}
                                                onChange={() => handleFileChange()}
                                                className="form-control"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            );
                        })}
                        {preview.length <= 0 ? "" :
                            <div className="form-group multi-preview">
                                {validFiles && validFiles.map((file, i) =>
                                    <>
                                        {/* <span><i className="fa fa-times" onClick={() => removeFile(file.name)}></i></span> */}
                                        <img height="100" width="100" className="img-fluid" alt="Responsive image" src={URL.createObjectURL(file)} />

                                    </>
                                )}

                            </div>}
                        {/* {itineraryImage.length != 0 ?
                                                <div className="form-group multi-preview">
                                                    {itineraryImage.map((image, index) => (
                                                        <Row>
                                                            <div className="col-md-8">
                                                                <CardTitle className="text-uppercase text-muted mb-0">
                                                                    <img className="img-fluid" alt="Responsive image" src={URL.createObjectURL(image)} alt="" width="100" />
                                                                </CardTitle>
                                                            </div>
                                                            <Col className="col-auto">
                                                                <Button color="danger" className="text-left my-2" onClick={() => onImageRemove(index)}><i class="fas fa-eraser"></i></Button>
                                                            </Col>
                                                        </Row>
                                                    ))}
                                                </div> : "Image not selected."} */}
                        {/* {itineraryImage.length != 0 ?
                                <div className="form-group multi-preview">
                                    {itineraryImage.map((data, index) => (
                                        <Row>
                                            <div className="col-md-8">
                                                <CardTitle className="text-uppercase text-muted">
                                                    <img className="img-fluid" alt="Responsive image" src={URL.createObjectURL(data)} alt="" width="100" />
                                                </CardTitle>
                                            </div>
                                        </Row>
                                    ))}
                                </div> : ""} */}

                        <Button
                            onClick={(e) => {
                                e.preventDefault()
                                let tempday = day
                                tempday++;
                                setDay(tempday)
                                setItinerary(itinerary => [
                                    ...itinerary,
                                    {
                                        day: tempday,
                                        routeName: "",
                                        routeDesc: "",
                                        routeImg: '',
                                    }
                                ]);
                            }}
                            className="text-left my-2" color="primary" type="button">
                            <li className="fas fa-plus"></li>
                        </Button>
                        {day > 1 ? (<Button
                            onClick={(e) => onUpdateItinerary(e)}
                            className="text-left my-2" color="primary" type="button">
                            Add Itinerary
                        </Button>) :
                            ""}
                    </div>
                </CardBody>
            </Card>


        </>
    )
}

export default ItineraryForm


