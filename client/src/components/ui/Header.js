import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import logo from '../../assests/img/logo.svg'
import avatar from '../../assests/img/avatar1.png'

const Header = (props) => {
  const loc = useLocation()

  const [showPopup, setShowPopup] = useState(false)

  return (
        <div className='header'>

            <img src={logo} alt="cms" className='header__logo'/>

            <div className="header__nav">

                {
                    !localStorage.getItem('cmsToken') && (
                      loc.pathname.includes('signup')
                        ? <Link to='/' className="btn btn--white">
                                Login
                            </Link>
                        : <Link to='signup' className="btn btn--white">
                                Register
                            </Link>
                    )
                }

                {
                    localStorage.getItem('cmsToken') &&
                    <div className="header__nav__profile">

                        <div className="header__nav__profile__imgCont" onClick={() => setShowPopup(!showPopup)}>
                            <img src={avatar} alt="person"/>
                        </div>

                        <div className={'header__nav__profile__popup ' + (!showPopup ? 'hidePopup' : '')}>

                            <h3 className="header__nav__profile__popup__header">
                                {localStorage.getItem('cmsUserName') || 'Profile'}
                            </h3>

                            <Link to='logout' className="header__nav__profile__popup__option">
                                Logout
                            </Link>

                        </div>

                    </div>
                }

            </div>

        </div>
  )
}

export default Header
