<template>
  <div>
    <staffNavbar></staffNavbar>

    <div class="flex">
      <staffSidebar></staffSidebar>
        <main class="w-full">
          <slot></slot>
        </main>
    </div>
    
  </div>
  
</template>
