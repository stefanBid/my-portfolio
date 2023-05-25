import { defineStore } from "pinia"
import type { ProjectItem } from '../types'

//TODO: put data into JSON File and fetch it

export const useProjectStore = defineStore({
    id:'projectStore',
    state: ()=>({
        projects:[] as ProjectItem[],

    }),
    actions:{
        getAllProjects(){
            this.projects = [
                {
                    name:'Guess My Number',
                    description:'An arcade game with levels, where at each you have to guess the number chosen by the CPU',
                    playLinkLabel:'guess-my-number-play',
                    repoLinkLabel:'guess-my-number-repo'
                },
                {
                    name:'Pig Game',
                    description:'2vs2 arcade game. The player who first reaches 100 wins',
                    playLinkLabel:'pig-game-play',
                    repoLinkLabel:'pig-game-repo'
                },
                {
                    name:'Immage Classifier',
                    description:'Thesis project that led to the realization of an AI image classifier',
                    repoLinkLabel:'image-classification-repo'
                },
            ]
        }
    }
})
