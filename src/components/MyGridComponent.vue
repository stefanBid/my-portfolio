<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name:"MyGrid" ,
        props:{
            searchBar:{
                type:Boolean,
                required:false,
                default:false
            },
            searchKey:{
                type:String,
                required:false,
                default:''
            },
            typeGrid:{
                type:String,
                required: true,
                validator(value:string){
                    return ['flex', 'grid'].includes(value)
                }
            }

        },
        emits:['update:searchKey']
          
    })
</script>

<template>
<!--Grid Structure-->
 <section class="grid">
    <div class="grid-title">
        <slot name="title"></slot>
    </div>
    <div v-if="searchBar === true" class="grid-search">
        <input type="text" placeholder="Search..." :value="searchKey" @input="$emit('update:searchKey', ($event.target as HTMLInputElement).value)">
    </div>
    <div :class="[{'grid-content': (typeGrid === 'grid')}, {'flex-content': (typeGrid === 'flex')}]">
        <slot></slot>
    </div>
</section>
</template>

<style scoped>
.grid{
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 10rem 9% 2rem;
    min-height:  100vh;
}


.grid-title{
    margin-bottom: 5rem;
}

.grid-search{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 9%;

}

.grid-search input{
   width: 80%;
   padding: 1rem 2rem;
   border-radius: 2rem;
   background: transparent;
   border: .5rem solid var(--second-bg-color);
   color: var(--text-color);
   font-size: 1.8rem;
   transition: .3s ease-in-out;
}

.grid-search input:focus{
   width: 100%;
   padding: 2rem;
   background: var(--second-bg-color);
   border: .2rem solid var(--main-color);
   box-shadow: 0 0 1rem var(--main-color);
}
::placeholder {
  color: var(--main-color);
  opacity: 0.6; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: var(--main-color);
}

::-ms-input-placeholder { /* Microsoft Edge */
    color: var(--main-color);
}

.grid-content{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    gap: 2.5rem
}

.flex-content{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap:2.5rem

}



/*--- BREAK POINT ---*/

@media (max-width: 1200px){
    .grid{
      padding: 10rem 3% 2rem;
    }
}

/*--- BREACK POINT ---*/
@media (max-width: 768px){
    .grid-content{
        grid-template-columns: repeat(1, 1fr);
    }

    .grid-search input{
        width: 100%;
    }
}

</style>