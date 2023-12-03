import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";

const EnrollmentForm = ({ inputs }) => {
    const [err, setErr] = useState(false);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "courses"));
                const fetchedCourses = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCourses(fetchedCourses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({ ...data, [id]: value });
    };

    const handleEnrollment = async () => {
        try {
            // Save input data to the 'enrollees' collection in Firestore
            await addDoc(collection(db, "enrollees"), {
                ...data,
                timestamp: serverTimestamp(),
            });


        } catch (err) {
            setErr(true);
            setLoading(false);
            console.log(err)
            // Handle error or show an error message
        }
    };


    return (
        <form onSubmit={handleEnrollment}>
            {inputs.map((input) => (
                <div className="form-input" key={input.id}>
                    <label>{input.label}</label>
                    {input.id === 'gender' ? (
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
                <label>Select Course</label>
                <select id="course" onChange={handleInput} required>
                    <option value="" disabled hidden selected>
                        Select a course
                    </option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.courseName}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-input">
                <button className="form-button" type="submit">Enroll</button>
            </div>
            {loading && "Processing..."}
            {err && <span>Something went wrong</span>}
        </form>
    );
};

export default EnrollmentForm;
