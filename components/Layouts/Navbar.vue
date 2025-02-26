<template>
    <div class="navbar bg-black">


      <div class="flex-1">
        <NuxtLink class="btn btn-ghost text-xl text-white" to="/">SAsaGEYO</NuxtLink>
      </div>

      <div class="flex-none pr-4">
        <ul class="menu menu-horizontal px-4 z-[1]">
            <li>
                <details>
                    <summary class="text-white">Product</summary>
                    <ul class="bg-base-100 rounded-t-none p-4 w-48 shadow-lg">
                        <li><NuxtLink to="/products">All products</NuxtLink></li>
                        <ul>
                            <li><NuxtLink>Category 1</NuxtLink></li>
                            <li><NuxtLink>Category 2</NuxtLink></li>
                            <li><NuxtLink>Category 3</NuxtLink></li>
                            <li><NuxtLink>Category 4</NuxtLink></li>
                        </ul>
                    </ul>
                </details>
            </li>
            <li><NuxtLink to="/about" class="text-white">About</NuxtLink></li>
    </ul>

    </div>
      

      <div class="flex-none pr-7 ml-auto">

        <div class="pr-2">
            <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 576 512"
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
            >!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.<path fill="#ffffff" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
        </div>

        <div class="dropdown dropdown-end pr-4">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
                         
              <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 576 512"
                class="h-5 w-5"
                fill="none"
                stroke="currentColor">
              >!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.<path fill="#ffffff" d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/> </svg>
    
              <span class="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div
            tabindex="0"
            class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
            <div class="card-body">
              <span class="text-lg font-bold">8 Items</span>
              <span class="text-info">Subtotal: $999</span>
              <div class="card-actions">
                <button class="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>

    </template>
    


    