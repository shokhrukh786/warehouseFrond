import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function AddCategory(props) {
    let navigate = useNavigate();

    const [categoryes, setCategory] = useState({
        name: "",
        parentCategoryId: ""
    })

    const {name} = categoryes

    const onInputChange = (e) => {
        setCategory({
            ...categoryes,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();   /*urldagi malumotlarni yashiradi*/
        await axios.post("http://localhost:8080/api/category", {
            name: name,
            parentCategoryId: e.target.categoryyy.value
        })
        navigate("/category")     /*saqlangandan keyin boshqa pagega otadi*/
    }


    /**
     * select form category uchun
     */
    const [oldCategoryes, setOldCategory] = useState([])

    useEffect(() => {
        loadCategory();
    }, [])

    const loadCategory = async () => {
        const result = await axios.get("http://localhost:8080/api/category");
        setOldCategory(result.data.object);
    }
    /**
     * tugashi
     */


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

                    <h2 className="text-center mt-4">Kategoriya yaratish</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">

                            <label className="form-label" htmlFor="name">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />

                            <label className="form-label" htmlFor="Name">
                                Ota kategoriya
                            </label>
                            <select name="categoryyy" className="form-select" aria-label="Default select example">
                                <option>barcha kategoriyalar...</option>
                                {oldCategoryes.length !== 0 ? oldCategoryes.map((category, index) => (
                                    <option
                                        key={index}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                )) : <option
                                    key=""
                                    value=""
                                >
                                    mavjud emas
                                </option>}
                            </select>
                        </div>

                        <div className="buttons">
                            <button type="submit" className="btn btn-outline-primary">Saqlash</button>
                            <Link to="/" className="btn btn-outline-danger mx-2">Bekor qilish</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddCategory;