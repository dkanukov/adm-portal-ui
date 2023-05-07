import {defineComponent} from '#imports'
import { ratiosStore } from '~/store/ratios'
import { RatioInfo, RatiosSidebar } from '#components'
import styles from './styles.module.css'

export default defineComponent({
	async setup() {
		const ratio = ratiosStore()
		await ratio.fetchRatioParams()
		return {
			ratio,
		}
	},
	render() {
		return (
			<div class={styles.ratioPage}>
				{
					this.ratio.ratioParams && (
						<RatiosSidebar
							parametersList={this.ratio.ratioParams}
							selectedParameter={this.ratio.selectedRatio}
							whenRatioParamSelect={this.ratio.whenRatioParamSelect}
						/>
					)
				}
				{
					this.ratio.selectedRatio && (
						<RatioInfo
							selectedRatio={this.ratio.selectedRatio}
							whenRatioFieldChange={this.ratio.whenRatioFieldChange}	
						/>
					)
				}
			</div>
		)
	}
})
