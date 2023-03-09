import React, {useState} from 'react';
import "../style/Navbar.css"
import {Link} from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import {SidebarData} from "./SidebarData";

function Navbar(props) {

    const [sidebar, setSidebar] = useState(true);

    const showSidebar =()=>{
        setSidebar(!sidebar);
    }

    return (
        <>
            <div className="navbar">
                <Link to="#" className="nav-menu-icon" onClick={showSidebar}>
                    <FaIcons.FaBars/>
                </Link>
            </div>
            <div className={sidebar ? "sidebar-container active" : "sidebar-container"}>
                <ul className="sidebar-items">
                    {/*<li className="sidebar-toggle">
                        <Link to={sidebar.path} className="nav-menu-icon" onClick={showSidebar}>
                            <FaIcons.FaWindowClose/>
                        </Link>
                    </li>*/}
                    <div className="logo"><span></span></div>
                        {SidebarData.map((sidebaritem) => {
                            return(
                                <li key={sidebaritem.id}
                                    className={sidebaritem.cName}
                                >
                                    <Link to={sidebaritem.path}>
                                        {sidebaritem.icon}
                                        <span>{sidebaritem.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </>
    );
}

export default Navbar;