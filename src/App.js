import './App.css';
import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router-dom";
import Omborxona from "./pages/Home";
import AddWarehouse from "./pages/warehouse/AddWarehouse";
import ViewWarehouse from "./pages/warehouse/ViewWarehouse";
import EditWarehouse from "./pages/warehouse/EditWarehouse";
import Category from "./pages/Category";
import AddCategory from "./pages/category/AddCategory";
import EditCategory from "./pages/category/EditCategory";
import ViewCategory from "./pages/category/ViewCategory";
import Product from "./pages/Product";
import AddProduct from "./pages/product/AddProduct";
import EditProduct from "./pages/product/EditProduct";
import ViewProduct from "./pages/product/ViewProduct";
import Supplier from "./pages/Supplier";
import AddSupplier from "./pages/supplier/AddSupplier";
import ViewSupplierr from "./pages/supplier/ViewSupplierr";
import EditSupplier from "./pages/supplier/EditSupplier";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<Omborxona/>}/>
                <Route exact path="/addwarehouse" element={<AddWarehouse/>}/>
                <Route exact path="/viewwarehouse/:id" element={<ViewWarehouse/>}/>
                <Route exact path="/editwarehouse/:id" element={<EditWarehouse/>}/>

                <Route exact path="/category" element={<Category/>}/>
                <Route exact path="/addcategory" element={<AddCategory/>}/>
                <Route exact path="/editcategory/:id" element={<EditCategory/>}/>
                <Route exact path="/viewcategory/:id" element={<ViewCategory/>}/>

                <Route exact path="/product" element={<Product/>}/>
                <Route exact path="/addproduct" element={<AddProduct/>}/>
                <Route exact path="/editproduct/:id" element={<EditProduct/>}/>
                <Route exact path="/viewproduct/:id" element={<ViewProduct/>}/>

                <Route exact path="/supplier" element={<Supplier/>}/>
                <Route exact path="/addsupplier" element={<AddSupplier/>}/>
                <Route exact path="/editsupplier/:id" element={<EditSupplier/>}/>
                <Route exact path="/viewsupplier/:id" element={<ViewSupplierr/>}/>
            </Routes>
        </>
    );
}

export default App;
