import { defineStore } from "pinia"
import type { ProjectItem } from '../types'

export const useProjectStore = defineStore({
    id:'projectStore',
    state: ()=>({
        projects:[] as ProjectItem[],

    }),
    actions:{
        getAllProjects(){
            this.projects = [
                {name:'Guess My Number', description:'An arcade game with levels, where at each you have to guess the number chosen by the CPU', play_path:'https://stefanbid.github.io/Guess-My-Number/', code_path:'https://github.com/stefanBid/Guess-My-Number'},
                {name:'Pig Game', description:'2vs2 arcade game. The player who first reaches 100 wins', play_path:'https://stefanbid.github.io/Pig-Game/', code_path:'https://github.com/stefanBid/Pig-Game'},
                {name:'Immage Classifier', description:'Thesis project that led to the realization of an AI image classifier', code_path:'https://github.com/stefanBid/Classificazione-Immagini'},
            ]
        }
    }
})
