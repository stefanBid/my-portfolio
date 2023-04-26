import { defineStore } from "pinia"
import type { SkillItem } from '../types'

export const useSkillStore = defineStore({
    id:'skillStore',
    state: ()=>({
        skills:[] as SkillItem[],

    }),
    actions:{
        getAllSkills(){
            this.skills = [
                {icon:'bx bxl-typescript', name:'TypeScript', category:'Language', description:'I have this skill since 2022 after working daily on real projects for different clients', level:4},
                {icon:'bx bxl-javascript', name:'JavaScript', category:'Language', description:'I have this skill since 2020 after first studying it in college, and used it subsequently to carry out more than 3 personal projects', level:4},
                {icon:'bx bxl-java', name:'Java', category:'Language', description:'I have this skill since 2019 after first studying it in college. I do not yet boast any real projects with this language', level:3},
                {icon:'bx bxl-python', name:'Python', category:'Language', description:'I have this skill since 2022 after studying and using it to carry out my thesis work', level:3},
                {icon:'bx bxl-html5', name:'HTML', category:'Markup Language', description:'I have this skill since 2019 after studying it in college, I use it constantly for both personal and consulting projects', level:5},
                {icon:'bx bxl-css3', name:'CSS', category:'Formatting Language', description:'I have this skill since 2019 after studying it in college, I use it constantly for both personal and consulting projects', level:4},
                {icon:'bx bxl-vuejs', name:'Vue', category:'Framework', description:'I have this skill since 2023 after studying it in a job training course. I currently use it to implement a real project for a client. There are currently 3 projects completed and running online with this framework', level:5},
                {icon:'bx bxl-angular', name:'Angular', category:'Framework', description:'I have this skill since 2023 after studying it in a job training course. I currently use it to implement a real project for a client. There is currently 1 projects completed and running online with this framework', level:4},
                {icon:'bx bxl-tailwind-css', name:'Tailwind', category:'Framework', description:'I have this skill since 2023 after studying it in a job training course. I currently use it to implement a real project for a client. There is currently 1 projects completed and running online whit this framework', level:5},
                {icon:'bx bxl-bootstrap', name:'Bootstrap', category:'Framework', description:'I have this skill since 2019 after studying it in college. I currently use it to implement a real project for a client.', level:4},
                {icon:'bx bxl-spring-boot', name:'Spring', category:'Framework', description:'I have this skill since 2022 after studying it in a job training course', level:3},
                {icon:'bx bxl-docker', name:'Docker', category:'Software', description:'I have this skill since 2023 after studying it in a job training course. I have big plans for this', level:3},
                {icon:'bx bxl-kubernetes', name:'Kubernetes', category:'Software', description:'I have this skill since 2023 after studying it in a job training course. I have big plans for this', level:1},
                {icon:'bx bxl-git', name:'Git', category:'Software', description:"I've been using it constantly since I've been programming for the work environment", level:5},

            ]
        }
    }
})
