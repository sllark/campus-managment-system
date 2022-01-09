import React from "react"
import {Route, Routes} from "react-router-dom";


import './assests/sass/main.scss'

import Signup from './containers/Signup'
import Login from './containers/Login'
import Dashboard from './containers/Dashboard'


const App = (props) => {


    return (
        <Routes>

            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>

        </Routes>
    )


}


export default App;
