import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "../../style/Edit..css"

function AddInput(props) {
    let navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const {date, factureNumber} = inputs

    const onInputChange=(e)=>{
        setInputs({
            ...inputs,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit =async (e)=>{
        console.log(inputs)
        e.preventDefault() ;   /*urldagi malumotlarni yashiradi*/
        await axios.post("http://localhost:8080/api/input", {
            date: date,
            warehouseId: e.target.warehousesss,
            supplierId: e.target.supplierrr,
            factureNumber: factureNumber
        })
        console.log(inputs)
        navigate("/input")     /*saqlangandan keyin boshqa pagega otadi*/
    }






    /**
     * select form warehouse uchun
     */
    const [warehouses, setWarehouses] = useState([])

    useEffect( ()=> {
        loadWarehouse();
    }, [])

    const loadWarehouse = async () => {
        const result = await axios.get("http://localhost:8080/api/warehouse");
        setWarehouses(result.data.object);
    }
    /**
     * tugashi
     */


    /**
     * select form supplier uchun
     */
    const [suppliers, setSuppliers] = useState([])

    useEffect( ()=> {
        loadSupplier();
    }, [])

    const loadSupplier = async () => {
        const result = await axios.get("http://localhost:8080/api/supplier");
        setSuppliers(result.data.object);
    }
    /**
     * tugashi
     */



    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center mt-4">Kirim qo'shish</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">

                            <label className="form-label" htmlFor="Name">
                                Kirim vaqti
                            </label><br/>
                            <input name={date} type="date" placeholder="kerim vaqtini keriting"/>
                            <br/>

                            <label className="form-label" htmlFor="Name">
                                Omborxona
                            </label>
                            <select name="warehousesss" className="form-select" aria-label="Default select example">
                                <option>barcha omborxonalar...</option>
                                {warehouses.map( (warehouse, index)=>(
                                    <option
                                        key={index}
                                        value={warehouse.id}
                                    >
                                        {warehouse.name}
                                    </option>
                                ))}
                            </select>


                            <label className="form-label" htmlFor="Name">
                                Taminotchi
                            </label>
                            <select name="supplierrr" className="form-select" aria-label="Default select example">
                                <option>barcha taminotchilar...</option>
                                {suppliers.map( (supplier, index)=>(
                                    <option
                                        key={index}
                                        value={supplier.id}
                                    >
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>

                            <label className="form-label" htmlFor="Name">
                                Faktura nomeri
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your name"
                                name="factureNumber"
                                value={factureNumber}
                                onChange={(e)=>onInputChange(e)}
                            />

                            <div className="buttons">
                                <button type="submit" className="btn btn-outline-primary">Saqlash</button>
                                <Link to="/input" className="btn btn-outline-danger mx-2">Bekor qilish</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddInput;