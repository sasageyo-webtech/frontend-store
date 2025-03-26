<script lang="ts" setup>

const response = ref()

async function getUsers() {
    const {data} = await useAPIFetch('/users', {
        method: 'get'
    })
    console.log(data.value)
    response.value = data.value
}


</script>

<template>
    
    <div>
        <div>
            <button class="bg-blue text-black" @click="getUsers">
                Click
            </button>
        </div>
        <pre>  
        {{  response }}
            
        </pre>
    </div>
</template>