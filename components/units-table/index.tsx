import {defineComponent, ref} from '#imports'
import {storeToRefs} from 'pinia'
import {VTable, VBtn} from 'vuetify/components'
import {unitsStore} from '~/store/units'
import UnitsTableRow from '../units-table-row'

export default defineComponent({
	setup () {
    const isLoading = ref(false)
    const units = unitsStore()
    const { selectedUnit } = storeToRefs(units)

    async function onClickCreateNewUnitParam () {
      isLoading.value = true
      const unit = await units.addNewParamToExistingUnit()
      isLoading.value = false
    }

    return {
      isLoading,
      selectedUnit,
      onClickCreateNewUnitParam
    }
	},

	render() {
		return (
      <div class="table">
        <VTable style={{ marginBottom: '24px' }}>
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
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            {
              this.selectedUnit &&
              this.selectedUnit.params.map((item, index) => (
                <UnitsTableRow item={item} index={index} unitId={this.selectedUnit ? this.selectedUnit.unit_id : 0}/>
              ))
            }
          </tbody>
        </VTable>

        <VBtn
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          /*@ts-ignore*/
          onClick={this.onClickCreateNewUnitParam}
          loading={this.isLoading}
        >Добавить</VBtn>
			</div>
		)
	}
})
