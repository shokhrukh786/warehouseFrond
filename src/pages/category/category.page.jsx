import './category.page.css'
import {useEffect, useRef, useState} from "react";
import CategoryService from "../../services/category.service";
import {CategorySave} from "../../components/category/category-save";
import Category from "../../model/category";
import {CategoryDelete} from "../../components/category/category-delete";


const CategoryPage = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(new Category('', ''));
    const [errorMessage, setErrorMessage] = useState('');

    const saveComponent = useRef();
    const deleteComponent = useRef();

    useEffect(() => {
        CategoryService.getAllCategory().then((response) => {
            setCategoryList(response.data.object)
        }).catch((error) => {
            setErrorMessage(error.response.data.message);
        })
    }, []);

    // modal uchun
    const createCategoryRequest = () => {
        // yangi mahsulot qo'shish modal oynani chaqiradi
        saveComponent.current?.showCategoryModal();
    }
    //yangi productni listga qo'shish
    const saveCategoryWatcher = (category) => {
        const newList = categoryList.concat(category);
        setCategoryList(newList);
    }


    const deleteCategory = () => {
        CategoryService.deleteCategory(selectedCategory).then(_ => {
            setCategoryList(categoryList.filter(x => x.id !== selectedCategory.id));
        }).catch((error) => {
            setErrorMessage(error.response.data.message);
        })
    }
    const deleteCategoryRequest = (item) => {
        setSelectedCategory(item);
        deleteComponent.current?.showDeleteModal();
    }


    // const editProductRequest = (item) => {
    //     setSelectedProduct(Object.assign({}, item));
    //     saveComponent.current?.showProductModal();
    // }


    return (
        <div className="main-article">
            <div className="container">
                {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6">
                                <h5>Kategoriyalar</h5>
                            </div>
                            <div className="col-6 text-end">
                                <button type="button"
                                        className="btn btn-success"
                                        onClick={() => createCategoryRequest()}
                                >
                                    Kategoriya qo'shish
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
                                <th scope="col">Ota Kategoriya</th>
                                <th scope="col">Holati</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categoryList.map((category, index) =>
                                <tr key={category?.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{category?.name}</td>
                                    <td>{category?.parentCategory?.name}</td>
                                    <td>{category?.active.toString()}</td>
                                    <td className='text-end'>
                                        <button
                                            className="btn btn-primary me-1"
                                        >
                                            Tahrirlash
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deleteCategoryRequest(category)}
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

            <CategorySave ref={saveComponent} onSaved={(e) => saveCategoryWatcher(e)}/>
            <CategoryDelete ref={deleteComponent} onConfirmed={() => deleteCategory()}/>
        </div>
    )
}
export default CategoryPage;