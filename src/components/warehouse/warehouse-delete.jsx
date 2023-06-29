import {forwardRef, useImperativeHandle, useState} from "react";
import {Modal} from "react-bootstrap";

const WarehouseDelete = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        showDeleteModal() {
            setShow(true);
        }
    }));

    const deleteWarehouse = () =>{
        props.onConfirmed();
        setShow(false);
    }

    const [show, setShow] = useState(false);

    return(
        <Modal show={show}>
            <form>
                <div className="modal-header">
                    <h5 className="modal-title">Tasdiqlash</h5>
                </div>
                <div className="modal-body">
                    Tanlangan mahsulotni o'chirib tashlashingizga ishonchingiz komilmi ?
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>bekor qilish</button>
                    <button type="button" className="btn btn-danger" onClick={() => deleteWarehouse()}>Ishonchim komil!</button>
                </div>
            </form>
        </Modal>
    )
})
export {WarehouseDelete}