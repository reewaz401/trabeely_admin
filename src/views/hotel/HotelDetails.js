import React, { useContext } from 'react'

import axios from '../../services/axios'
import { HOTEL_DELETE_API } from '../../services/api_url'
import DataTable from 'components/Datatable/DataTable'
import { Card, CardBody, Button } from 'reactstrap'
import { textFilter } from 'react-bootstrap-table2-filter';
import NoActionBanner from 'components/Headers/NoActionBanner'
import { useToasts } from 'react-toast-notifications'
import { confirmAlert } from "react-confirm-alert";
import moment from 'moment'
import 'moment-precise-range-plugin';
import { HotelContext } from 'contexts/HotelContext'

function HotelDetails() {
    const { addToast } = useToasts()
    const {hotels} = useContext(HotelContext);
    // const [hotels, setHotels] = useState([])
    const confirmDelete = (_id, title) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="confirmation-box">
                        <h4 className="title">Delete {title} Hotel</h4>
                        <p>Are you sure you want to delete this hotel? This action cannot
                            be undone!</p>
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                onDeleteAction(_id);
                                onClose();
                            }}
                        >Yes, Delete it !</button>
                        <button className="btn btn-dark" onClick={onClose}>
                            Cancel</button>
                    </div>
                );
            },
        });
    };

    // get all Packages
    // const getAllHotels = async () => {
    //     try {
    //         let result = await axios.get(HOTEL_ALL_API)
    //         if (result.data.success) {
    //             setHotels(result.data.data)
    //         }
    //     } catch (error) {
    //         alert("data fetching error")
    //     }
    // }
    // delete selected Packages
    const onDeleteAction = async (id) => {
        try {
            let result = await axios.delete(HOTEL_DELETE_API + id)
            if (result.data.success) {
                addToast(result.data.message, {
                    appearance: "success",
                    autoDismiss: true,
                });
            }
        } catch (error) {
            addToast("Delete failed. Please try again", {
                appearance: "error",
                autoDismiss: true,
            });
        }
    }


    const onDateText = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
           <span >{moment(row.startDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}</span>
            </>
        );
    };

    const deleteAction = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                <div style={{width:"200px"}}>
                    <Button className="btn btn-info button" onClick={(e) => alert(rowIndex)}><i class="fas fa-eye"></i></Button>
                    <Button className="btn btn-danger button" onClick={(e) => confirmDelete(row._id, row.title)}><i class="fas fa-trash"></i></Button>
                </div>
            </>
        );
    };
    const defaultSorted = [{
        dataField: 'name',
        order: 'desc'
    }];
    const columns = [
        { dataField: 'name', text: 'Hotel Name', sort: true,filter: textFilter() },
        { dataField: 'address', text: 'Address',filter: textFilter() },
        { dataField: 'country', text: 'Country', filter: textFilter() },
        { dataField: 'contact', text: 'Contact',filter: textFilter() },
        { dataField: 'Action', text: 'Action', formatter: deleteAction },
    ];
    // useEffect(() => {
    //     getAllHotels()
    // }, [])
    return (
        <>
            <NoActionBanner />
            <Card className="bg-secondary shadow mb-">
                <CardBody>
                    <DataTable columns={columns} data={hotels} defaultSorted={defaultSorted} />
                </CardBody>
            </Card>
        </>
    )
}

export default HotelDetails
