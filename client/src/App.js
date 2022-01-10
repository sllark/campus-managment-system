import React from "react"
import {Route, Routes} from "react-router-dom";


import './assests/sass/main.scss'

import Header from './components/ui/Header'

import Signup from './containers/Signup'
import Login from './containers/Login'
import Dashboard from './containers/Dashboard'


const App = (props) => {


    return (
        <>
            <Header/>
            <Routes>
                <Route path="signup" element={<Signup/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="dashboard/*" element={<Dashboard/>}/>
            </Routes>
        </>

    )


}


export default App;
