<template>
    <div>
        <Imageslide></Imageslide>
       
       
        <div class="flex justify-center p-7">
            <NuxtLink to="/customer/product" class="btn btn-primary rounded-[50px] text-[15px] px-10 py-5 place-content-center">See all products</NuxtLink>
        </div>

        <div class="pb-20">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center">
            <Imageslidexs :images="imageSet1" />
            <Imageslidexs :images="imageSet2" />
            <Imageslidexs :images="imageSet3" />
            <Imageslidexs :images="imageSet4" />
            <Imageslidexs :images="imageSet5" />
            </div>
        </div> 
        

    </div>
</template>

<script setup>


const imageSet1 = [
    'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
    'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp',
    'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp'
]

const imageSet2 = [
    'https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp',
    'https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp',
    'https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp'
]

const imageSet3 = [
    'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
    'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp',
    'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp'
]

const imageSet4 = [
    'https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp',
    'https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp',
    'https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp'
]

const imageSet5 = [
    'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
    'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp',
    'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp'
]


</script>

<style scoped>

</style>