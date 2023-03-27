<script setup>
	const items = ref([{name: "Ампер", descriprion: "А"}, {name: "Ватты", descriprion: "Вт"}, {name: "Вольты", descriprion: "В"}, {name: "Герцы", descriprion: "Гц"}])
</script>

<template>
	<div class={styles.sidebar}>
    <v-list :items="items" :item-title="'name'"></v-list>		
	</div>
</template>