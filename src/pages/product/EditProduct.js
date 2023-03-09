import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function EditProduct(props) {
    const {id} = useParams();

    let navigate = useNavigate();

    const [products, setProduct] = useState({
        name: "",
        code: ""
    })

    const {name, code} = products

    const onInputChange = (e) => {
        setProduct({
            ...products,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();   /*urldagi malumotlarni yashiradi*/
        await axios.put(`http://localhost:8080/api/product/${id}`, {
            name: name,
            code: code,
            categoryId: e.target.categoryyy.value,
            measurementId: e.target.measurementtt.value
        })
        console.log(products)
        navigate("/product")     /*saqlangandan keyin boshqa pagega otadi*/
    }


    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/api/product/${id}`)
        setProduct(result.data.object);
    }



    /**
     * select form category uchun
     */
    const [categoryes, setCategory] = useState([])

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
                    <h2 className="text-center mt-4">Mahsulotni tahrirlash</h2>
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
                                onChange={(e) => onInputChange(e)}
                            />

                            <label className="form-label" htmlFor="Code">
                                Kodi
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="shrix kodi"
                                name="code"
                                value={code}
                                onChange={(e) => onInputChange(e)}
                            />

                            <label className="form-label" htmlFor="Name">
                                Kategoriya
                            </label>
                            <select name="categoryyy" className="form-select" aria-label="Default select example">
                                <option>barcha kategoriyalar...</option>
                                {categoryes.map((category, index) => (
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
                                <option>barcha o'lchov birliklari...</option>
                                {measurements.map((measurement, index) => (
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

export default EditProduct;