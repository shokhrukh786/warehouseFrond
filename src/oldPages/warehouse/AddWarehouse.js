
import React from "react";
import axios from "axios";
import "../../style/Edit..css";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function AddWarehouse(props) {
    let navigate = useNavigate();

    const [warehouses, setWarehouse] = useState({
        name: ""
    })

    const {name} = warehouses

    const onInputChange=(e)=>{
        setWarehouse({
            ...warehouses,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit =async (e)=>{
        e.preventDefault() ;   /*urldagi malumotlarni yashiradi*/
        await axios.post("http://localhost:8080/api/warehouse", warehouses)
        navigate("/warehouse")     /*saqlangandan keyin boshqa pagega otadi*/
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center mt-4">Omborxona yaratish</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="Name">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your name"
                                name="name"
                                value={name}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <div className="buttons">
                            <button type="submit" className="btn btn-outline-primary">Saqlash</button>
                            <Link to="/warehouse" className="btn btn-outline-danger mx-2">Bekor qilish</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddWarehouse;