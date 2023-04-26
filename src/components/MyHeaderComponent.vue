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
            changeHamburgerIcon:false
        }
    },
    computed:{
        hamburgerIcon(){
            if(!this.changeHamburgerIcon){
                return 'bx bx-menu-alt-right'
            }else{
                return 'bx bx-x'
            }
        }
    },
    mounted(){
        this.headerLogo = {name:'home', label:'My Portfolio.'},
        this.headerItems = [
            {name:'home', label:'Home'},
            {name:'about', label:'About'},
            {name:'services', label:'Services'},
            {name:'portfolio', label:'Portfolio'},
            {name:'contact', label:'Contact'},
        ]
    }
})
</script>
<template>
    <header class="header">
        <RouterLink :to="{name:headerLogo.name}" class="logo"><i class="bx bxs-terminal"></i> {{ headerLogo.label }}</RouterLink>
        <i :class="hamburgerIcon" id="menu-icon" @click="$event=>{changeHamburgerIcon = !changeHamburgerIcon}"></i>
        <nav class="navbar">
           <RouterLink v-for="item of headerItems" :to="{name:item.name}">{{ item.label }}</RouterLink>
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
    font-size: 20px;
}
</style>