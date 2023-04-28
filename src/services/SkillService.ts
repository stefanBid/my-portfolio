import axios from "axios";

const dbName = 'skills'
const dbPath = 'https://my-json-server.typicode.com/stefanBid/skillsDB'

const skillClient = axios.create({
    baseURL:dbPath,
    withCredentials:false,
    headers:{
        Accept:'application/json',
        'Content-Type': 'application-json'
    }
})

export default{
    async getAllSkills(){
        return await skillClient.get(`/${dbName}`)
    }
}