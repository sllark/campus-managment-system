import React from "react";
import {Routes,Route} from "react-router-dom"

import Sidebar from "../components/sidebar/Sidebar";

import AddClass from "../components/dashboard/instituteClass/AddClass";
import Classes from "../components/dashboard/instituteClass/Classes";
import ClassInfo from "../components/dashboard/instituteClass/ClassInfo";

import AddStudent from "../components/dashboard/student/AddStudent";

import AddTeacher from "../components/dashboard/teacher/AddTeacher";

import MarkAttendance from "../components/dashboard/attendance/MarkAttendance";
import CheckAttendance from "../components/dashboard/attendance/CheckAttendance";

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

                    <Route path='/addStudent' element={<AddStudent/>}/>

                    <Route path='/addTeacher' element={<AddTeacher/>}/>

                    <Route path='/markAttendance' element={<MarkAttendance/>}/>
                    <Route path='/checkAttendance' element={<CheckAttendance/>}/>


                </Routes>


            </div>

        </div>

    )


}


export default Dashboard;
