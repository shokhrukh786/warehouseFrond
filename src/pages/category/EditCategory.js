import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function EditCategory(props) {
    const {id} = useParams();

    let navigate = useNavigate();

    const [categoryes, setCategory] = useState({
        name: ""
    })

    const {name} = categoryes

    const onInputChange=(e)=>{
        setCategory({
            ...categoryes,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit =async (e)=>{
        e.preventDefault() ;   /*urldagi malumotlarni yashiradi*/
        await axios.put(`http://localhost:8080/api/category/${id}`, categoryes)
        navigate("/category")     /*saqlangandan keyin boshqa pagega otadi*/
    }

    useEffect(()=>{
        loadUser();
    }, [])

    const loadUser = async ()=>{
        const result = await axios.get(`http://localhost:8080/api/category/${id}`)
        setCategory(result.data.object);
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
                            <label className="form-label" htmlFor="Name">
                                Ota kategoriya
                            </label>
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="buttons">
                            <button type="submit" className="btn btn-outline-primary">Saqlash</button>
                            <Link to="/category" className="btn btn-outline-danger mx-2">Bekor qilish</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditCategory;