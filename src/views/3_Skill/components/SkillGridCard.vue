<template >
    <!--Card Structure-->
    <div class="card-flex" >
        <div class="header" >
            <slot name="card-title" />
        </div >
        <div class="content" >
            <slot />
        </div >
        <div class="footer" >
            <slot name="card-footer" />
        </div >
    </div >
</template >

<style scoped >
.card-flex{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2rem;
    border: .2rem solid var(--bg-color);
    transition: .3s ease-in-out;

    flex: 1 1 30rem;
    gap: 2.5rem;
    height: 55vh;
    flex-direction: column;
    background: var(--second-bg-color);
    padding: 3rem 2rem 4rem;
}

.card-flex:hover{
    transform: scale(1.02);
    cursor: pointer;
    border-color: var(--main-color);
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



:slotted(.card-flex i){
    font-size: 7rem;
    color: var(--main-color);
}

:slotted(.card-flex h3){
    font-size: 2.6rem;
}

:slotted(.card-flex h4){
    font-size: 2rem;
}

:slotted(.card-flex p){
    font-size: 1.6rem;
}


/*--- BREAK POINT ---*/
@media (max-width: 768px){
    h2{
        margin-bottom: 3rem;
    }
}

</style >