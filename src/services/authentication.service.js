import {BASE_API_URL} from "../common/constants";
import axios from "axios";

const BASE_URL = BASE_API_URL + '/api/auth';

class AuthenticationService {

    login(user){
        return axios.post(BASE_URL + '/login', user);
    }

}
export default new AuthenticationService();