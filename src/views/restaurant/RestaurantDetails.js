import React, { useState, useEffect, useMemo, useContext } from 'react'

import axios from '../../services/axios'
import { RESTAURANT_DELETE_API } from '../../services/api_url'
import DataTable from 'components/Datatable/DataTable'
import { Card, CardBody, Button } from 'reactstrap'
import { textFilter } from 'react-bootstrap-table2-filter';
import NoActionBanner from 'components/Headers/NoActionBanner'
import { useToasts } from 'react-toast-notifications'
import { confirmAlert } from "react-confirm-alert";
import 'moment-precise-range-plugin';
import { RestaurantContext } from 'contexts/AgentRestaurantContext'

function RestaurantDetails() {
    const { addToast } = useToasts()
    const {restaurants} = useContext(RestaurantContext)
    const confirmDelete = (_id, title) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="confirmation-box">
                        <h4 className="title">Delete {title} Restaurant</h4>
                        <p>Are you sure you want to delete this restaurant? This action cannot
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
    // const getAllRestaurants = async () => {
    //     try {
    //         let result = await axios.get(HOTEL_ALL_API)
    //         if (result.data.success) {
    //             setHotels(result.data.data)
    //         }
    //     } catch (error) {
    //         alert("data fetching error")
    //     }
    // }
    // delete selected restaurant
    const onDeleteAction = async (id) => {
        try {
            let result = await axios.delete(RESTAURANT_DELETE_API + id)
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
        { dataField: 'desc', text: 'Description',filter: textFilter() },
        { dataField: 'Action', text: 'Action', formatter: deleteAction },
    ];
    return (
        <>
            <NoActionBanner />
            <Card className="bg-secondary shadow mb-">
                <CardBody>
                    <DataTable columns={columns} data={restaurants} defaultSorted={defaultSorted} />
                </CardBody>
            </Card>
        </>
    )
}

export default RestaurantDetails
