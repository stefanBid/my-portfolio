<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import type {HeaderType} from '../types'
export default defineComponent({
    name:"MyHeader",
    data(){
        return{
            headerLogo:{} as HeaderType,
            headerItems: [] as HeaderType[],
            changeHamburgerIcon:false,
            changeNavbar:false,
            windowWidth:0
        }
    },
    computed:{
        hamburgerIcon(){
            if(!this.changeHamburgerIcon){
                return 'bx bx-menu-alt-right'
            }else{
                return 'bx bx-x'
            }
        },
        openCloseNavbar(){
            if(!this.changeNavbar){
                return 'close'
            }else{
                return 'open'
            }
        }
    },
    mounted(){
        this.headerLogo = {name:'home', label:'My Portfolio.'},
        this.headerItems = [
            {name:'home', label:'Home'},
            {name:'about', label:'About'},
            {name:'skils', label:'Skils'},
            {name:'portfolio', label:'Portfolio'},
            {name:'contact', label:'Contact'},
        ]
        window.addEventListener('resize',()  =>{
            this.windowWidth = window.innerWidth
            if(this.windowWidth >768){
                this.changeHamburgerIcon=false
                this.changeNavbar=false
            }
        })
    },
    created() {
        this.windowWidth = window.innerWidth
    },
    methods:{
        change(isLogo?:any){
            if(isLogo){
                this.changeHamburgerIcon = false
                this.changeNavbar = false
            }else{
                this.changeHamburgerIcon = !this.changeHamburgerIcon
                this.changeNavbar = !this.changeNavbar
            }
        }
    }
})
</script>
<template>
    <header class="header">
        <RouterLink :to="{name:headerLogo.name}" class="logo" @click="change('logo')" ><i class="bx bxs-terminal"></i> {{ headerLogo.label }}</RouterLink>
        <i :class="hamburgerIcon" id="menu-icon" @click="change()"></i>
        <nav :class="[openCloseNavbar, 'navbar']">
           <RouterLink v-for="item of headerItems" :to="{name:item.name}" @click="change()">{{ item.label }}</RouterLink>
        </nav>
    </header>
</template>

<style scoped>
.header{
    /*border: 1px solid red;*/
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    padding: 2rem 9%;
    background: var(--bg-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index:100;
}

.navbar{
    transition: .3s ease-in-out;
}

.logo{
    font-size: 25px;
    color: var(--text-color);
    text-decoration: none;
    font-weight: 600;
    line-height: 1.1em;
    cursor: default;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.logo i{
    font-size: 3.6rem;
    padding-right: 10px;
}

#menu-icon{
    font-size: 3.6rem;
    transition: .3s;
    display: none;
}
#menu-icon:hover{
    color: var(--main-color);
}

/* Router Link style is tag <a> */
.navbar a{
    font-size: 1.7rem;
    color: var(--text-color);
    text-decoration: none;
    margin-left: 4rem;
    transition: .3s ease-in-out;
}

.navbar a:hover{
    color:var(--main-color);
    text-shadow: 0 0 1rem var(--main-color);
}

.navbar a.router-link-exact-active{
    color:var(--main-color);
    text-shadow: 0 0 1rem var(--main-color);
    font-size: 2rem;
}
/*--- BREAK POINT ---*/

@media (max-width: 991px){
    .header{
      padding: 2rem 3%;
    }
}

@media (max-width: 768px){
    #menu-icon{
        display: block;
    }

    .navbar{
        position: absolute;
        left: 0;
        top: 100%;
        width: 100%;
        padding: 1rem 3%;
        background: var(--bg-color);
        border-top: .1rem solid var(--second-bg-color);
    }

    .navbar a{
        display: block;
        font-size: 2rem;
        margin: 3rem 0;
    }

    .open{
        left: 0;
        box-shadow: 0 .5rem 1rem var(--second-bg-color);
    }

    .close{
        left: -100%;
        box-shadow: none;
    }
}
</style>