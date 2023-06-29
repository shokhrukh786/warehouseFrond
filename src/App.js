import './App.css';
import Navbar from "./components/navbar";
import {Route, Routes} from "react-router-dom";
import {Fragment} from "react";

import LoginPage from "./pages/login/login.page";
import WarehousePage from "./pages/warehouse/warehouse.page";
import {AuthGuard} from "./guards/auth.guard";
import UnauthorizedPage from "./pages/unauthorized/unauthorized.page";
import NotFound from "./pages/not-found/not-found";
import {Role} from "./model/role";
import ProductPage from "./pages/product/product.page";
import CategoryPage from "./pages/category/category.page";
import SupplierPage from "./pages/supplier/supplier.page";


function App() {
    return (
        <Fragment>
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<LoginPage/>}/>

                <Route exact path="/admin" element={
                    <AuthGuard roles={[Role.ADMIN, Role.USER]}>
                        <Navbar/>
                    </AuthGuard>}
                />

                <Route path="/warehouse" element={
                    <AuthGuard roles={[Role.ADMIN, Role.USER]}>
                        <WarehousePage/>
                    </AuthGuard>}
                />

                <Route path="/category" element={
                    <AuthGuard roles={[Role.ADMIN, Role.USER]}>
                        <CategoryPage/>
                    </AuthGuard>}
                />

                <Route path="/product" element={
                    <AuthGuard roles={[Role.ADMIN, Role.USER]}>
                        <ProductPage/>
                    </AuthGuard>}
                />

                <Route path='/supplier' element={<SupplierPage/>}/>


                <Route path="/401" element={<UnauthorizedPage/>}/>
                <Route path="/404" element={<NotFound/>}/>
            </Routes>
        </Fragment>
    );
}

export default App;
