<script setup>
		definePageMeta({
			layout: 'default',
		})
		const items = ref([{name: "Вольты", descriprion: "В"}, {name: "Герцы", descriprion: "Гц"}])
		</script>

<template>
			<div class="page-wrapper">
				<Sidebar :items="items"/> 
				<div>
				<OptionForm />
				<Table />
				<VBtn class="add" color="#1867C0">Добавить</VBtn>
				</div>
			</div>
</template>	
<style scoped> 
.add {color: #fff;}
.page-wrapper {display: grid; grid-template-columns: 1fr 3fr;}
</style>