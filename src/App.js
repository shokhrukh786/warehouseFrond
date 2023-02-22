
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

function App() {
  return (
      <>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Omborxona/>} />
          <Route exact path="/addwarehouse" element={<AddWarehouse/>} />
          <Route exact path="/viewwarehouse/:id" element={<ViewWarehouse/>} />
          <Route exact path="/editwarehouse/:id" element={<EditWarehouse/>} />

            <Route exact path="/category" element={<Category/>} />
            <Route exact path="/addcategory" element={<AddCategory/>} />
            <Route exact path="/editcategory/:id" element={<EditCategory/>} />
            <Route exact path="/viewcategory/:id" element={<ViewCategory/>} />

            <Route exact path="/product" element={<Product/>} />
            <Route exact path="/addproduct" element={<AddProduct/>} />
        </Routes>
      </>
  );
}

export default App;
