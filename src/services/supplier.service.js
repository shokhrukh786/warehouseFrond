import {BASE_API_URL} from "../common/constants";
import axios from "axios";
import {authHeader} from "./base.service";

const API_URL = BASE_API_URL + '/api/supplier';

class SupplierService {
    saveSupplier(supplier){
        return axios.post(API_URL, supplier, { headers: authHeader() });
    }
    getAllSupplier(){
        return axios.get(API_URL, { headers: authHeader() });
    }
    deleteSupplier(supplier){
        return axios.delete(API_URL + '/' + supplier.id, { headers: authHeader() } )
    }
}
export default new SupplierService();