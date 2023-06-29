import {Link} from "react-router-dom";


const NotFoundPage = () =>{
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <span className="display-1">
                        404
                    </span>
                    <div className="mb-4 lead">
                        Voy! Siz qidirayotgan sahifani topa olmadik.
                    </div>
                    <Link to="/" className="btn btn-link">
                        Bosh sahifaga qaytish
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default NotFoundPage;