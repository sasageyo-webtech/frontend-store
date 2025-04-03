<template>
    <div class="navbar bg-gray-900">
      <div class="flex-1">
        <div class="watsons-services py-[10px] rounded-2xl">
            <NuxtLink class="text-xl text-[white]" to="/"><strong>SAsaGEYO</strong></NuxtLink>
          <div class="flex gap-2">
            <!-- <svgLocation></svgLocation> -->
            <img src="/img/flag.png">
          </div>
        </div>  
      </div>
    </div>
</template>


<style>

.watsons-services {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(92deg,#2fe7cc 7%,#a5e43d 99%);
    font-size: 14px;
    color: #333;
    grid-gap: 8px;
    padding-left: 20px;
    padding-right: 20px;
}
</style>
    