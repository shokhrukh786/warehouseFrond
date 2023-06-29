import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import "../style/Buttons.css"

function Client(props) {

    const [clients, setClients] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/api/client")
        setClients(result.data.object);
    }

    const deleteUser =async (id)=> {
        await axios.delete(`http://localhost:8080/api/client/${id}`)
        loadUsers();
    }

    return (
        <div className="container">
            <div className="py-4">
                <Link to="/addclient" className="btn btn-success mb-4">Mijoz yaratish</Link>
                <table className="table border shadow">
                    <thead>
                    <tr className="borderbottom">
                        <th scope="col">#</th>
                        <th scope="col">Nomi</th>
                        <th scope="col">Telefon raqam</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(clients)
                        .map((client, index) =>(
                            <tr key={index}>
                                <th  scope="row" key={index} >{index+1}</th>
                                <td>{client.name}</td>
                                <td>{client.phoneNumber}</td>
                                <td className="buttons">
                                    <Link to={`/viewclient/${client.id}`} className="btn btn-primary mx-2">Batafsil</Link>
                                    <Link to={`/editclient/${client.id}`} className="btn btn-outline-primary mx-2">Tahrirlash</Link>
                                    <button onClick={()=>deleteUser(client.id)} className="btn btn-danger mx-2">O'chirish</button>
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

export default Client;