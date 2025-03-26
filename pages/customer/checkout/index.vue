<template>
    <div>
        <NuxtLink to="/customer/cart" class="flex mx-20 mt-5">
            <svgLess></svgLess>
            <span>Back</span>
        </NuxtLink>

        <div class="grid grid-cols-2 space-x-2 mx-20">
            <div class="card card-body bg-slate-400 p-6">

            </div>
            <!-- <div class="p-4 mx-20 grid justify-items-end">
                <button class="btn btn-info text-white">Add new address</button>
            </div> -->
            <div class="space-y-5">

                <div class="relative card card-compact bg-base-100 shadow-xl p-6 rounded-xl">
                        <div class="flex flex-col gap-3">
                            <h1 class="card-title font-bold text-lg text-primary flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-blue-600">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 22s-8-4.4-8-10a8 8 0 1 1 16 0c0 5.6-8 10-8 10z" />
                            </svg>
                            Address Information

                            <SvgEdit></SvgEdit>

                            </h1>

                            <div class="bg-gray-100 p-4 rounded-lg shadow-sm">
                            <p class="text-lg font-semibold text-blue-700">Peter Parker</p>
                            <p class="text-gray-600 flex items-center">
                                098-765-4321
                            </p>
                            <p class="text-gray-600 flex items-center">
                                THAILAND
                            </p>
                            <p class="text-gray-600">
                                Bangkok, Jatuchak, Sena Nikhom
                            </p>
                            <p class="text-gray-600">
                                 123, PS, Main St.
                            </p>
                            <p class="text-gray-600">
                                10001
                            </p>
                            <p class="text-gray-600">
                                Apartment 5B, Near Central Park
                            </p>
                            </div>
                        </div>

                        <!-- Peter Parker
                        📞 098-765-4321
                        🌍 Country: USA
                        🏙️ Province: New York, District: Manhattan, Sub district: Orlanda
                        🏠 House No: 123, Building: PS, Street: Main St.
                        📮 Postal Code: 10001
                        ✏️ Detail Address: Apartment 5B, Near Central Park -->
                
                        <div class="flex space-x-2 pt-4">
                            <button class="btn btn-info text-white">Add new address</button>  
                            <button class="btn btn-info text-white">Add new address</button> 
                        </div>
                        
                </div>


                <div class="card card-compact bg-base-100 shadow-xl p-6 rounded-xl">
                    <h1 class="card-title font-bold text-lg text-primary flex items-center">
                            Payment Method
                    </h1>


                </div>



            </div>



        </div>
      
    </div>

</template>