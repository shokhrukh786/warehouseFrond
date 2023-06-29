import {useEffect, useState} from "react";
import User from "../../model/user";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import AuthenticationService from "../../services/authentication.service";
import {setCurrentUser} from "../../store/actions/user";
import './login.page.css'
import logo from '../../assets/image/qmii.png'

const LoginPage = () =>{
    const [user, setUser] = useState(new User('', '', ''));
    const [loading, setLoading] = useState(false);    //button uchun
    const [submitted, setSubmitted] = useState(false);  //style classlari uchun
    const [errorMessage, setErrorMessage] = useState("")

    const currentUser = useSelector(state => state.user);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser?.id){
            navigate('/profile')
        }
    }, []);

    //inputdagi qiymatni saqlash(user niki)
    const handleChange = (e) => {
        const {name, value} = e.target;

        setUser((prevState => {
            return {
                ...prevState,
                [name]: value
            };
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (!user.username || !user.password){
            return;
        }
        setLoading(true);
        AuthenticationService.login(user).then(response => {
            //set user in session, surov natijasini browserni Storage ga saqlab qo'yamiz.
            dispatch(setCurrentUser(response.data));
            navigate('/admin')
        }).catch(error => {
            setErrorMessage(error.response.data.message);
            setLoading(false);
        })
    }

    return (
        <div className="login-page">
            <div className="container mt-5">
                <div className="card ms-auto me-auto p-3 shadow-lg custom-card">

                    <img src={logo} className="ms-auto me-auto mb-2 logo-icon" alt="logo" style={{width: "90px", height: "90px"}}/>
                    <h5 className="logo-text">Qarshi muhandislik - iqtisodiyot instituti</h5>
                    <h6 className="logo-text">Omborxona axborot tizimi</h6>


                    {errorMessage &&
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    }

                    <form
                        onSubmit={(e) => handleLogin(e)}
                        noValidate
                        className={submitted ? 'was-validated' : ''}
                    >
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                name="username"
                                className="form-control"
                                placeholder="Username"
                                value={user.username}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                            <div className="invalid-feedback">
                                Username is required.
                            </div>
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Parol"
                                value={user.password}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                            <div className="invalid-feedback">
                                Password is required.
                            </div>
                        </div>

                        <button
                            className="btn btn-info w-100 mt-3"
                            disabled={loading}
                            style={{color: "white"}}
                        >
                            Kirish
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}
export default LoginPage;