import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function AddProduct(props) {
    let navigate = useNavigate();

    const [products, setProduct] = useState({
        name: ""
    })

    const {name} = products

    const onInputChange=(e)=>{
        setProduct({
            ...products,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit =async (e)=>{
        e.preventDefault() ;   /*urldagi malumotlarni yashiradi*/
        await axios.post("http://localhost:8080/api/product", products)
        navigate("/product")     /*saqlangandan keyin boshqa pagega otadi*/
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center mt-4">Mahsulot qo'shish</h2>
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
                                Kategoriya
                            </label>
                            <select className="form-select" aria-label="Default select example">
                                <option selected>tanlang...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <label className="form-label" htmlFor="Name">
                                O'lchov birligi
                            </label>
                            <select className="form-select" aria-label="Default select example">
                                <option selected>tanlang...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="buttons">
                            <button type="submit" className="btn btn-outline-primary">Saqlash</button>
                            <Link to="/product" className="btn btn-outline-danger mx-2">Bekor qilish</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;