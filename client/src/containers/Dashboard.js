import React from "react";
import {Routes,Route} from "react-router-dom"

import Sidebar from "../components/sidebar/Sidebar";

import AddClass from "../components/dashboard/instituteClass/AddClass";
import Classes from "../components/dashboard/instituteClass/Classes";
import ClassInfo from "../components/dashboard/instituteClass/ClassInfo";

import AddStudent from "../components/dashboard/student/AddStudent";
import StudentsList from "../components/dashboard/student/StudentsList";

import AddTeacher from "../components/dashboard/teacher/AddTeacher";
import TeachersList from "../components/dashboard/teacher/TeachersList";
import AssignTeachers from "../components/dashboard/teacher/AssignTeachers";

import Attendance from "../components/dashboard/attendance/Attendance";

const Dashboard = (props) => {


    return (

        <div className='dashboard'>
            <Sidebar/>

            <div className="dashboard__container">


                <Routes>

                    <Route path='/addClass' element={<AddClass/>}/>
                    <Route path='/classes' element={<Classes/>}/>
                    <Route path='/classInfo/:id' element={<ClassInfo/>}/>
                    <Route path='/classInfo' element={<ClassInfo/>}/>
                    <Route path='/assignStudents' element={<AddTeacher/>}/>

                    <Route path='/addStudent' element={<AddStudent/>}/>
                    <Route path='/students' element={<StudentsList/>}/>

                    <Route path='/addTeacher' element={<AddTeacher/>}/>
                    <Route path='/assignTeacher' element={<AssignTeachers/>}/>
                    <Route path='/teachers' element={<TeachersList/>}/>

                    <Route path='/markAttendance' element={<Attendance/>}/>
                    <Route path='/checkAttendance' element={<Attendance isStatic={true}/>}/>


                </Routes>


            </div>

        </div>

    )


}


export default Dashboard;
