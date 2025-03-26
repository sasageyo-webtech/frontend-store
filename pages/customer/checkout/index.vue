<template>
    <div>
        <NuxtLink to="/customer/cart" class="flex mx-20 mt-5">
            <svgLess></svgLess>
            <span>Back</span>
        </NuxtLink>

        <br>

        <div class="grid grid-cols-2 space-x-2 mx-20">


            <!-- checkout left-->
            <div class="card card-body bg-slate-100 p-6">
                <div class="card card-body bg-slate-100 p-6 flex flex-col min-h-full">
                    <div class="overflow-x-auto flex-grow">
                        <table class="table">
                            <!-- head -->
                            <thead>
                                <tr>
                                    <th>Products</th>
                                    <th>Price / Unit</th>
                                    <th>Amount</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- row 1 -->
                                <tr class="bg-base-100">
                                    <td>
                                        <div class="flex items-center gap-3">
                                            <div class="avatar">
                                                <div class="mask mask-squircle h-12 w-12">
                                                    <img src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold">Hart Hagerty</div>
                                                <div class="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="badge badge-ghost badge-m">189 ฿</span></td>
                                    <td>1</td>
                                    <th><div class="badge badge-outline badge-ghost">189 ฿</div></th>
                                </tr>
                                <!-- row 2 -->
                                <tr class="bg-base-100">
                                    <td>
                                        <div class="flex items-center gap-3">
                                            <div class="avatar">
                                                <div class="mask mask-squircle h-12 w-12">
                                                    <img src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold">Hart Hagerty</div>
                                                <div class="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="badge badge-ghost badge-m">100 ฿</span></td>
                                    <td>1</td>
                                    <th><div class="badge badge-outline badge-ghost">100 ฿</div></th>
                                </tr>
                            </tbody>

                            <!-- foot -->
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th class="py-4">Delivery Fee</th>
                                    <th><span class="badge">45 ฿</span></th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th>
                                        <div class="pb-3">Total Price</div>
                                        <div class="badge badge-soft badge-success text-white">334 ฿</div>
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <!-- ปุ่ม Place Order -->
                    <div class="mt-auto pt-5">
                        <NuxtLink to="/customer/checkout">
                            <button class="btn bg-blue-700 hover:bg-blue-900 text-white rounded-badge w-full">Place Order</button>
                        </NuxtLink>                
                    </div>
                </div>



            <!-- address right-->


            </div>
            <!-- <div class="p-4 mx-20 grid justify-items-end">
                <button class="btn btn-info text-white">Add new address</button>
            </div> -->
            <div class="space-y-5">

                <div class="relative card card-compact bg-base-100 shadow-xl p-6 rounded-xl">
                        <div class="flex flex-col gap-3">
                            <h1 class="card-title font-bold text-lg text-primary flex items-center">
                            <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-blue-600">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 22s-8-4.4-8-10a8 8 0 1 1 16 0c0 5.6-8 10-8 10z" />
                            </svg> -->
                            Address Information

                            <SvgEdit></SvgEdit>

                            </h1>

                            <div class="bg-gray-100 p-4 rounded-lg shadow-sm">
                                    <legend class="text-sm/6 font-semibold text-gray-900">Peter Parker</legend>
                                    <div class="mt-1 text-sm/6 text-gray-600">
                                        <p>
                                            098-765-4321
                                        </p>
                                        <p>
                                            THAILAND
                                        </p>
                                        <p>
                                            Bangkok, Jatuchak, Sena Nikhom
                                        </p>
                                        <p>
                                            123, PS, Main St., 10001
                                        </p>
                                        <p class="text-gray-600">
                                            Apartment 5B, Near Central Park
                                        </p>                                        
                                    </div>

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
                            <button class="btn btn-outline btn-info">Add new address</button>
                            <button class="btn btn-outline btn-info">Change address</button>
                        </div>
                        
                </div>

                <!-- Payment Method -->

                <div class="card card-compact bg-base-100 shadow-xl p-6 rounded-xl">
                    <h1 class="card-title font-bold text-lg text-primary flex items-center">
                            Payment Method
                    </h1>

                    <div>

                        <fieldset>
                            <div class="mt-6 space-y-6">
                                <div class="flex items-center gap-x-3">
                                <input id="push-everything" name="push-notifications" type="radio" checked class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden">
                                <label for="push-everything" class="block text-sm/6 font-medium text-gray-900">QR Code</label>
                                </div>
                                <div class="flex items-center gap-x-3">
                                <input id="push-email" name="push-notifications" type="radio" class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden">
                                <label for="push-email" class="block text-sm/6 font-medium text-gray-900">Transfer via Bank Account</label>
                                </div>
                            </div>
                        </fieldset>
                        

                    </div>


                </div>



            </div>



        </div>
      
    </div>

</template>