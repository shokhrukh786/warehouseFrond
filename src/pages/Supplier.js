import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import "../style/Buttons.css"

function Supplier(props) {

    const [supplieres, setSupplieres] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/api/supplier")
        setSupplieres(result.data.object);
    }

    const deleteUser =async (id)=> {
        await axios.delete(`http://localhost:8080/api/supplier/${id}`)
        loadUsers();
    }

    return (
        <div className="container">
            <div className="py-4">
                <Link to="/addsupplier" className="btn btn-success mb-4">Taminotchi yaratish</Link>
                <table className="table border shadow">
                    <thead>
                    <tr className="borderbottom">
                        <th scope="col">#</th>
                        <th scope="col">Nomi</th>
                        <th scope="col">Telefon raqam</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(supplieres)
                        .map((supplier, index) =>(
                            <tr key={index}>
                                <th  scope="row" key={index} >{index+1}</th>
                                <td>{supplier.name}</td>
                                <td>{supplier.phoneNumber}</td>
                                <td className="buttons">
                                    <Link to={`/viewsupplier/${supplier.id}`} className="btn btn-primary mx-2">Batafsil</Link>
                                    <Link to={`/editsupplier/${supplier.id}`} className="btn btn-outline-primary mx-2">Tahrirlash</Link>
                                    <button onClick={()=>deleteUser(supplier.id)} className="btn btn-danger mx-2">O'chirish</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Supplier;