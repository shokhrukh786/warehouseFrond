import * as FaIcons from "react-icons/fa";
import * as TbIcons from "react-icons/tb";
import * as MdIcons from "react-icons/md";


export const SidebarData =[
    {
        id:1,
        title: "Omborxona",
        cName: "sidebar-item",
        icon: <TbIcons.TbBuildingWarehouse/>,
        path: "/"
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
]