import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "../../style/Edit..css"

function AddSupplier(props) {
    let navigate = useNavigate();

    const [suppliers, setSuppliers] = useState([])

    const {name, phoneNumber} = suppliers

    const onInputChange=(e)=>{
        setSuppliers({
            ...suppliers,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit =async (e)=>{
        e.preventDefault() ;   /*urldagi malumotlarni yashiradi*/
        await axios.post("http://localhost:8080/api/supplier", suppliers)
        navigate("/supplier")     /*saqlangandan keyin boshqa pagega otadi*/
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center mt-4">Taminotchi yaratish</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="Name">
                                Nomi
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Ism va Familiyani keriting"
                                name="name"
                                value={name}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="Name">
                                Telefon raqam
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Telefon raqam keriting"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <div className="buttons">
                            <button type="submit" className="btn btn-outline-primary">Saqlash</button>
                            <Link to="/supplier" className="btn btn-outline-danger mx-2">Bekor qilish</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddSupplier;