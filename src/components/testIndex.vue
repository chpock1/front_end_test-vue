<template lang="pug">
transition(name="slide")
	.row.text-center(v-if="$route.name==='index'")
		button.btn.btn-light(@click="$router.push({name:'form'})") Подать заявку
router-view(v-slot="{ Component }")
	transition(name="slide")
		component(:is="Component")
</template>

<script>
export default {
	name : "testIndex",
};
</script>

<style>
.slide-enter-active {
	transition: all .2s ease;
}
.slide-leave-active {
	transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter, .slide-leave-to {
	transform: translateY(-100%);
}
</style>
