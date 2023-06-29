import * as FaIcons from "react-icons/fa";
import * as TbIcons from "react-icons/tb";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";

export const SidebarData =[
    {
        id:1,
        title: "Omborxona",
        cName: "sidebar-item",
        icon: <TbIcons.TbBuildingWarehouse/>,
        path: "/warehouse"
    },
    {
        id:2,
        title: "Kategoriya",
        cName: "sidebar-item",
        icon: <MdIcons.MdCategory/>,
        path: "/category"
    },
    {
        id:3,
        title: "Mahsulot",
        cName: "sidebar-item",
        icon: <FaIcons.FaProductHunt/>,
        path: "/product"
    },
    {
        id:4,
        title: "Taminotchi",
        cName: "sidebar-item",
        icon: <FaIcons.FaTruck/>,
        path: "/supplier"
    },
    {
        id:5,
        title: "Mijoz",
        cName: "sidebar-item",
        icon: <BsIcons.BsFillPersonFill/>,
        path: "/client"
    },
    {
        id:6,
        title: "Kirim",
        cName: "sidebar-item",
        icon: <RiIcons.RiLoginBoxLine/>,
        path: "/input"
    },
    {
        id:7,
        title: "Chiqim",
        cName: "sidebar-item",
        icon: <RiIcons.RiLogoutBoxRLine/>,
        path: "/product"
    },
]