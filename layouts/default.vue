<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar -->
    <customerNavbar></customerNavbar>

    <!-- Content -->
    <main class="flex-grow">
      <slot></slot>
    </main>

    <!-- Footer -->
    <customerFooter></customerFooter>
  </div>
</template>
