import './product.page.css'
import {useEffect, useRef, useState} from "react";
import ProductService from "../../services/product.service";
import ProductSave from "../../components/product/product-save";
import Product from "../../model/product";
import {ProductDelete} from "../../components/product/product-delete";

const ProductPage = () => {

    const [productList, setProductList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(new Product('', '', '', ''));

    useEffect(() => {
        ProductService.getAllProduct().then((response) => {
            setProductList(response.data.object);
        }).catch(error => {
            setErrorMessage(error.response.data.message);
        })
    }, []);

    const saveComponent = useRef();
    const deleteComponent = useRef();

    const createProductRequest = () => {
        saveComponent.current?.showProductModal();
    }

    /**
     * bu funksiya ProductSave componentdan kelayotgan yangi productni listga qo'shish uchun,
     * onSaved props hosil qilib berib yuboramiz funksiyani.
     * @param product
     */
    const showProductWatcher = (product) => {
        const newProductList = productList.concat(product);
        setProductList(newProductList);
    }


    const deleteProductRequest = (item) => {
        setSelectedProduct(item);
        deleteComponent.current?.showDeleteModal();
    }

    const deleteProduct = () => {
        ProductService.deleteProduct(selectedProduct).then(_ => {
            setProductList(productList.filter(x => x.id !== selectedProduct.id));
        }).catch((error) => {
            setErrorMessage(error.response.data.message);
        })
    }

    return (
        <div className='main-article'>
            <div className="container">
                <div className="card">
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6">
                                <h5>Maxsulotlar</h5>
                            </div>
                            <div className="col-6 text-end">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => createProductRequest()}
                                >Maxsulot qo'shish
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
                                <th scope="col">Kategoriya</th>
                                <th scope="col">O'lchov</th>
                                <th scope="col">Code</th>
                            </tr>
                            </thead>
                            <tbody>
                            {productList.map((product, index) =>
                                <tr key={product?.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{product.name}</td>
                                    <td>{product.category.name}</td>
                                    <td>{product.measurement?.name}</td>
                                    <td>{product.code}</td>
                                    <td className='text-end'>
                                        <button className='btn btn-primary me-1'>
                                            Tahrirlash
                                        </button>
                                        <button
                                            className='btn btn-danger'
                                            onClick={() => deleteProductRequest(product)}
                                        >
                                            O'chirish
                                        </button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer">

                    </div>
                </div>
            </div>

            <ProductSave ref={saveComponent} onSaved={(e) => showProductWatcher(e)}/>
            <ProductDelete ref={deleteComponent} onConfirmed={() => deleteProduct()}/>
        </div>
    );
}
export default ProductPage;