import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { db } from "../../config/firebase";
import AnimateCube from "../animation/AnimatedCube";
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const CourseDetails = () => {
    const { courseId } = useParams();
    const [courseDetails, setCourseDetails] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const docRef = doc(db, "courses", courseId);
                const courseDoc = await getDoc(docRef);
                if (courseDoc.exists()) {
                    setCourseDetails({ id: courseDoc.id, ...courseDoc.data() });
                } else {
                    // Handle user not found
                    console.log("User not found");
                }
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    const Modal = ({ topic, onClose }) => {
        return (
            <div className="course-modal-container">
                <div className="modal-content">
                    <div className="db-header-holder">
                        <h3 className="db-title">{topic}</h3>
                        <CloseIcon onClick={onClose} />
                    </div>
                    <p>Modal content related to the topic...</p>
                </div>
            </div>
        );
    };

    const handleTopicClick = (topic) => {
        setSelectedTopic(topic);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleUnitClick = (unit) => {
        // Update selected unit and its topics
        setSelectedUnit(unit);
    };

    if (!courseDetails) {
        return <div>Loading.....</div>;

    }
    return (
        <div className="course-details-container">
            <div className="animate-cube-holder">
                <AnimateCube />
            </div>
            <div className="pages-row course-details-holder">
                <div className="pages-col-12">
                    <div className="course-details-header">
                        <h3 className="db-title">{courseDetails.courseName}</h3>
                        <Link className="db-links" to="/admin/courses"><h3 className="db-title">Dashboard</h3><ArrowForwardIosIcon /></Link>
                    </div>
                </div>
                <div className="pages-col-12">
                    <div className="pages-row course-details-body">
                        <div className="pages-col-4">
                            <div className="course-navigation">
                                {courseDetails.units.map((unit, index) => (
                                    <div key={index}>
                                        <nav className={`db-navigation-links ${selectedUnit === unit ? 'active' : ''}`}><Link to="" onClick={() => handleUnitClick(unit)} >{unit.unitTitle}</Link></nav>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="pages-col-8">
                            <div className="course-unit-details">
                                {selectedUnit ? (
                                    <div>
                                        <h3 className="db-title">{selectedUnit.unitTitle}</h3>
                                        <p>{selectedUnit.unitDetails}</p>
                                    </div>
                                ) : (
                                    <p>Select a unit to view details.</p>
                                )}
                            </div>
                            <div className="course-topics">
                                {selectedUnit && (
                                    <div className="pages-row">
                                        {selectedUnit.topics.map((topic, index) => (
                                            <nav className="pages-col-6 db-links" onClick={() => handleTopicClick(topic)}>
                                                <ArrowOutwardIcon />
                                                <h5 key={index} >{topic}</h5>
                                            </nav>

                                        ))}
                                    </div>
                                )}
                                {!selectedUnit && <p>Select a unit to view topics.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <Modal topic={selectedTopic} onClose={closeModal} />
            )}
        </div>

    )
}

export default CourseDetails;
