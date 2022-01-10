import React from "react"

import SidebarItem from "./SidebarItem";

const Sidebar = (props) => {


    const items = [
        {
            name: 'Class',
            options: [
                {
                    name: 'Add Class',
                    route: 'addClass'
                },
                {
                    name: 'Classes',
                    route: 'classes'
                },

                {
                    name: 'Class Information',
                    route: 'classInfo'
                },

            ]
        },
        {
            name: 'Student',
            options: [
                {
                    name: 'Add Student',
                    route: 'addStudent'
                },
                {
                    name: 'Students',
                    route: 'students'
                }
            ]
        },
        {
            name: 'Teacher',
            options: [
                {
                    name: 'Add Teacher',
                    route: 'addTeacher'
                },
                {
                    name: 'Teachers',
                    route: 'teachers'
                }
            ]
        },
        {
            name: 'Attendance',
            options: [
                {
                    name: 'Mark Attendance',
                    route: 'markAttendance'
                },
                {
                    name: 'Check Attendance',
                    route: 'checkAttendance'
                }
            ]
        },

    ]


    return (
        <div className='sidebar'>
            {
                items.map((ele,index) =>
                    <SidebarItem
                        key={index}
                        item={ele}
                    />
                )
            }

        </div>
    )


}


export default Sidebar;