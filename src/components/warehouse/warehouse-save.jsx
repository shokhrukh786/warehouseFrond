import {forwardRef, useImperativeHandle, useState} from "react";
import {Modal} from "react-bootstrap";
import Warehouse from "../../model/warehouse";
import WarehouseService from "../../services/warehouse.service";


const WarehouseSave  = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        showWarehouseModal() {
            setShow(true);
        }
    }));

    const [warehouse, setWarehouse] = useState(new Warehouse(''));
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [show, setShow] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setWarehouse(prevState => {
            return {
                ...warehouse,
                [name]: value,
            }
        })
    }

    const saveWarehouse = (e) => {
        e.preventDefault();

        setSubmitted(true);

        if (!warehouse.name){
            return;
        }

        WarehouseService.saveWarehouse(warehouse).then(response => {
            //WarehousePage ga props orqali beriladi saqlanayotgan yangi warehouse.
            props.onSaved(response.data.object);

            setSubmitted(false);
            setShow(false);
            setWarehouse(new Warehouse(""));
        }).catch(error => {
            setErrorMessage(error.response.data.message);
        })
    }



    return (
        <Modal show={show}>
            <form onSubmit={(e) => saveWarehouse(e)}>

                <div className="modal-header">
                    <h5>Mahsulot tafsilotlari</h5>
                    <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                </div>

                <div className="modal-body">

                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    <div className="form-group">
                        <label htmlFor="name">Nomi:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="omborxona nomini keriting..."
                            name="name"
                            value={warehouse.name}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Name is required
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Ortga</button>
                    <button type="submit" className="btn btn-primary">Saqlash</button>
                </div>
            </form>
        </Modal>
    )
})
export {WarehouseSave}