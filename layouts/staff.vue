<template>
  <div>
    <staffNavbar></staffNavbar>

    <div class="flex">
      <staffSidebar></staffSidebar>
        <main>
          <slot></slot>
        </main>
    </div>
    
  </div>
  
</template>
