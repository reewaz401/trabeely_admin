import React, { useState, useEffect, useMemo } from 'react'

import axios from '../../services/axios'
import { PACKAGE_ALL_API, PACKAGE_DELETE_API } from '../../services/api_url'
import DataTable from 'components/Datatable/DataTable'
import { Card, CardBody, Button } from 'reactstrap'
import { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import NoActionBanner from 'components/Headers/NoActionBanner'
import { useToasts } from 'react-toast-notifications'
import { confirmAlert } from "react-confirm-alert";
import moment from 'moment'
import 'moment-precise-range-plugin';

function PackageDetails() {
    const { addToast } = useToasts()
    const [packages, setPackages] = useState([])
    const confirmDelete = (_id, title) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="confirmation-box">
                        <h4 className="title">Delete {title} Package</h4>
                        <p>Are you sure you want to delete this packages? This action cannot
                            be undone!</p>
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                onDeletePackage(_id);
                                onClose();
                            }}
                        >Yes, Delete this package !</button>
                        <button className="btn btn-dark" onClick={onClose}>
                            Cancel</button>
                    </div>
                );
            },
        });
    };

    // get all Packages
    const getAllPackages = async () => {
        try {
            let result = await axios.get(PACKAGE_ALL_API)
            if (result.data.success) {
                setPackages(result.data.packages)
            }
        } catch (error) {
            alert("data fetching error")
        }
    }
    // delete selected Packages
    const onDeletePackage = async (id) => {
        try {
            let result = await axios.delete(PACKAGE_DELETE_API + id)
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
        { dataField: 'title', text: 'Title', sort: true,filter: textFilter() },
        { dataField: 'packageType', text: 'Type',filter: textFilter() },
        { dataField: 'destination', text: 'Destination', filter: textFilter() },
        { dataField: 'address', text: 'Meeting Point',filter: textFilter() },
        { dataField: 'price', text: 'price', sort: true ,filter: textFilter()},
        { dataField: 'startDate', text: 'Date',formatter:onDateText, sort: true },
        { dataField: 'Action', text: 'Action', formatter: deleteAction },
    ];
    useEffect(() => {
        getAllPackages()
    }, [])
    return (
        <>
            <NoActionBanner />
            <Card className="bg-secondary shadow mb-">
                <CardBody>
                    <DataTable columns={columns} data={packages} defaultSorted={defaultSorted} />
                </CardBody>
            </Card>
        </>
    )
}

export default PackageDetails
