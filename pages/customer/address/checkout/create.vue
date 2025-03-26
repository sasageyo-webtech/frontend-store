<template>
    <div>
        <NuxtLink to="/customer/checkout" class="flex mx-20 mt-5">
            <svgLess></svgLess>
            <span>Back</span>
        </NuxtLink>

        <br>

        <div class="grid gap-4 card card-compact bg-base-100 shadow-xl p-4 rounded-lg mx-20">

                <h1 class="card-title font-bold text-lg text-primary">
                        Address List
                </h1>   

                <form class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium">Name</label>
                        <input type="text" placeholder="name"  class="input input-bordered w-full" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Phone Number</label>
                        <input type="text" placeholder="xxx-xxxx-xxx" class="input input-bordered w-full" />
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium">House Number</label>
                        <input type="text" placeholder="456" class="input input-bordered w-full" />
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium">Building (Optional)</label>
                        <input type="text" class="input input-bordered w-full" placeholder="Enter building name (if any)" />
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium">Street</label>
                        <input type="text" placeholder="Second St" class="input input-bordered w-full" />
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium">Sub District</label>
                        <input type="text" placeholder="Sub District" class="input input-bordered w-full" />
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium">District</label>
                        <input type="text" placeholder="District" class="input input-bordered w-full" />
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium">Province</label>
                        <input type="text" placeholder="Province" class="input input-bordered w-full" />
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium">Country</label>
                        <input type="text" placeholder="Country" class="input input-bordered w-full" />
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium">Postal Code</label>
                        <input type="text" placeholder="54321" class="input input-bordered w-full" />
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium">Detail Address (Optional)</label>
                        <input type="text" class="input input-bordered w-full" placeholder="Enter additional details (if any)" />
                    </div>
                    
                    <button type="submit" class="btn btn-primary w-full">Save</button>
                </form>
</div>


    </div>
</template>