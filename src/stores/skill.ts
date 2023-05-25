import { defineStore } from "pinia"
import { type SkillItem, HandlingError } from '../types'
import SkillService from "@/services/SkillService"

/**
 * # Skill Store 🥭
 * @author stefanBid
 * @description Store for Skill items
 * @template state
 * @param {SkillItem[]} state.skills - Array of Skill items
 * @param {string | undefined} state.error - Error message from request when error  occurs
 * 
 * @template actions
 * @param {function} actions.getAllSkills - Get all skills from server
 */ 
export const useSkillStore = defineStore({
    id:'skillStore',
    state: ()=>({

        skills:[] as SkillItem[],
        error: undefined as string | undefined

    }),
    actions:{
        getAllSkills(){
            SkillService.getAllSkills()
            .then(response => {
                this.skills = response.data;
                this.error = undefined;
            })
            .catch(er => {
                switch(er.code){
                    case HandlingError.ERR_BAD_REQUEST:
                        this.error = HandlingError.ERR_BAD_REQUEST
                        break;
                    case HandlingError.ERR_NETWORK:
                        this.error = HandlingError.ERR_NETWORK
                        break;
                    default:
                        break;
                }
            })
        }
    }
})
