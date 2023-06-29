import React, {useState} from 'react';
import { useNavigate} from "react-router-dom";
import "../style/Login.css"
import axios from "axios";
// import {useHistory} from 'react-router-dom'

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const history = useHistory();
    let navigate = useNavigate();

    const usernameHandler =(event)=> {
        setUsername(event.target.value);
    }
    const passwordHandler =(event)=> {
        setPassword(event.target.value);
    }
    const submitHandler =(event)=>{
        event.preventDefault();
        //issue axios request to login api
        const response = axios.post(`http://localhost:8080/api/auth/login`, {
            username,
            password,
        }).then((response) => {
            console.log(response.data.object)

            //save jwt token inside local storage
            window.localStorage.setItem('bookstore-token', response.data.object)
        });

        // window.localStorage.setItem('bookstore-token', response.data.object);
    }

    const derictToHomePage =()=> {
        navigate("/")
    }

    return (
        <div id="login-none" className="container">
            <div className="row">
                <div className="forms">
                    <div className="login">
                        <form onSubmit={submitHandler}>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input onChange={usernameHandler} type="text" className="form-control" id="inputEmail3"/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input onChange={passwordHandler} type="password" className="form-control" id="inputPassword3"/>
                                </div>
                            </div>

                            <button type="submit"  className="btn btn-primary">Sign in</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default Login;