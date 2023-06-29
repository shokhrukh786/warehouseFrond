import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "../../style/Edit..css"

function EditWarehouse(props) {
    const {id} = useParams();

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
        await axios.put(`http://localhost:8080/api/warehouse/${id}`, warehouses)
        navigate("/warehouse")     /*saqlangandan keyin boshqa pagega otadi*/
    }

    useEffect(()=>{
        loadUser();
    }, [])

    const loadUser = async ()=>{
        const result = await axios.get(`http://localhost:8080/api/warehouse/${id}`)
        setWarehouse(result.data.object);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center mt-4">Edit User</h2>
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

export default EditWarehouse;