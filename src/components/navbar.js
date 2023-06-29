import React, {Fragment, useState} from 'react';
import "../style/Navbar.css"
import {Link, useNavigate} from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import {SidebarData} from "./sidebarData";
import {useDispatch, useSelector} from "react-redux";

import {clearCurrentUser} from "../store/actions/user";


function Navbar(props) {

    const [sidebar, setSidebar] = useState(true);

    const currentUser = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const showSidebar = () => {
        setSidebar(!sidebar);
    }
    const logout = ()=> {
        dispatch(clearCurrentUser());
        navigate('/')
    }

    return (
        <Fragment>
            {currentUser &&
                <div className="navbar">
                    <Link to="#" className="nav-menu-icon" onClick={showSidebar}>
                        {/*<FaIcons.FaBars/>*/}
                    </Link>
                    <div className="nav-menu-user-icon" style={{display: "flex"}}>
                        <FaIcons.FaUserCircle className="user-icon me-4"/>
                        <h6 className="nav-role-name me-4">{currentUser.role}</h6>
                        <button onClick={logout} className="btn btn-primary">Chiqish</button>
                    </div>
                </div>
            }

            {currentUser &&
                <div className={sidebar ? "sidebar-container active" : "sidebar-container"}>
                    <ul className="sidebar-items">
                        {/*<li className="sidebar-toggle">
                        <Link to={sidebar.path} className="nav-menu-icon" onClick={showSidebar}>
                            <FaIcons.FaWindowClose/>
                        </Link>
                    </li>*/}
                        <div className="logo"><span>Omborxona axborot tizimi</span></div>

                        {SidebarData.map((sidebaritem) => {
                            return (
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
            }

            {/*<h1>wdfwfffffffffffffffffffffffffffffffffffffffffff</h1>*/}
        </Fragment>
    );
}

export default Navbar;