/* eslint-disable react/jsx-no-target-blank */
import {
	faBook,
	faCartArrowDown,
	faCartShopping,
	faChartLine,
	faFileInvoice,
	faHome,
	faJar,
	faUser,
	faUserCog,
	faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { AsideMenuItem } from '../AsideMenuItem'
import { AsideMenuItemWithSub } from '../AsideMenuItemWithSub'

export function FGIITAsideMenuItems() {
	return (
		<>
			<AsideMenuItem
				to='/fgiit/dashboard'
				Icon={faHome}
				title='Dashboard'
			/>
			<AsideMenuItem
				to='admin-user'
				Icon={faUserCog}
				title='Admin User'
			/>
			<AsideMenuItem
				to='contact-inquiry/contact'
				Icon={faUser}
				title='Contact Inquery'
			/>
			{/* Invoice start*/}
			<AsideMenuItemWithSub
				to=''
				title='Invoice'
				Icon={faFileInvoice}>
				<AsideMenuItem
					to='invoice/create'
					title='Create Invoice'
					hasBullet={true}
				/>
				<AsideMenuItem
					to='invoice/list'
					title='Invoice List'
					hasBullet={true}
				/>
			</AsideMenuItemWithSub>
			{/* Invoice End*/}

			<AsideMenuItem
				Icon={faChartLine}
				to='expense-details'
				title='Expense'
			/>

			{/* FGIIT start*/}
			<AsideMenuItemWithSub
				to=''
				title='FGIIT'
				Icon={faBook}>
				<AsideMenuItem
					to='fitness-courses'
					title='Fitness Course'
					hasBullet={true}
				/>
				<AsideMenuItem
					to='books'
					title='Books'
					hasBullet={true}
				/>
			</AsideMenuItemWithSub>
			{/* FGIIT End*/}

			{/* Users start*/}
			<AsideMenuItemWithSub
				to=''
				title='Users'
				Icon={faUsers}>
				<AsideMenuItem
					to='users'
					title='All Users'
					hasBullet={true}
				/>
			</AsideMenuItemWithSub>
			{/* Users End*/}

			{/* Orders start*/}
			<AsideMenuItemWithSub
				to=''
				title='Orders'
				Icon={faCartArrowDown}>
				<AsideMenuItem
					to='all-order'
					title='All Orders'
					hasBullet={true}
				/>
				<AsideMenuItem
					to='fitness-course-order'
					title='Fitness Course'
					hasBullet={true}
				/>
			</AsideMenuItemWithSub>
			{/* Orders End*/}

			{/* Cart start*/}
			<AsideMenuItemWithSub
				to=''
				title='Cart'
				Icon={faCartArrowDown}>
				<AsideMenuItem
					to='/fgiit/cart/add-to-cart'
					title='User Cart'
					Icon={faCartShopping}
				/>
				<AsideMenuItem
					to='/fgiit/cart/abandoned-list'
					title='Abandoned Checkout'
					Icon={faJar}
				/>
			</AsideMenuItemWithSub>
			{/* Cart End*/}
		</>
	)
}
