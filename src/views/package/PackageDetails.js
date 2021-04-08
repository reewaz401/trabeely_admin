import React, { useContext, useState } from 'react'

import axios from '../../services/axios'
import { PACKAGE_UPDATE_API, PACKAGE_DELETE_API } from '../../services/api_url'
import DataTable from 'components/Datatable/DataTable'
import { Card, CardBody, Button } from 'reactstrap'
import { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import NoActionBanner from 'components/Headers/NoActionBanner'
import { useToasts } from 'react-toast-notifications'
import { confirmAlert } from "react-confirm-alert";
import moment from 'moment'
import 'moment-precise-range-plugin';
import { PackagesContext } from 'contexts/AgentPackageContext'
import PackageUpdate from './PackageUpdate'
import TitlePage from 'components/Headers/TitlePage'

function PackageDetails() {
    const { addToast } = useToasts()
    const [updateData, setUpdateData] = useState([])
    const [isUpdate, setIsUpdate] = useState(false)
    const [pkgId, setPkgId] = useState("")
    const { packages } = useContext(PackagesContext)
    const confirm = (_id, title) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="confirmation-box">
                        <h4 className="title">{title}</h4>
                        <p>Are you sure? This action cannot be undone!</p>
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                onDeletePackage(_id);
                                onClose();
                            }}
                        >Confirm it !</button>
                        <button className="btn btn-dark" onClick={onClose}>
                            Cancel</button>
                    </div>
                );
            },
        });
    };
    const onUpdateChange = (id, pckg) => {
        setIsUpdate(true);
        setUpdateData(pckg);
        setPkgId(id);
    }
    const onDeletePackage = async (id) => {
        try {
            let result = await axios.delete(PACKAGE_DELETE_API + id)
            if (result.data.success) {
                addToast(result.data.message, {
                    appearance: "success",
                    autoDismiss: true,
                });
                window.location.reload();
            }
        } catch (error) {
            addToast("Delete failed. Please try again", {
                appearance: "error",
                autoDismiss: true,
            });
        }
    }
    const onPublish = async (e, id) => {
        try {
            let result = await axios.put(PACKAGE_UPDATE_API, {
                _id: id,
                status: true
            })
            if (result.data.success) {
                addToast(result.data.message, {
                    appearance: "success",
                    autoDismiss: true,
                });
                window.location.reload();
            }
        } catch (error) {
            addToast("Publish failed. Please try again", {
                appearance: "error",
                autoDismiss: true,
            });
        }
    }

    const onDraftAndPublish = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                {!row.status ? (
                    <Button className="btn btn-success" onClick={(e) => onPublish(e, row._id)}><i className="fas fa-share"></i></Button>
                ) : <span className="text-green">Published</span>}
            </div>
        );
    }
    const onDateText = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                <span >{moment(row.startDate).format("llll")}</span>
            </>
        );
    };
    const actionList = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                <div style={{ width: "250px" }}>
                    <button className="btn-custominfo" onClick={(e) => onUpdateChange(row._id, row)}><i className="fas fa-eye"></i></button>
                    <button className="btn-customdanger" onClick={(e) => confirm(row._id, `Delete this ${row.title}`)}><i className="fas fa-trash"></i></button>
                </div>
            </>
        );
    };
    const defaultSorted = [{
        dataField: 'createdAt',
        order: 'desc'
    }];
    const columns = [
        { dataField: 'title', text: 'Title', sort: true, filter: textFilter() },
        { dataField: 'packageType', text: 'Type', filter: textFilter() },
        { dataField: 'destination', text: 'Destination', filter: textFilter() },
        { dataField: 'address', text: 'Meeting Point', filter: textFilter() },
        { dataField: 'price', text: 'price', sort: true, filter: textFilter() },
        { dataField: 'minTraveler', text: 'Min Traveler', sort: true, filter: textFilter() },
        { dataField: 'startDate', text: 'Date', formatter: onDateText },
        { dataField: 'status', text: 'Status', sort: true, formatter: onDraftAndPublish },
        { dataField: 'Action', text: 'Action', formatter: actionList },
    ];
    // useEffect(() => {
    //     getAllPackages()
    // }, [])
    return (
        <>
            <NoActionBanner />
            <Card className="bg-secondary shadow mb-">
                <CardBody>
                    <TitlePage title="Package List" />
                    {isUpdate ? <PackageUpdate pckg={updateData} pkgId={pkgId} setIsUpdate={setIsUpdate} /> :
                        <DataTable columns={columns} data={packages} defaultSorted={defaultSorted} />}
                </CardBody>
            </Card>
        </>
    )
}

export default PackageDetails
