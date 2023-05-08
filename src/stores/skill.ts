import { defineStore } from "pinia"
import { type SkillItem, RequestError } from '../types'
import SkillService from "@/services/SkillService"



export const useSkillStore = defineStore({
    id:'skillStore',
    state: ()=>({
        skills:[] as SkillItem[],
        error: '' as String | undefined

    }),
    actions:{
        getAllSkills(){
            SkillService.getAllSkills()
            .then(response => {
                this.skills = response.data
                //Change error whit status
                this.error = undefined
            })
            .catch(er => {
                this.error = er
                if(er.request.status === 0){
                    this.error = RequestError[RequestError.ERR_NETWORK]
                }else if(er.request.status === 404){
                    this.error = RequestError[RequestError.ERR_REQUEST]
                }
            })
        }
    }
})
