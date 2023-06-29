import {BASE_API_URL} from "../common/constants";
import axios from "axios";
import {authHeader} from "./base.service";

const API_URL = BASE_API_URL + '/api/measurement';

class MeasurementService{
    getAllMeasurement(measurement){
        return axios.get(API_URL, { headers: authHeader() });
    }
}
export default new MeasurementService();