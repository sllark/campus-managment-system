import React, {useState} from "react"
import {Link, useLocation} from "react-router-dom";

const SidebarItem = (props) => {

    const loc = useLocation()
    const [showOption, SetShowOption] = useState(false)


    // const shouldOpen = props.item.options.findIndex(ele => loc.pathname.includes(ele.route)) >= 0;
    return (
        <div className='sidebarItem'>
            <div className="sidebarItem__name" onClick={() => SetShowOption(!showOption)}>
                {props.item.name}
                <span className={'arrow' + (showOption ? ' rotateArrow' : '')}/>
            </div>

            <div className={"sidebarItem__options" + (showOption ? ' showOption' : '')}>
                {
                    props.item.options.map(opt => (
                        <Link key={opt.route} to={opt.route}
                              className={loc.pathname.includes(opt.route) ? 'active' : ''}>
                            {opt.name}
                        </Link>
                    ))
                }

            </div>


        </div>
    )


}


export default SidebarItem;
