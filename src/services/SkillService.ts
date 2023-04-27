import axios from "axios";

const dbName = '/skills'
const skillClient = axios.create({
    baseURL:'https://my-json-server.typicode.com/stefanBid/skillsDB',
    withCredentials:false,
    headers:{
        Accept:'application/json',
        'Content-Type': 'application-json'
    }
})

export default{
    async getAllSkills(){
        return await skillClient.get(dbName)
    }
}