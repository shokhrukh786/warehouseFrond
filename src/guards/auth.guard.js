
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

export const AuthGuard = ({ children, roles}) => {

    const currentUser = useSelector(state => state.user);

    const authorize = () => {
        //user bo'lmasa loginga otadi.
        if (!currentUser) {
            return (<Navigate to={{pathname: '/'}}/>);
        }
        /**
         * tizimga kergan userni role bilan shu page ga kerishi uchun
         * belgilangan role nomi bilan mos tushmasa not-found page otadi
         * aks holda funksiya children dagi page ni return qiladi.
         */
        if (roles?.indexOf(currentUser.role) === -1) {
            return (<Navigate to={{pathname: '/401'}}/>);
        }
        //indexOf method massiv ichida yoq element bo'lsa -1 qiymat qaytaradi.

        return (children);
    }

    return authorize();
}

