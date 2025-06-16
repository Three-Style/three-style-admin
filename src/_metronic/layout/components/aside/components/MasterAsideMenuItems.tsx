/* eslint-disable react/jsx-no-target-blank */
import {
	faHome,
} from '@fortawesome/free-solid-svg-icons'
import { AsideMenuItem } from '../AsideMenuItem'

export function MasterAsideMenuItems() {
	return (
		<>
			<AsideMenuItem
				to='/master/dashboard'
				Icon={faHome}
				title='Dashboard'
			/>
		</>
	)
}
