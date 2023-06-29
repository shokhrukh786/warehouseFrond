import {Link} from "react-router-dom";


const UnauthorizedPage = () =>{
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <span className="display-1">
                        401
                    </span>
                    <div className="mb-4 lead">
                        Ruxsatsiz! Ushbu resursga kirish taqiqlangan.
                    </div>
                    <Link to="/" className="btn btn-link">
                        Bosh sahifaga qaytish
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default UnauthorizedPage;