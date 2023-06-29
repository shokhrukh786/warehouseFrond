import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import "../style/Buttons.css"

function Input(props) {

    const [inputs, setInputs] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/api/input")
        setInputs(result.data.object);
    }

    const deleteUser =async (id)=> {
        await axios.delete(`http://localhost:8080/api/input/${id}`)
        loadUsers();
    }

    return (
        <div className="container">
            <div className="py-4">
                <Link to="/addinput" className="btn btn-success mb-4">Kirim qo'shish</Link>
                <table className="table border shadow">
                    <thead>
                    <tr className="borderbottom">
                        <th scope="col">#</th>
                        <th scope="col">Nomi</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(inputs)
                        .map((input, index) =>(
                            <tr key={index}>
                                <th  scope="row" key={index} >{index+1}</th>
                                <td>{input.name}</td>
                                <td className="buttons">
                                    <Link to={`/viewinput/${input.id}`} className="btn btn-primary mx-2">Batafsil</Link>
                                    <Link to={`/editinput/${input.id}`} className="btn btn-outline-primary mx-2">Tahrirlash</Link>
                                    <button onClick={()=>deleteUser(input.id)} className="btn btn-danger mx-2">O'chirish</button>
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

export default Input;