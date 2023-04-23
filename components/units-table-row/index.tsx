import { defineComponent, toRefs, useRouter } from '#imports'
import {mdiDelete, mdiNoteEdit} from '@mdi/js'
import { ref } from '#imports'
import { VBtn, VTextField } from 'vuetify/components'
import {unitsStore} from '~/store/units'
import { UnitParam } from '../units-sidebar/units-sidebar'
import styles from './styles.module.css'
import {PropType} from 'vue'

export default defineComponent({
  props: {
    index: {
      type: Number,
      required: true
    },
    item: {
      type: Object as PropType<UnitParam>,
			required: true,
    },
    unitId: {
      type: Number,
      required: true
    }
  },

	setup(props) {
    const router = useRouter()
    const units = unitsStore()
    const loading = ref(false)
    const { item, index, unitId } = toRefs(props)
    const isEditFormOpen = ref(false)

    const paramMultiplier = ref<string>(item.value.multiplier)
    const paramAbbreviation = ref<string>(item.value.abbreviation)

    const paramActionRangeFrontIncluded = ref<boolean>(item.value.action_range.front_included)
    const paramActionRangeBackIncluded = ref<boolean>(item.value.action_range.back_included)
    const paramActionRangeLowerLimit = ref<string>(item.value.action_range.lower_limit)
    const paramActionRangeUpperLimit = ref<string>(item.value.action_range.upper_limit)

    async function onClickDeleteUnitParam () {
      loading.value = true
      await units.removeSelectedUnitParam(index.value)
      loading.value = false
    }

    function onClickUpdateUnitParam () {
      router.push({query:{update_unit_param: unitId.value + "-" + index.value}})
    }

    return {
      item,
      index,
      loading,
      isEditFormOpen,
      onClickUpdateUnitParam,
      onClickDeleteUnitParam,

      paramMultiplier,
      paramAbbreviation,

      paramActionRangeFrontIncluded,
      paramActionRangeBackIncluded,
      paramActionRangeLowerLimit,
      paramActionRangeUpperLimit,
    }
	},

	render() {
		return (
      <tr
        class={styles.row}
        key={this.item.abbreviation}
      >
        <td
          class={styles.rowCell}
        >
          {this.item.abbreviation}
        </td>

        <td
          class={styles.rowCell}
        >
          { this.item.multiplier }
        </td>

        <td
          class={styles.rowCell}
        >
          {`[${this.item.action_range.lower_limit}:${this.item.action_range.upper_limit}]`}
        </td>

        <td class={styles.lastCell}>
          <VBtn
            icon={mdiNoteEdit}
            size={'x-small'}
            color={'gray'}
            class={styles.checkButton}
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            /*@ts-ignore*/
            onClick={this.onClickUpdateUnitParam}
            loading={this.loading}
          />
          <VBtn
            icon={mdiDelete}
            size={'x-small'}
            color={'red'}
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            /*@ts-ignore*/
            onClick={this.onClickDeleteUnitParam}
          />
        </td>
      </tr>
		)
	}
})
