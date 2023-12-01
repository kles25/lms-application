import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useContext } from 'react';
import { userInputs } from './form/FormSource';
import { AuthContext } from './context/AuthContext';
import Login from './pages/login/Login';
import About from './pages/about/About';
import News from './pages/news/News';
import Contact from './pages/contact/Contact';
import Home from './pages/home/Home';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHome from './pages/admin/AdminHome';
import AdminCourses from './pages/admin/AdminCourses';
import AdminUsers from './pages/admin/AdminUsers';
import AdminBatch from './pages/admin/AdminBatch';
import AdminCalendar from './pages/admin/AdminCalendar';
import AdminProfile from './pages/admin/AdminProfile';
import AdminsData from './usersdata/AdminsData';
import TeachersData from './usersdata/TeachersData';
import StudentsData from './usersdata/StudentsData';
import AdminAddUser from './pages/admin/AdminAddUser';
import AddCourse from './components/coursecomponents/AddCourse';
import CourseDetails from './components/coursecomponents/CourseDetails';
import CreateBatch from './components/batchcomponents/CreateBatch';
import EventForm from './components/calendarcomponents/EventForm';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherHome from './pages/teacher/TeacherHome';
import TeacherClasses from './pages/teacher/TeacherClasses';
import TeacherHomework from './pages/teacher/TeacherHomework';
import TeacherQuizzes from './pages/teacher/TeacherQuizzes';
import TeacherTest from './pages/teacher/TeacherTest';
import TeacherGrades from './pages/teacher/TeacherGrades';
import TeacherCalendar from './pages/teacher/TeacherCalendar';
import TeacherProfile from './pages/teacher/TeacherProfile';
import CreateTest from './components/teachercomponents/CreateTest';
import CreateQuiz from './components/teachercomponents/CreateQuiz';
import CreateHomework from './components/teachercomponents/CreateHomework';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentHome from './pages/student/StudentHome';
import StudentClasses from './pages/student/StudentClasses';
import StudentHomework from './pages/student/StudentHomework';
import StudentQuizzes from './pages/student/StudentQuizzes';
import StudentTest from './pages/student/StudentTest';
import StudentGrades from './pages/student/StudentGrades';
import StudentCalendar from './pages/student/StudentCalendar';
import StudentProfile from './pages/student/StudentProfile';




function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/news" element={<News />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} >
        <Route path="home" element={<AdminHome />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="addcourse" element={<AddCourse />} />
        <Route path="users" element={<AdminUsers />} >
          <Route path="admins" element={<AdminsData />} />
          <Route path="teachers" element={<TeachersData />} />
          <Route path="students" element={<StudentsData />} />
        </Route>
        <Route path="adduser" element={<AdminAddUser inputs={userInputs} title="Add New User" />} />
        <Route path="batch" element={<AdminBatch />} />
        <Route path="createbatch" element={<CreateBatch />} />
        <Route path="calendar" element={<AdminCalendar />} />
        <Route path="createevent" element={<EventForm />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>
      <Route path="/course/:courseId" element={<CourseDetails />} />
      <Route path="teacher" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} >
        <Route path="home" element={<TeacherHome />} />
        <Route path="classes" element={<TeacherClasses />} />
        <Route path="homework" element={<TeacherHomework />} />
        <Route path="createhomework" element={<CreateHomework />} />
        <Route path="quiz" element={<TeacherQuizzes />} />
        <Route path="createquiz" element={<CreateQuiz />} />
        <Route path="test" element={<TeacherTest />} />
        <Route path="createtest" element={<CreateTest />} />
        <Route path="grades" element={<TeacherGrades />} />
        <Route path="calendar" element={<TeacherCalendar />} />
        <Route path="profile" element={<TeacherProfile />} />
      </Route>
      <Route path="student" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} >
        <Route path="home" element={<StudentHome />} />
        <Route path="classes" element={<StudentClasses />} />
        <Route path="homework" element={<StudentHomework />} />
        <Route path="quiz" element={<StudentQuizzes />} />
        <Route path="test" element={<StudentTest />} />
        <Route path="grades" element={<StudentGrades />} />
        <Route path="calendar" element={<StudentCalendar />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
