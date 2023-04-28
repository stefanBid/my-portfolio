<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name:"MyCard",
        props:{
            typeCard:{
                type:String,
                required:true,
                validator(value:string){
                    return ['flex', 'grid'].includes(value)
                }
            }
        }   
    })
</script>

<template>
<!--Card Structure-->
<div :class="[{'card-flex':(typeCard==='flex')}, {'card-grid':(typeCard==='grid')}, {'card':true}]">
    <div class="header">
        <slot name="header"></slot>
    </div>
    <div class="content">
        <slot></slot>
    </div>
    <div class="footer">
        <slot name="footer"></slot>
    </div>
</div>
</template>

<style scoped>
.card{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2rem;
    border: .2rem solid var(--bg-color);
    transition: .3s ease-in-out;
}

.card:hover{
    transform: scale(1.02);
    cursor: pointer;
    border-color: var(--main-color);
}
.card-flex{
    flex: 1 1 30rem;
    gap: 2.5rem;
    height: 55vh;
    flex-direction: column;
    background: var(--second-bg-color);
    padding: 3rem 2rem 4rem;
}

.card-grid{
    position:relative;
    box-shadow: 0 0 1rem var(--second-bg-color);
    overflow: hidden;
    height: 100%;
}

.content, .header, .footer{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    transition: .5s ease-in-out;
}
.card-grid .content{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,.1), var(--main-color));
    padding: 0 4rem;
    transform: translateY(100%);
}

.card-grid:hover .content{
    transform: translateY(0);
}

:slotted(.card i){
    font-size: 7rem;
    color: var(--main-color);
}

:slotted(.card h3){
    font-size: 2.6rem;
}

:slotted(.card h4){
    font-size: 2rem;
}

:slotted(.card p){
    font-size: 1.6rem;
}

:slotted(.card img){
    width: 100%;
}

/*--- BREAK POINT ---*/
@media (max-width: 768px){
    h2{
        margin-bottom: 3rem;
    }

    .card-grid{
        height: 80%;
    }

    :slotted(.card img){
        zoom: 30%;
    }

}


</style>