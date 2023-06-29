import store from "../store";



//ZAPROSNI HEADER QISMINI QAYTARADI
export const authHeader = () => {

    //ayni damdagi userni tokenini olish uchun
    const currentUser = store.getState().user;

    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + currentUser?.object,
    }
}