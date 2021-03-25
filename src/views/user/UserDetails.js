import React, { useState, useContext, useEffect } from 'react'
import axios from '../../services/axios'
import { USERS_GET, USER_DELETE_API, USER_UPDATE_API } from '../../services/api_url'
import DataTable from 'components/Datatable/DataTable'
import { Card, CardBody, Button } from 'reactstrap'
import { textFilter } from 'react-bootstrap-table2-filter';
import NoActionBanner from 'components/Headers/NoActionBanner'
import { useToasts } from 'react-toast-notifications'
import { confirmAlert } from "react-confirm-alert";
import moment from 'moment'
import 'moment-precise-range-plugin';
import { PreLoaderContext } from '../../contexts/PreLoaderContext'
import Roles from '../../role'
import UserAdd from './UserAdd'

function UsersDetails() {
    const { setIsLoading } = useContext(PreLoaderContext)
    const { addToast } = useToasts()
    const [users, setUsers] = useState([])

    const confirmDelete = (_id, title) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="confirmation-box">
                        <h4 className="title">Delete {title} User</h4>
                        <p>Are you sure you want to delete this data? This action cannot
                            be undone!</p>
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                onDeleteUser(_id);
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
    const getAllUsers = async () => {
        try {
            setIsLoading(true)
            let result = await axios.get(USERS_GET)
            if (result.data.success) {
                setIsLoading(false)
                setUsers(result.data.users)
            }
        } catch (error) {
            setIsLoading(false)
            if (error.response) {
                addToast(error.response.data.error, {
                    appearance: "error",
                    autoDismiss: true,
                });
            }
        }
    }
    const onDeleteUser = async (id) => {
        try {
            let result = await axios.delete(USER_DELETE_API + id)
            if (result.data.success) {
                addToast(result.data.message, {
                    appearance: "success",
                    autoDismiss: true,
                });
                window.location.reload();
            }
        } catch (error) {
            addToast("Cannot delete", {
                appearance: "error",
                autoDismiss: true,
            });
        }
    }
    const onUpdateRole = async (e, id) => {
        try {
            let result = await axios.put(USER_UPDATE_API, {
                type: e.target.value,
                _id: id
            })
            if (result.data.success) {
                window.location.reload();
                addToast(result.data.message, {
                    appearance: "success",
                    autoDismiss: true,
                });
            }
        } catch (error) {
            addToast("Update failed", {
                appearance: "error",
                autoDismiss: true,
            });
        }
    }
    const defaultSorted = [{
        dataField: 'createdAt',
        order: 'desc'
    }];
    const actionOptionRow = (cell, row, rowIndex, formatExtraData) => {
        return <>
            <Button className="btn btn-info button" onClick={(e) => alert(rowIndex)}><i class="fas fa-edit"></i></Button>
            <Button className="btn btn-danger button" onClick={(e) => confirmDelete(row._id, row.fullname)}><i class="fas fa-trash"></i></Button>
        </>
    }
    const userRoleSelection = (cell, row, rowIndex, formatExtraData) => {
        return <>
            <select className="form-control" onChange={(e) => onUpdateRole(e, row._id)}>
                <option>Not assigned</option>
                {Roles.map((role) =>
                    <option value={role.value} selected={row.type?.includes(role.value)}>
                        {role.label}
                    </option>
                )}

            </select>
        </>
    }
    const columns = [
        { dataField: 'fullname', text: 'Full Name' },
        { dataField: 'email', text: 'Email' },
        { dataField: 'contact', text: 'Contact' },
        { dataField: 'gender', text: 'Gender' },
        { dataField: 'country', text: 'Country' },
        { dataField: 'address', text: 'Address' },
        { dataField: 'type', text: 'Role', formatter: userRoleSelection },
        { dataField: 'Action', text: 'Action', formatter: actionOptionRow },
        // { dataField: 'userImage', text: 'Date', formatter: (cell, row) => { return <img src={row.userImage}/> } },
    ];
    useEffect(() => {
        getAllUsers()
    }, [])
    return (
        <>
            <NoActionBanner />
            <Card className="bg-secondary shadow mb-">
                <CardBody>
                    <UserAdd/>
                    <div className="pb-3">
                        <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-plus-circle"></i></button>
                    </div>
                    <DataTable columns={columns} data={users} defaultSorted={defaultSorted} />
                </CardBody>
            </Card>
        </>
    )
}

export default UsersDetails
