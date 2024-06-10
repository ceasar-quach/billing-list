import axios from "axios"

export default class API {
    // sample Clients API GET req
    static async clientsIndex () {
        return axios.get('sampleAPI/clientsAPI.json')
    }


    // sample Invoices API GET req
    static async invoicesIndex () {
        return axios.get('sampleAPI/invoiceAPI.json')
    }

    // sample static API GET req
    static async getTableHeader () {
        return axios.get('sampleAPI/tableHeaderAPI.json')
    }
}