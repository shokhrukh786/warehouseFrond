import {forwardRef, useImperativeHandle, useState} from "react";
import {Modal} from "react-bootstrap";
import Supplier from "../../model/supplier";
import SupplierService from "../../services/supplier.service";



const SupplierSave = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        showSupplierModal(){
            setShow(true);
        }
    }));

    const [show, setShow] = useState(false);
    const [supplier, setSupplier] = useState(new Supplier('', ''));
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const supplierNameChangeHandler = (e) => {
        const { name, value } = e.target;
        setSupplier(prevState => ({
            ...supplier,
            [name] : value,
        }));
    }

    const saveSupplierHandler = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (!supplier.name || !supplier.phoneNumber){
            console.log('otadi')
            return;
        }

        SupplierService.saveSupplier(supplier).then(response => {
            props.onSaved(response.data.object);
            setIsSubmitted(false);
            setShow(false);
            setSupplier(new Supplier('', ''));
        }).catch(error => {
            setErrorMessage(error.response.data.message);
        })
    }


    return(
        <Modal show={show}>
            <form onSubmit={(e) => saveSupplierHandler(e)}>
                <div className="modal-header">
                    <h5>Taminotchi tavsilotlari</h5>
                    <button type='button' className='btn btn-close' onClick={() => setShow(false)}></button>
                </div>
                <div className="modal-body">
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <div className="form-group">
                        <label htmlFor="name">Ismi:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="taminotchi ismini keriting..."
                            name="name"
                            value={supplier.name}
                            onChange={(e) => supplierNameChangeHandler(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Name is required
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Telefon:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="telefon raqamni keriting..."
                            name="phoneNumber"
                            value={supplier.phoneNumber}
                            onChange={(e) => supplierNameChangeHandler(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Name is required
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type='button' className='btn btn-secondary' onClick={() => setShow(false)}>ortga</button>
                    <button type='submit' className='btn btn-primary'>saqlash</button>
                </div>
            </form>
        </Modal>
    );
});
export {SupplierSave}