<!-- <script setup>
    defineProps({
    username: String,
    comment: String,
    profile: String,
    rating: String
    });

</script>
<template>
    <div class="grid grid-cols-[auto_1fr] gap-4 card card-compact bg-base-100 shadow-xl p-4 rounded-lg mx-20 mb-3">

        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
            <img
                alt="Tailwind CSS Navbar component"
                :src="`${profile}`"/>
            </div>
        </div>

        <div>
            <p class="text-xs">{{username}}</p>
            <p class="text-xs">{{rating}}</p>
            <p>{{ comment }}</p>
        </div>
</div>
</template> -->

<script setup>
import SvgStar from '@/components/svg/Star.vue'
import SvgGrayStar from '@/components/svg/GrayStar.vue'
import { computed } from 'vue'

const props = defineProps({
    username: String,
    comment: String,
    profile: String,
    rating: Number
});

const stars = computed(() => {
    return Array.from({ length: 5 }, (_, i) => i < props.rating ? 'full' : 'empty')
});
</script>

<template>
    <div class="grid grid-cols-[auto_1fr] gap-4 card card-compact bg-base-100 shadow-xl p-4 rounded-lg mx-20 mb-3">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
                <img alt="Profile Image" :src="profile" />
            </div>
        </div>

        <div>
            <p class="text-xs">{{ username }}</p>
            <div class="flex py-2">
                <div v-for="(star, index) in stars" :key="index">
                    <SvgStar v-if="star === 'full'" />
                    <SvgGrayStar v-else />
                </div>
            </div>
            <p>{{ comment }}</p>
        </div>
    </div>
</template>

