<template>
    <div class="navbar bg-black">


      <div class="flex-1 gap-5">
        <NuxtLink class="btn btn-ghost text-xl text-white" to="/staff">SAsaGEYO</NuxtLink>
        <div class="flex gap-2">
          <svgLocation></svgLocation>
          <img src="/img/flag.png">
        </div>
        
      </div>


      

      <div class="flex-none pr-7 ml-auto space-x-10">

        <!-- <NuxtLink to="/customer">             
        <button class="btn btn-secondary"> Go to Customer's Website </button>
        </NuxtLink> -->

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
              <NuxtLink to="/staff/profile" class="justify-between">
                Profile
                <span class="badge">New</span>
              </NuxtLink>
            </li>
            <li><a>Settings</a></li>
            <li><NuxtLink :to="`/auth/login`">Logout</NuxtLink></li>
          </ul>
        </div>
      </div>
    </div>

    </template>
    


    