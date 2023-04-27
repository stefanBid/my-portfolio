<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name:"MySection", 
        props:{
            invert:{
                type:Boolean,
                required:false,
                default:false
            },
            distance:{
                type:Number,
                required:false,
                default:5
            }
            
        }    
    })
</script>

<template>
    <!--Section Structure-->
 <section class="sec" :class="[invert?'invert':'', distance === 5?'gap5':'gap10']">
        <div class="sec-l-content">
            <slot></slot>
        </div>
        <div class="sec-r-content">
            <slot name="next"></slot>
        </div>
</section>
</template>

<style scoped>
.sec{
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10rem 9% 2rem;
    min-height:  100vh;
    transition: .3s ease-in-out;
}

.invert{
    flex-direction: row-reverse;
}

.gap5{
    gap: 5rem;
}

.gap10{
    gap: 10rem;
}

:slotted(.sec h3){
    font-size: 3.2rem;
    font-weight: 700;
}

:slotted(.sec h1){
    font-size: 5.6rem;
    font-weight: 700;
    line-height: 1.3;
}

:slotted(.sec p){
    font-size: 1.6rem;
}

:slotted(.sec img){
    zoom: 70%;
    width: 35vw;
}


/*--- BREAK POINT ---*/

@media (max-width: 1200px){
    .sec{
      padding: 10rem 3% 2rem;
    }
}

@media (max-width: 768px){
    .sec{
        flex-direction: column;
        text-align: center;
    }

    .invert{
        flex-direction: column-reverse;
        text-align: center;
    }

    :slotted(.sec img){
        zoom:90%;
        width: 50vh;
    }
}

</style>