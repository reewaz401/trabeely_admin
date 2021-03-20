import React, { useState, useEffect } from 'react'
import axios from '../../services/axios'
import { APPROVE_PRE_REGISTER, PRE_REGISTER_GET } from '../../services/api_url'
import DataTable from 'components/Datatable/DataTable'
import { Card, CardBody, Button } from 'reactstrap'
import NoActionBanner from 'components/Headers/NoActionBanner'
import { useToasts } from 'react-toast-notifications'
import { confirmAlert } from "react-confirm-alert";
import moment from 'moment'
import 'moment-precise-range-plugin';

function PreRegisters() {
    const { addToast } = useToasts()
    const [business, setBusiness] = useState([])
    const confirmAction = (_id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="confirmation-box">
                        <h4 className="title">Confirmation for business approval.</h4>
                        <p>Are you sure you want to confirm this business? This action cannot
                            be undone!</p>
                        <button
                            className="btn btn-success"
                            onClick={() => {
                                onApprove(_id);
                                onClose();
                            }}
                        >Approve</button>
                        <button className="btn btn-dark" onClick={onClose}>
                            Cancel</button>
                    </div>
                );
            },
        });
    };
    const getAllBusinessDetail = async () => {
        try {
            let result = await axios.get(PRE_REGISTER_GET)
            if (result.data.success) {
                setBusiness(result.data.data)
            }
        } catch (error) {
            addToast("Data fetching error", {
                appearance: "error",
                autoDismiss: true,
            });
        }
    }
    const onApprove = async (id) => {
        try {
            let result = await axios.put(APPROVE_PRE_REGISTER + id,{
                status:true
            })
            if (result.data.success) {
                window.location.reload();
                addToast(result.data.message, {
                    appearance: "success",
                    autoDismiss: true,
                });
            }
        } catch (error) {
            addToast("Cannot Approve", {
                appearance: "error",
                autoDismiss: true,
            });
        }
    }
        const onApproveAction = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                <div >
                {row.status ? "" :<Button className="btn btn-success button" onClick={(e) => confirmAction(row._id)}><i class="fas fa-check-double"></i></Button>}
                </div>
            </>
        );
    };
    const defaultSorted = [{
        dataField: 'createdAt',
        order: 'desc' 
    }];
    const statusFormat = (cell, row, rowIndex, formatExtraData) => {
        return <div >
            {!row.status ? <span className="text-red">Pending</span> :<span className="text-green">Approved</span>}
        </div>
    }
    const columns = [
        { dataField: 'fullName',text: 'Name', },
        { dataField: 'businessName', text: 'Business'},
        { dataField: 'address', text: 'Address' },
        { dataField: 'email', text: 'Email' },
        { dataField: 'contact', text: 'Contact' },
        { dataField: 'businessFor', text: 'Approach' },
        { dataField: 'other', text: 'Other' },
        { dataField: 'createdAt',sort:defaultSorted, text: 'Date',formatter:(cell,row)=>{return <span >{moment(row.createdAt).format("dddd, MMMM Do YYYY")}</span>}},
        { dataField: 'status', text: 'Approval', formatter: statusFormat },
        { dataField: 'Action', text: 'Action', formatter: onApproveAction },
    ];
    useEffect(() => {
        getAllBusinessDetail()
    }, [])
    return (
        <>
            <NoActionBanner />
            <Card className="bg-secondary shadow mb-">
                <CardBody>
                    <DataTable columns={columns} data={business} defaultSorted={defaultSorted} />
                </CardBody>
            </Card>
        </>
    )
}

export default PreRegisters
