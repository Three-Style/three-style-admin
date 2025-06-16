/* eslint-disable react/jsx-no-target-blank */
import {
	faCartShopping,
	faChartLine,
	faCoins,
	faDumbbell,
	faFileInvoice,
	faHome,
	faJar,
	faTags,
} from '@fortawesome/free-solid-svg-icons'
import { AsideMenuItem } from '../AsideMenuItem'
import { AsideMenuItemWithSub } from '../AsideMenuItemWithSub'

export function GomziNutritionAsideMenuItems() {
	return (
		<>
			<AsideMenuItem
				to='/nutrition/dashboard'
				Icon={faHome}
				title='Dashboard'
			/>
			<AsideMenuItem
				to='gomzi-nutrition-product'
				title='All Products'
				Icon={faJar}
			/>
			<AsideMenuItem
				to='/nutrition/add-to-cart'
				title='User Cart'
				Icon={faCartShopping}
			/>
			<AsideMenuItem
				to='/nutrition/abandoned-list'
				title='Abandoned Checkout'
				Icon={faJar}
			/>
			<AsideMenuItemWithSub
				to=''
				title='Invoice'
				Icon={faFileInvoice}>
				<AsideMenuItem
					to='create-invoice-nutrition'
					title='Create Invoice'
					hasBullet={true}
				/>
				<AsideMenuItem
					to='nutrition-invoice'
					title='Invoice List'
					hasBullet={true}
				/>
			</AsideMenuItemWithSub>
			<AsideMenuItem
				to='expense'
				title='Expense'
				Icon={faChartLine}
			/>
			<AsideMenuItem
				to='create-quotation'
				title='Quotation'
				Icon={faCoins}
			/>
			<AsideMenuItem
				to='product-order'
				title='Product Order'
				Icon={faJar}
			/>
			<AsideMenuItem
				to='trainer-list'
				title='Trainer List'
				Icon={faDumbbell}
			/>
			<AsideMenuItemWithSub
				to=''
				title='Reference Coupon'
				Icon={faTags}>
				<AsideMenuItem
					to='manage-coupon'
					title='Manage Coupon'
					hasBullet={true}
				/>
			</AsideMenuItemWithSub>
		</>
	)
}
