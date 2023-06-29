import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "../../style/Edit..css"
import "../../style/Buttons.css"


function AddProduct(props) {
    let navigate = useNavigate();

    const [products, setProduct] = useState({
        name: "",
        code: "",
        categoryId: "",
        measurementId:"",
        photoId:""
    })

    const {name, code} = products

    const onInputChange=(e)=>{
        setProduct({
            ...products,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit =async (e)=>{
        e.preventDefault() ;

        await axios.post("http://localhost:8080/api/product", {
            name: name,
            code: code,
            categoryId: e.target.categoryyy.value,
            measurementId: e.target.measurementtt.value
        })
        navigate("/product")     /*saqlangandan keyin boshqa pagega otadi*/
    }

    /**
     * select form category uchun
     */
    const [categoryes, setCategory] = useState([])

    const {id} = useParams();

    useEffect( ()=> {
        loadCategory();
    }, [])

    const loadCategory = async () => {
        const result = await axios.get("http://localhost:8080/api/category");
        setCategory(result.data.object);
    }
    /**
     * tugashi
     */




    /**
     * select form meauserement uchun
     */
    const [measurements, setMeasurement] = useState([])
    // const {id} = useParams();
    useEffect( ()=> {
        loadMeasurement();
    }, [])

    const loadMeasurement = async () => {
        const result = await axios.get("http://localhost:8080/api/measurement");
        setMeasurement(result.data.object);
    }
    /**
     * tugashi
     */




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
                                placeholder="mahsulot nomi"
                                name="name"
                                value={name}
                                onChange={(e)=>onInputChange(e)}
                            />

                            <label className="form-label" htmlFor="Name">
                                Kodi
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="shrix kodi"
                                name="code"
                                value={code}
                                onChange={(e)=>onInputChange(e)}
                            />

                            <label className="form-label" htmlFor="Name">
                                Kategoriya
                            </label>
                            <select name="categoryyy" className="form-select" aria-label="Default select example">
                                <option selected>barcha kategoriyalar...</option>
                                {categoryes.map( (category, index)=>(
                                    <option
                                        key={index}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            <label className="form-label" htmlFor="Name">
                                O'chov birligi
                            </label>
                            <select name="measurementtt" className="form-select" aria-label="Default select example">
                                <option selected>barcha o'lchov birliklari...</option>
                                {measurements.map( (measurement, index)=>(
                                    <option
                                        key={index}
                                        value={measurement.id}
                                    >
                                        {measurement.name}
                                    </option>
                                ))}
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