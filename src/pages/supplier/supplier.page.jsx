import './suplier.page.css'
import {useEffect, useRef, useState} from "react";
import SupplierService from "../../services/supplier.service";
import {SupplierSave} from "../../components/supplier/supplier-save";
import {SupplierDelete} from "../../components/supplier/supplier-delete";
import Supplier from "../../model/supplier";

const SupplierPage = () => {

    const [supplierList, setSupplierList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState(new Supplier('', ''));

    const saveComponent = useRef();
    const deleteComponent = useRef();

    useEffect(() => {
        SupplierService.getAllSupplier().then(response => {
            setSupplierList(response.data.object);
        }).catch(error => {
            setErrorMessage(error.response.data.message);
        })
    }, [])

    const createSupplierRequest =(e)=>{
        saveComponent.current?.showSupplierModal();
    }
    const saveSupplierWatcher = (supplier) => {
        const newList = supplierList.concat(supplier);
        setSupplierList(newList);
    }

    const deleteSupplier = () => {
        SupplierService.deleteSupplier(selectedSupplier).then(_ => {
            setSupplierList(supplierList.filter(x => x.id !== selectedSupplier.id))
        }).catch(error => {
            setErrorMessage(error.response.data.message);
        })
    }
    const deleteSupplierRequest = (item) => {
        setSelectedSupplier(item);
        deleteComponent.current?.showDeleteModal();
    }

    return (
        <div className='main-article'>
            <div className="container">
                {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6">
                                <h5>Taminotchilar</h5>
                            </div>
                            <div className="col-6 text-end">
                                <button
                                    type='button'
                                    className='btn btn-success'
                                    onClick={() => createSupplierRequest()}
                                >
                                    Taminotchi qo'shish
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Ismi</th>
                                <th scope="col">Telefon raqami</th>
                            </tr>
                            </thead>
                            <tbody>
                            {supplierList.map((item, index) =>
                                <tr key={item.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td className='text-end'>
                                        <button
                                            type='button'
                                            className='btn btn-primary me-1'
                                        >
                                            Tahrirlash
                                        </button>
                                        <button
                                            type='button'
                                            className='btn btn-danger'
                                            onClick={() => deleteSupplierRequest(item)}
                                        >
                                            O'chirish
                                        </button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer">

                    </div>
                </div>
            </div>

            <SupplierSave ref={saveComponent} onSaved={(e) => saveSupplierWatcher(e)}/>
            <SupplierDelete ref={deleteComponent} onConfirmed={() => deleteSupplier()}/>
        </div>
    );
}
export default SupplierPage;