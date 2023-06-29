import {useEffect, useRef, useState} from "react";
import './warehouse.page.css'
import WarehouseService from "../../services/warehouse.service";
import Warehouse from "../../model/warehouse";
import {WarehouseSave} from "../../components/warehouse/warehouse-save";
import {WarehouseEdit} from "../../components/warehouse/warehouse-edit";
import {WarehouseDelete} from "../../components/warehouse/warehouse-delete";


const WarehousePage = () => {

    const [warehouseList, setWarehouseList] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState(new Warehouse(''));
    const [errorMessage, setErrorMessage] = useState('');

    const saveComponent = useRef();
    const deleteComponent = useRef();
    const editComponent = useRef();

    useEffect(() => {
        WarehouseService.getAllWarehouses().then((response) => {
            setWarehouseList(response.data.object);
        }).catch((error) => {
            setErrorMessage(error.response.data.message);
        })
    }, []);

    // modal uchun
    const createWarehouseRequest = () => {
        //edit uchun
        setSelectedWarehouse(new Warehouse(''));
        //yangi mahsulot qo'shish modal oynani chaqiradi
        saveComponent.current?.showWarehouseModal();
    }
    //yangi productni listga qo'shish
    const saveWarehouseWatcher = (warehouse) => {
        const newList = warehouseList.concat(warehouse);
        setWarehouseList(newList);
    }

    const createEditWarehouseRequest = (item) => {
        setSelectedWarehouse(Object.assign({}, item));
        editComponent.current?.showEditWarehouseModal();
    }



    const deleteWarehouse = () => {
        WarehouseService.deleteWarehouse(selectedWarehouse).then(_ => {
            setWarehouseList(warehouseList.filter(x => x.id !== selectedWarehouse.id));
        }).catch((error) => {
            setErrorMessage(error.response.data.message);
        })
    }

    const deleteWarehouseRequest = (item) => {
        setSelectedWarehouse(item);
        deleteComponent.current?.showDeleteModal();
    }

    return (
        <div className="main-article">
            <div className="container">
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <div className="card">
                        <div className="card-header">

                            <div className="row">
                                <div className="col-6">
                                    <h5>Omborxonalar</h5>
                                </div>
                                <div className="col-6 text-end">
                                    <button type="button"
                                            className="btn btn-success"
                                            onClick={() => createWarehouseRequest()}
                                    >
                                        Omborxona qo'shish
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nomi</th>
                                    <th scope="col">Holati</th>
                                </tr>
                                </thead>
                                <tbody>
                                {warehouseList.map((item, index) =>
                                    <tr key={item.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.active.toString()}</td>
                                        <td className='text-end'>
                                            <button
                                                className="btn btn-primary me-1"
                                                onClick={() => createEditWarehouseRequest(item)}
                                            >
                                                Tahrirlash
                                            </button>

                                            <button
                                                className="btn btn-danger"
                                                onClick={() => deleteWarehouseRequest(item)}
                                            >
                                                O'chirish
                                            </button>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>

            <WarehouseSave ref={saveComponent} onSaved={(e) => saveWarehouseWatcher(e)} warehouse={selectedWarehouse}/>
            <WarehouseDelete ref={deleteComponent} onConfirmed={() => deleteWarehouse()}/>
            <WarehouseEdit ref={editComponent} warehouse={selectedWarehouse}/>
        </div>
    )
}
export default WarehousePage;

//onSaved={(p) => saveProductWatcher(p)