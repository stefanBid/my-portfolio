<script lang="ts">
import { defineComponent } from 'vue';
import MyButton from '../components/MyButtonComponent.vue'

export default defineComponent({
    name:'HomeView',
    components:{MyButton},
    data(){
        return{
        
        }
    },
    methods:{
        
        goToDownload(){
            window.open("https://drive.google.com/file/d/1wuibB821wePCKiF6Uy66dn623g7eW39g/view?usp=share_link")
            
        }
    }
})
</script>

<template>
    <!--Home Section-->
    <section class="home">
        <div class="home-content">
            <h3>Hello It's Me</h3>
            <h1>Stefano Biddau</h1>
            <h3>And I'm a <span>Frontend Developer</span></h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint quasi perferendis inventore non quaerat ipsa!</p>
            <div class="social-media">
                <a href="http://" target="_blank" rel="instagram"><i class='bx bxl-instagram-alt' ></i></a>
                <a href="http://" target="_blank" rel="linkedin"><i class='bx bxl-linkedin' ></i></a>
            </div>
            <MyButton @click="goToDownload" :btn-class="'btn'">Download CV <i class='bx bx-download'></i></MyButton>
        </div>
        <div class="home-img">
            <img src="../assets/myPhoto.jpg">
        </div>
        
    </section>
</template>

<style scoped>
.home{
    display: flex;
    justify-content: center;
    align-items: center;
}
.home-content{
    padding-right: 5rem ;
}
.home-content h3{
    font-size: 3.2rem;
    font-weight: 700;
}

.home-content h3:nth-of-type(2){
    margin-bottom: 30px;
}

.home-content h3 span{
    color: var(--main-color);
}

.home-content h1{
    font-size: 5.6rem;
    font-weight: 700;
    line-height: 1.3;
}

.home-content p{
    font-size: 1.6rem;
}

.home-img img{
    zoom: 70%;
    width: 35vw;
}

.social-media a{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 5rem;
    background: transparent;
    border: .2rem solid var(--main-color);
    border-radius: 50%;
    font-size: 3rem;
    margin: 3rem 1.5rem 3rem 0;
    color: var(--main-color);
    transition: .5s ease;
}

.social-media a:hover{
    background: var(--main-color);
    color: var(--second-bg-color);
    box-shadow: 0 0 1rem var(--main-color);
}

.btn{
    display: inline-flex;
    justify-content: space-between;
    padding: 1rem 2.8rem;
    background: var(--main-color);
    border-radius: 4rem;
    border: 1px solid var(--main-color);
    box-shadow: 0 0 1rem var(--main-color);
    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: .1rem;
    color: var(--second-bg-color);
    transition: .5s ease;
    cursor: pointer;
}

.btn i{
    font-size: 2rem;
    padding: 0 0 0 1.2rem;
    font-weight: 900;
}

.btn:hover{
    box-shadow: none;
    background: var(--second-bg-color);
    color: var(--main-color);
}

</style>