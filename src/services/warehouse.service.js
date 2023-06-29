import axios from "axios";
import {BASE_API_URL} from "../common/constants";
import {authHeader} from "./base.service";

const API_URL =  BASE_API_URL + '/api/warehouse';

class WarehouseService {

    saveWarehouse(warehouse) {
        return axios.post(API_URL, warehouse, {headers: authHeader() });
    }
    getAllWarehouses(warehouse) {
        return axios.get(API_URL, { headers: authHeader() });
    }
    deleteWarehouse(warehouse) {
        return axios.delete(API_URL + '/' + warehouse.id, { headers: authHeader() });
    }
    editWarehouse(warehouse){
        console.log('warehouse service keldi')
        console.log(warehouse);
        return axios.put(API_URL + '/' + warehouse.id, warehouse, { headers: authHeader() });
    }
}
export default new WarehouseService();