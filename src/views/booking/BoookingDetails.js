import React, { useContext, useState, useEffect } from 'react'
import axios from '../../services/axios'
import { GET_BOOKING_BY_AGENT_API, CONFIRM_BOOKING_FOR_AGENT_API } from '../../services/api_url'
import DataTable from 'components/Datatable/DataTable'
import { Card, CardBody } from 'reactstrap'
import { textFilter } from 'react-bootstrap-table2-filter';
import NoActionBanner from 'components/Headers/NoActionBanner'
import { useToasts } from 'react-toast-notifications'
import { confirmAlert } from "react-confirm-alert";
import { PermissionContext } from 'contexts/PermissionContext'
import { TRAVEL, ADMINISTRATOR, HOTEL_AGENT } from '../../role_access'
import { PreLoaderContext } from '../../contexts/PreLoaderContext'
import moment from 'moment'
import TitlePage from 'components/Headers/TitlePage'
function BookingDetails() {
    const { addToast } = useToasts()
    const { granted } = useContext(PermissionContext);
    const { setIsLoading } = useContext(PreLoaderContext)
    const [bookingDate, setBookingDate] = useState([])

    const getBookingDetail = async () => {
        try {
            setIsLoading(true)
            let result = await axios.post(GET_BOOKING_BY_AGENT_API, {
                role: granted
            })
            if (result.data.success) {
                setIsLoading(false)
                setBookingDate(result.data.data)
                console.log(result.data.data)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }

    const confirm = (_id, title) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="confirmation-box">
                        <h4 className="title">Confirm {title} Booking</h4>
                        <p>Are you sure? This action cannot
                            be undone!</p>
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                onBookinConfirm(_id);
                                onClose();
                            }}
                        >Yes, it !</button>
                        <button className="btn btn-dark" onClick={onClose}>
                            Cancel</button>
                    </div>
                );
            },
        });
    };

    // delete selected Packages
    const onBookinConfirm = async (id) => {
        try {
            // let result = await axios.delete(CLUB_DELETE_API + id)
            // if (result.data.success) {
            //     addToast(result.data.message, {
            //         appearance: "success",
            //         autoDismiss: true,
            //     });
            //     window.location.reload();
            // }
        } catch (error) {
            addToast("Delete failed. Please try again", {
                appearance: "error",
                autoDismiss: true,
            });
        }
    }
    const actionList = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                <div style={{ width: "200px" }}>
                    {!row.status ? (
                        <button tooltip="Not confirm" className="btn-customdone" onClick={(e) => ""}><i class="fas fa-check-double"></i></button>
                    ) : <span className="text-green">Confirmed</span>}
                    <button className="btn-custominfo" onClick={(e) => alert(rowIndex)}><i class="fas fa-eye"></i></button>
                    <button className="btn-customdanger" onClick={(e) => confirm(row._id, row.title)}><i class="fas fa-trash"></i></button>
                </div>
            </>
        );
    };
    const dateFormat = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                <span >{moment(row.bookDate).format("llll")}</span>
            </>
        );
    };

    const statusFormat = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                {!row.status ? (
                    <span className="text-red">Pending</span>
                ) : <span className="text-green">Confirmed</span>}
            </div>
        );
    }
    const peopleFormat = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <span>{`${row.adult} + ${row.child} = ${row.numberOfPeople} people`}</span>
            </div>
        );
    }
    const defaultSorted = [{
        dataField: 'createdAt',
        order: 'desc'
    }];
    const hotelColumn = [
        { dataField: 'bookDate', text: 'Booking Date', formatter: dateFormat, sort: true },
        { dataField: 'hotel.name', text: 'Pck. Title' },
        { dataField: 'hotel.totalRoom', text: 'Pck. Destiantion' },
        { dataField: 'hotel.address', text: 'Pck. Address' },
        { dataField: 'child', text: 'adult+child', formatter: peopleFormat },
        { dataField: 'user.fullname', text: 'Booked By' },
        { dataField: 'user.contact', text: 'Contact' },
        { dataField: 'status', text: 'Approve', formatter: statusFormat },
        { dataField: 'Action', text: 'Action', formatter: actionList },
    ];
    const travelColumn = [
        { dataField: 'bookDate', text: 'Booking Date', formatter: dateFormat, sort: true },
        { dataField: 'package.title', text: 'Pck. Title' },
        { dataField: 'package.destination', text: 'Pck. Destiantion' },
        { dataField: 'package.address', text: 'Pck. Address' },
        { dataField: 'child', text: 'adult+child', formatter: peopleFormat },
        { dataField: 'user.fullname', text: 'Booked By' },
        { dataField: 'user.contact', text: 'Contact' },
        { dataField: 'status', text: 'Approve', formatter: statusFormat },
        { dataField: 'Action', text: 'Action', formatter: actionList },
    ];
    useEffect(() => {
        getBookingDetail()
    }, [])
    if (granted === ADMINISTRATOR) {
        return (
            <>
                <NoActionBanner />
                <Card className="bg-secondary shadow mb-">
                    <CardBody>
                        <TitlePage title="Travel Package Booking List" />
                        <DataTable columns={travelColumn} data={bookingDate} defaultSorted={defaultSorted} />
                    </CardBody>
                </Card>
                <Card className="bg-secondary shadow mb-">
                    <CardBody>
                        <TitlePage title="Hotel Booking List" />
                        <DataTable columns={hotelColumn} data={bookingDate} defaultSorted={defaultSorted} />
                    </CardBody>
                </Card>
            </>
        )
    } else if (granted === TRAVEL) {
        return (
            <>
                <NoActionBanner />
                <Card className="bg-secondary shadow mb-">
                    <CardBody>
                        <DataTable columns={travelColumn} data={bookingDate} defaultSorted={defaultSorted} />
                    </CardBody>
                </Card>
            </>
        )
    } else if (granted === HOTEL_AGENT) {
        return (
            <>
                <NoActionBanner />
                <Card className="bg-secondary shadow mb-">
                    <CardBody>
                        <DataTable columns={hotelColumn} data={bookingDate} defaultSorted={defaultSorted} />
                    </CardBody>
                </Card>
            </>
        )
    }
}

export default BookingDetails
