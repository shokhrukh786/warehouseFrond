import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function Category(props) {
    const [categoryes, setCategory] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/api/category")
        setCategory(result.data.object);
    }

    const deleteUser =async (id)=> {
        await axios.delete(`http://localhost:8080/api/category/${id}`)
        loadUsers();
    }

    return (
        <div className="container">
            <div className="py-4">
                <Link to="/addcategory" className="btn btn-success mb-4">Kategoriya yaratish</Link>
                <table className="table border shadow">
                    <thead>
                    <tr className="borderbottom">
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(categoryes)
                        .map((category, index) =>(
                            <tr>
                                <th  scope="row" key={index} >{index+1}</th>
                                <td>{category.name}</td>
                                <td className="buttons">
                                    <Link to={`/viewcategory/${category.id}`} className="btn btn-primary mx-2">Batafsil</Link>
                                    <Link to={`/editcategory/${category.id}`} className="btn btn-outline-primary mx-2">Tahrirlash</Link>
                                    <button onClick={()=>deleteUser(category.id)} className="btn btn-danger mx-2">O'chirish</button>
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

export default Category;