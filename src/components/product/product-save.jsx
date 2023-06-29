import {Modal} from "react-bootstrap";
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import CategoryService from "../../services/category.service";
import MeasurementService from "../../services/measurement.service";
import Product from "../../model/product";
import ProductService from "../../services/product.service";

const productSave = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        showProductModal() {
            setShow(true);
        }
    }))

    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [product, setProduct] = useState(new Product('', '', '', ''));
    const [submitted, setSubmitted] = useState(false);

    const productChangeHandler = (e) => {
        const {value, name} = e.target;
        setProduct(prevState => ({
            ...product,
            [name]: value,
        }));
    };

    const productSubmitHandler = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!product.name || !product.code){
            console.log('????')
            return;
        }

        ProductService.saveProduct(
            new Product(
                product.name,
                e.target.categoryy.value,
                e.target.measurementt.value,
                product.code))
            .then((response) => {
                //ProductPage ga berib yuboriladi, ui da ko'rinishi uchun.
                props.onSaved(response.data.object);

                setShow(false);
                setSubmitted(false);
                setProduct(new Product('', '', '', ''));
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            })
    };


    /**
     * select form category uchun
     */
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        CategoryService.getAllCategory().then((response) => {
            setCategoryList(response.data.object)
        }).catch((error) => {
            setErrorMessage(error.response.data.message);
        })
    }, [])

    /**
     * select form measurement uchun
     */
    const [measurementList, setMeasurementList] = useState([]);
    useEffect(() => {
        MeasurementService.getAllMeasurement().then((response) => {
            setMeasurementList(response.data.object);
        }).catch((error) => {
            setErrorMessage(error.response.data.message);
        })
    }, [])


    return (
        <Modal show={show}>
            <form onSubmit={(e) => productSubmitHandler(e)}>
                <div className="modal-header">
                    <h5>Mahsulot tavsilotlari</h5>
                    <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                </div>

                <div className="modal-body">
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <div className="form-group">
                        <label htmlFor="name">Nomi:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="mahsulot nomini keriting..."
                            name="name"
                            value={product.name}
                            onChange={(e) => productChangeHandler(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Ism talab qilinadi
                        </div>
                    </div>

                    <label htmlFor="name" aria-label="Default select example">Kategoriya:</label>
                    <select name="categoryy" className="form-select">
                        <option>barcha kategoriyalar...</option>
                        {categoryList.length !== 0
                            ? categoryList.map((category, index) => <option key={index}
                                                                            value={category.id}>{category.name}</option>)
                            : <option key="" value="">Mavjud emas</option>
                        }
                    </select>

                    <label htmlFor="name" aria-label="Default select example">O'lchov turi:</label>
                    <select name="measurementt" className="form-select">
                        <option>barcha o'lchovlar...</option>
                        {measurementList.length !== 0
                            ? measurementList.map((measurement, index) => <option key={index}
                                                                                  value={measurement.id}>{measurement.name}</option>)
                            : <option key="" value="">Mavjud emas</option>
                        }
                    </select>

                    <div className="form-group">
                        <label htmlFor="code">Code:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="code keriting..."
                            name="code"
                            value={product.code}
                            max='50'
                            onChange={(e) => productChangeHandler(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Code talab qilinadi
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button type='button' className='btn btn-secondary' onClick={() => setShow(false)}>Ortga</button>
                    <button type='submit' className='btn btn-primary'>Saqlash</button>
                </div>
            </form>
        </Modal>
    )
})
export default productSave;