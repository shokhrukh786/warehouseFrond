import {forwardRef, useImperativeHandle, useState} from "react";
import {Modal} from "react-bootstrap";

const ProductDelete = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        showDeleteModal(){
            setShow(true);
        }
    }));

    const [show, setShow] = useState(false);

    const deleteProduct = () => {
        props.onConfirmed();
        setShow(false);
    }

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
                    <button type="button" className="btn btn-danger" onClick={() => deleteProduct()}>Ishonchim komil!</button>
                </div>
            </form>
        </Modal>
    )
})
export {ProductDelete}