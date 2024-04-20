import axios from "axios"
import * as Urlconst from './const';


export default class Api {

    static async GetClientList () {
        return axios.get(Urlconst.API + 'clients')
    }
}