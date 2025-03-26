<template>
    <div>
        <NuxtLink to="/customer/checkout" class="flex mx-20 mt-5">
            <svgLess></svgLess>
            <span>Back</span>
        </NuxtLink>

        <div  class="grid gap-4 p-4 mx-20">
            <div class="flex items-center">
                    <h1 class="card-title font-bold text-lg text-primary">
                        Address List
                    </h1>   

                    <div class="ml-auto">
                        <NuxtLink to="/customer/address/checkout/create">
                            <button class="btn btn-outline btn-info">Add new address</button> 
                        </NuxtLink>
                    </div>
            </div>

            <div>
                <ul class="bg-base-100 rounded-xl shadow-md p-4 space-y-2">

                    <li class="text-xs opacity-60 tracking-wide">Select your address</li>

                    <!-- Address 1 -->
                    <li class="flex items-center justify-between py-3 border-t first:border-t-0">
                    <div>
                        <div class="font-medium">Jane Doe</div>
                        <div class="text-xs opacity-60">
                        456, no1, Second St, Sub District, District, Province, Country, 54321
                        </div>
                        <div class="text-xs text-gray-500">📍 Next to the school</div>
                        <div class="text-xs text-gray-500">📞 0987654321</div>
                    </div>
                    <NuxtLink :to="`/customer/checkout`">
                        <div class="btn btn-sm btn-primary select-btn">Select</div>                      
                    </NuxtLink>

                    </li>

                    <!-- Address 2 -->
                    <li class="flex items-center justify-between py-3 border-t">
                    <div>
                        <div class="font-medium">John Smith</div>
                        <div class="text-xs opacity-60">
                        789, Tower B, Third Ave, Small Town, Big City, Province, Country, 65432
                        </div>
                        <div class="text-xs text-gray-500">📍 Near the park</div>
                        <div class="text-xs text-gray-500">📞 0912345678</div>
                    </div>
                    <NuxtLink :to="`/customer/checkout`">
                        <div class="btn btn-sm btn-primary select-btn">Select</div>                      
                    </NuxtLink>
                    </li>

                    <!-- Address 3 -->
                    <li class="flex items-center justify-between py-3 border-t">
                    <div>
                        <div class="font-medium">Alice Wonderland</div>
                        <div class="text-xs opacity-60">
                        123, Apt 5A, Wonderland St, Magic Town, Fantasy, Province, Country, 12345
                        </div>
                        <div class="text-xs text-gray-500">📍 Beside the river</div>
                        <div class="text-xs text-gray-500">📞 0876543210</div>
                    </div>
                    <NuxtLink :to="`/customer/checkout`">
                        <div class="btn btn-sm btn-primary select-btn">Select</div>                      
                    </NuxtLink>
                    </li>

                    </ul>

            </div>
        </div>
     
    </div>
</template>

<script>

  // เพิ่ม event สำหรับการเลือกที่อยู่
  document.querySelectorAll('.select-btn').forEach(button => {
    button.addEventListener('click', function() {
      document.querySelectorAll('.select-btn').forEach(btn => {
        btn.classList.remove('btn-success');
        btn.classList.add('btn-primary');
        btn.textContent = 'เลือก';
      });
      this.classList.remove('btn-primary');
      this.classList.add('btn-success');
      this.textContent = '✔ เลือกแล้ว';
    });
  });
</script>