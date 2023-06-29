import Navbar from "./navbar";


const Layout =({ children })=> {
    return(
        <Navbar>
            {children}
        </Navbar>

    );
}
export default Layout;