import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import "../../style/View.css"

function ViewSupplierr(props) {
    const [suppliers, setSuppliers] = useState({
        name: "",
    });

    const {id} = useParams();

    useEffect(()=>{
        loadUser();
    },[])
    const loadUser =async ()=>{
        const result = await axios.get(`http://localhost:8080/api/supplier/${id}`)
        setSuppliers(result.data.object);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center mt-4">Batafsil</h2>

                    <div className="card">
                        <div className="card-header">
                            Details of user id : {suppliers.id}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Nomi: </b>
                                    {suppliers.name}
                                </li>
                                <li className="list-group-item">
                                    <b>Telefon raqami: </b>
                                    {suppliers.phoneNumber}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="btn-right">
                        <Link to={"/supplier"} className="btn btn-primary my-2 ">Ortga qaytish</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ViewSupplierr;