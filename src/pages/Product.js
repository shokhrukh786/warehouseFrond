import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function Product(props) {
    const [products, setProduct] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/api/product")
        setProduct(result.data.object);
    }

    const deleteUser =async (id)=> {
        await axios.delete(`http://localhost:8080/api/product/${id}`)
        loadUsers();
    }

    return (
        <div className="container">
            <div className="py-4">
                <Link to="/addproduct" className="btn btn-success mb-4">Mahsulot qo'shish</Link>
                <table className="table border shadow">
                    <thead>
                    <tr className="borderbottom">
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Kategoriya</th>
                        <th scope="col">O'lchov turi</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(products)
                        .map((product, index) =>(
                            <tr>
                                <th  scope="row" key={index} >{index+1}</th>
                                <td>{product.name}</td>
                                <td className="buttons">
                                    <Link to={`/viewproduct/${product.id}`} className="btn btn-primary mx-2">Batafsil</Link>
                                    <Link to={`/editproduct/${product.id}`} className="btn btn-outline-primary mx-2">Tahrirlash</Link>
                                    <button onClick={()=>deleteUser(product.id)} className="btn btn-danger mx-2">O'chirish</button>
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

export default Product;