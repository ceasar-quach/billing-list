import axios from "axios"
import * as Urlconst from './const';


export default class Api {

    static async Login (username, password) {
        const data = {
            'email': username,
            'password': password,
        }
        return axios.post(Urlconst.API + 'login', data)
    }

    static async GetAdminInfo (token) {
        return axios.get(Urlconst.API + 'getAdminInfo', {
            'headers': {
                'Authorization': 'Bearer '+token
            }
        })
    }

    static async GetClientList (token) {
        const data ={
            'headers': {'Authorization': 'Bearer '+token}
        }
        return axios.get(Urlconst.API + 'clients', data)
    }
}