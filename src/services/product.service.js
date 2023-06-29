import axios from "axios";
import {BASE_API_URL} from "../common/constants";
import {authHeader} from "./base.service";

const API_URL =  BASE_API_URL + '/api/product';

class ProductService {

    saveProduct (product) {
        return axios.post(API_URL, product, { headers: authHeader() });
    }
    getAllProduct() {
        return axios.get(API_URL, { headers: authHeader() });
    }
    deleteProduct(product) {
        return axios.delete(API_URL + '/' + product.id, { headers: authHeader() });
    }

}

export default new ProductService();