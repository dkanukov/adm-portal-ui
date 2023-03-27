<script setup>
        const tableDate = ref([{name: "Ампер", multiply: "10", diapason: "35"},{name: "Ампер", multiply: "10", diapason: "35"}, {name: "Ампер", multiply: "10", diapason: "35"}])

</script>
<template>
			<div class="table">
			<VTable>
            <thead>
      <tr>
        <th class="text-left">
          Сокращение
        </th>
        <th class="text-left">
          Множитель
        </th>
        <th class="text-left">
          Диапазон действия
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in tableDate"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.multiply }}</td>
        <td>{{ item.diapason }}</td>
      </tr>
    </tbody>
            </VTable>	
			</div>
</template>