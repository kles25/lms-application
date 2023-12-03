import React, { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../config/firebase";

function StudentProfile() {
    const { currentUser } = useContext(AuthContext);
    const [additionalUserData, setAdditionalUserData] = useState({}); // State for additional user data

    const fetchUserData = async () => {
        try {
            if (currentUser && currentUser.uid) {
                const userDocRef = doc(db, "students", currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists) {
                    const userData = userDocSnap.data();
                    setAdditionalUserData(userData);
                }
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData, currentUser]);



    return (
        <div className="profile-container">
            <div className="profile-holder">
                <div className="pages-row">
                    <div className="pages-col-12">
                        <div className="profile-cover" style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/gradient-dark-blue-futuristic-digital-grid-background_53876-129728.jpg?w=1380&t=st=1700700329~exp=1700700929~hmac=ea4e367a0a3f6ecd1406e4cf081b62cd838d3702b5d5927fb92908d0ae3e523e")' }}></div>
                    </div>
                    <div className="pages-col-12">
                        <div className="profile-pic">
                            <img src={currentUser.photoURL} alt="profile" />
                            <h5 className="db-sub-title">{currentUser.displayName}</h5>
                        </div>
                    </div>
                    <div className="pages-col-12">
                        <div className="profile-overview">
                            <hr />
                            <h3 className="db-sub-title">Overview</h3>
                            <div className="profile-details">
                                <div className="pages-row">
                                    <div className="pages-col-6">
                                        <div className="details-style">
                                            <label>NAME</label>
                                            <input placeholder={currentUser.displayName || 'Loading...'} readOnly />
                                            <label>BIRTHDAY</label>
                                            <input placeholder={additionalUserData.birthday || 'Loading...'} readOnly />
                                            <label>GENDER</label>
                                            <input placeholder={additionalUserData.gender || 'Loading...'} readOnly />

                                        </div>
                                    </div>
                                    <div className="pages-col-6">
                                        <div className="details-style">
                                            <label>ADDRESS</label>
                                            <input placeholder={additionalUserData.address || 'Loading...'} readOnly />
                                            <label>EMAIL</label>
                                            <input placeholder={additionalUserData.email || 'Loading...'} readOnly />
                                            <label>PHONE</label>
                                            <input placeholder={additionalUserData.phone || 'Loading...'} readOnly />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentProfile;
