<script setup>
defineProps({items:Array})
</script>

<template>
	<div class={styles.sidebar}>
    <v-list :items="items" :item-title="'name'"></v-list>		
	</div>
</template>