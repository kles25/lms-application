import "./datatable.css";
import { userColumns } from "./DataTableSource";
import { useEffect, useState } from "react";
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
} from "firebase/firestore";
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../config/firebase";
import CloseIcon from '@mui/icons-material/Close';


const StudentsData = () => {
    const [data, setData] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedItemData, setSelectedItemData] = useState(null);
    const [editMode, setEditMode] = useState(false);




    useEffect(() => {

        const unsub = onSnapshot(
            collection(db, "students"),
            (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list);
            },
            (error) => {
                console.log(error);
            }
        );

        return () => {
            unsub();
        };
    }, []);




    const handleDelete = (id) => {
        setSelectedItemId(id); // Set the selected item ID for deletion
        setShowConfirmation(true); // Show the confirmation dialog
    };

    const confirmDelete = async () => {
        try {
            await deleteDoc(doc(db, 'students', selectedItemId));
            setData(prevData => prevData.filter((item) => item.id !== selectedItemId));
            setShowConfirmation(false); // Close the confirmation dialog after successful deletion
        } catch (err) {
            console.log(err);
        }
    };

    const cancelDelete = () => {
        setShowConfirmation(false); // Close the confirmation dialog
    };

    const DetailsModal = ({ data, onClose }) => {
        // Design your modal to display the details using 'data'
        const [editedItemData, setEditedItemData] = useState(data);

        const handleEdit = () => {
            setEditMode(true); // Enable edit mode
        };

        const handleSave = () => {
            // Save edited data and update state
            setSelectedItemData(editedItemData);
            setEditMode(false);
            // Perform logic to save data to backend/database if necessary
        };

        const handleCancel = () => {
            // Save edited data and update state
            setEditMode(false);
            // Perform logic to save data to backend/database if necessary
        };

        return (
            <div className="modal">
                <div className="modal-header">
                    <h3 className="db-title">User Details</h3>
                    <CloseIcon onClick={onClose} />
                </div>
                {editMode ? (

                    <div className="form-input">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={editedItemData.displayName}
                            onChange={(e) =>
                                setEditedItemData({
                                    ...editedItemData,
                                    displayName: e.target.value,
                                })
                            }
                        />
                        <label>Birthdate:</label>
                        <input
                            type="date"
                            value={editedItemData.birthday}
                            onChange={(e) =>
                                setEditedItemData({
                                    ...editedItemData,
                                    birthday: e.target.value,
                                })
                            }
                        />
                        <label>Gender:</label>
                        <input
                            type="text"
                            value={editedItemData.gender}
                            onChange={(e) =>
                                setEditedItemData({
                                    ...editedItemData,
                                    gender: e.target.value,
                                })
                            }
                        />
                        <label>Email:</label>
                        <input
                            type="email"
                            value={editedItemData.email}
                            onChange={(e) =>
                                setEditedItemData({
                                    ...editedItemData,
                                    email: e.target.value,
                                })
                            }
                        />
                        <label>Contact:</label>
                        <input
                            type="text"
                            value={editedItemData.phone}
                            onChange={(e) =>
                                setEditedItemData({
                                    ...editedItemData,
                                    phone: e.target.value,
                                })
                            }
                        />
                        <label>Address:</label>
                        <input
                            type="text"
                            value={editedItemData.address}
                            onChange={(e) =>
                                setEditedItemData({
                                    ...editedItemData,
                                    address: e.target.value,
                                })
                            }
                        />
                        <button className="form-button" onClick={handleSave}>Save</button>
                        <button className="form-button" onClick={handleCancel}>Cancel</button>
                    </div>

                ) : (

                    <div className="form-input">
                        <label>Name:</label>
                        <input placeholder={data.displayName} readOnly />
                        <label>Role:</label>
                        <input placeholder={data.role} readOnly />
                        <label>Birthdate:</label>
                        <input placeholder={data.birthday} readOnly />
                        <label>Gender:</label>
                        <input placeholder={data.gender} readOnly />
                        <label >Email:</label>
                        <input className="lowercase-up" placeholder={data.email} readOnly />
                        <label>Contact:</label>
                        <input placeholder={data.phone} readOnly />
                        <label>Address:</label>
                        <input placeholder={data.address} readOnly />
                        <button className="form-button" onClick={handleEdit}>Edit</button>
                    </div>
                )}
            </div>

        );
    };

    const handleViewDetails = (id) => {
        const selectedItem = data.find((item) => item.id === id);
        setSelectedItemData(selectedItem); // Set selected item data
        setShowModal(true); // Show the modal
    };



    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cell-action">
                        {/* <AdminsDetailsLink id={params.row.id} /> */}
                        <button
                            className="viewButton"
                            onClick={() => handleViewDetails(params.row.id)}
                        >
                            View
                        </button>
                        <button
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="datatable">
            {showConfirmation && (
                <div className="alert-notification">
                    <div className="alert-notification-holder">
                        <p>Are you sure you want to delete this?</p>
                        <div className="nh-button-holder">
                            <button onClick={confirmDelete}>Confirm</button>
                            <button onClick={cancelDelete}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {showModal && (
                <div className="modal-container">
                    <div className="modal-background" onClick={() => setShowModal(false)} />
                    <div className="modal-content">
                        <DetailsModal
                            data={selectedItemData}
                            onClose={() => setShowModal(false)}
                        />
                    </div>
                </div>
            )}
            <DataGrid style={{ color: "#fffffe", fontWeight: "300", backgroundColor: "#071c30e6" }}
                className="datagrid"
                rows={data}
                columns={userColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default StudentsData;
