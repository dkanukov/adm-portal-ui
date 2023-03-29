<script setup>
		definePageMeta({
			layout: 'default',
		})
		const items = ref([{name: "Ампер", descriprion: "А"}, {name: "Ватты", descriprion: "Вт"}, {name: "Вольты", descriprion: "В"}, {name: "Герцы", descriprion: "Гц"}]);
		function addNewItem (){
			items.value.push({name:"Новая единица измерения", description:"123"})
		}
		</script>

<template>
			<div class="page-wrapper">
				<div>
					<VBtn class="add" color="#1867C0" @click="addNewItem">Добавить единицу измерения</VBtn>
					<Sidebar :items="items"/> 
				</div>
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