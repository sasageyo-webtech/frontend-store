<template>
    <div> 
        <header>
            <nav>
                <h1 class="logo" color="blue">SASAGEYO</h1>
                <NuxtLink to="/">Home page</NuxtLink>
                <NuxtLink to="/about">About</NuxtLink>   
                <NuxtLink to="/products">Product</NuxtLink>   
                <NuxtLink to="/profile">Profile</NuxtLink>
            </nav>        
        </header>
        <div>
            <slot></slot>
        </div>
        <!-- <LayoutsNavbar></LayoutsNavbar> -->
    </div>

</template>

<script>

</script>

<style scoped>

nav {
    margin: 10px auto;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
    color: white;
}

nav a {
    color: yellow;
    text-decoration: none;
    margin-left: 12px;
    font-size: 18px;
    padding: 10px;
}

nav a:hover {
    color: white;
}

.logo {
    margin-right: auto;
    padding-left: 10px;
}

</style>


