<template>
  <div>
    <staffNavbar></staffNavbar>

    <div class="flex">
      <staffSidebar></staffSidebar>
        <main>
          <slot />
        </main>
    </div>
    
  </div>
  
</template>
