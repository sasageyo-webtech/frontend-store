<template>
    <div class="flex flex-col min-h-screen">
      <!-- Navbar -->
      <AuthNavbar></AuthNavbar>
  
      <!-- Content -->
      <main>
        <slot></slot>
      </main>
  
      <!-- Footer -->
      <customerFooter></customerFooter>
    </div>
</template>
  