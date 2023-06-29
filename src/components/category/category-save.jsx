import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {Modal} from "react-bootstrap";
import CategoryService from "../../services/category.service";
import Category from "../../model/category";

const CategorySave = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        showCategoryModal() {
            setShow(true);
        }
    }));

    const [category, setCategory] = useState(new Category('', ''))
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [show, setShow] = useState(false);

    const categoryChangeHandler = (e) => {
        const { value, name } = e.target;
        setCategory(prevState => ({
            ...category,
            [name]: value,
        }));
    };

    const categorySubmitHandler = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (!category.name) {
            return;
        }

        CategoryService.saveCategory(new Category(category.name, e.target.categoryy.value)).then((response) => {
            props.onSaved(response.data.object);
            setIsSubmitted(false);
            setShow(false);
            setCategory(new Category('',''));
        }).catch(error => {
            setErrorMessage(error.response.data.message);
        });

    }


    /**
     * select form category uchun
     */
    const [oldCategories, setOldCategory] = useState([])
    const loadCategory = async () => {
        CategoryService.getAllCategory().then((response) => {
            setOldCategory(response.data.object);
        }).catch(error => {
            setErrorMessage(error.response.data.message);
        })
    };
    useEffect(() => {
        loadCategory();
    }, []);



    return (
        <Modal show={show}>
            <form onSubmit={(e) => categorySubmitHandler(e)}>
                <div className="modal-header">
                    <h5>Kategoriya tavsilotlari</h5>
                    <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                </div>

                <div className="modal-body">

                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    <div className="form-group">
                        <label htmlFor="name">Nomi</label>
                        <input
                            type="text"
                            placeholder="kategoriya nomini keriting..."
                            className="form-control"
                            name="name"
                            onChange={(e) => categoryChangeHandler(e)}
                            value={category.name}
                            required
                        />
                        <div className="invalid-feedback">
                            Name is required
                        </div>
                    </div>

                    <label htmlFor="name" aria-label="Default select example">Ota kategoriya</label>
                    <select name="categoryy" className="form-select">
                        <option>barcha kategoriyalar...</option>
                        {oldCategories.length !== 0
                            ? oldCategories.map((category, index) => <option key={index} value={category.id}>{category.name}</option>)
                            : <option key="" value="">Mavjud emas</option>
                        }
                    </select>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Ortga</button>
                    <button type="submit" className='btn btn-primary'>Saqlash</button>
                </div>
            </form>
        </Modal>
    )
})
export {CategorySave}