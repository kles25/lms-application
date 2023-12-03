import "./admindashboard.css"
import React, { useState } from "react";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import {
    doc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, auth, storage } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const AdminAddUser = ({ inputs, title }) => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState("");
    const [data, setData] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const [role, setRole] = useState(''); // New state to store selected role

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };




    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({ ...data, [id]: value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(auth, data.email, data.password);

            // Upload image to storage and get download URL
            const date = new Date().getTime();
            const storageRef = ref(storage, `${data.displayName + date}`);
            await uploadBytesResumable(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            // Update the user's profile in Firebase Authentication
            await updateProfile(res.user, {
                displayName: data.displayName,
                photoURL: downloadURL, // Common profile detail for all roles
            });

            // Save additional role-specific details to Firestore
            if (role === 'admin') {
                await setDoc(doc(db, "admins", res.user.uid), {
                    uid: res.user.uid,
                    role: 'admin',
                    ...data, // Include additional admin details here
                    timeStamp: serverTimestamp(),
                    photoURL: downloadURL,
                });
            } else if (role === 'students') {
                await setDoc(doc(db, "students", res.user.uid), {
                    uid: res.user.uid,
                    role: 'student',
                    ...data, // Include additional student details here
                    timeStamp: serverTimestamp(),
                    photoURL: downloadURL,
                });
            } else if (role === 'teachers') {
                await setDoc(doc(db, "teachers", res.user.uid), {
                    uid: res.user.uid,
                    role: 'teacher',
                    ...data, // Include additional teacher details here
                    timeStamp: serverTimestamp(),
                    photoURL: downloadURL,
                });
            }

            // Show success notification and navigate
            navigate('/admin/users/admins')
        } catch (err) {
            setErr(true);
            setLoading(false);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000)
        }
    };



    return (
        <div className="add-user-profile">
            <div className={`alert-up ${showAlert ? 'alert-ups' : ''}`}>
                Please check you Email Address!
            </div>

            <div className="db-header-holder">
                <Link className="db-links" style={{ textDecoration: "none" }} to='/admin/users/admins'><ArrowBackIosIcon /><h3 className="db-title">Users List</h3></Link>
                <h3 className="db-title">{title}</h3>
            </div>
            <div className="pages-row form-holder">
                <div className="pages-col-6 image-upload">
                    <img className=""
                        src={
                            file
                                ? URL.createObjectURL(file)
                                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                        alt=""
                    />
                </div>
                <div className="pages-col-6">
                    <form onSubmit={handleAdd}>
                        <div className="form-input img-upload">
                            <label>
                                Upload Image:
                            </label>
                            <label htmlFor="file"><DriveFolderUploadIcon style={{ cursor: "pointer" }} /></label>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                        </div>
                        {inputs.map((input) => (
                            <div className="form-input" key={input.id}>
                                <label>{input.label}</label>
                                {input.type === "select" ? (
                                    <select
                                        id={input.id}
                                        onChange={handleInput}
                                        defaultValue="" // Set default value to the placeholder
                                    >
                                        {input.options.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        id={input.id}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        onChange={handleInput}
                                        required
                                    />
                                )}
                            </div>
                        ))}
                        <div className="form-input">
                            <label>Role:</label>
                            <select value={role} onChange={handleRoleChange}>
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="students">Student</option>
                                <option value="teachers">Teacher</option>
                            </select>
                        </div>
                        <div className="form-input">
                            <button className="form-button" type="submit">Confirm</button>
                        </div>
                        {loading && "Uploading and compressing the image please wait..."}
                        {err && <span>Something went wrong</span>}
                    </form>
                </div>
            </div>
        </div>

    )
}

export default AdminAddUser;
