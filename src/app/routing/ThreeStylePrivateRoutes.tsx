import { FC, lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import FgiitAbandonedList from '../pages/three-style/abandoned-list/abandoned-list'
import FgiitAddToCart from '../pages/three-style/add-to-cart/add-to-cart'
import { AddAdminUser } from '../pages/three-style/admin-user/add-admin-user'
import { AdminProfileView } from '../pages/three-style/admin-user/admin-profile-view'
import AdminUserList from '../pages/three-style/admin-user/admin-user-list'
import { EditAdminUser } from '../pages/three-style/admin-user/edit-admin-user'
import { BookAdd } from '../pages/three-style/books/book-add'
import { BookView } from '../pages/three-style/books/book-view'
import Books from '../pages/three-style/books/books'
import { DashboardWrapper } from '../pages/three-style/dashboard/DashboardWrapper'
import FitnessCourses from '../pages/three-style/fitness-course/fitness'
import CreateInvoiceFGIIT from '../pages/three-style/invoice/create-invoice'
import TotalSalesListFgiit from '../pages/three-style/invoice/total-sales'
import UpdateInvoiceFGIIT from '../pages/three-style/invoice/update-invoice'
import AllOrder from '../pages/three-style/orders/all-order/all-order'
import { OrderView } from '../pages/three-style/orders/all-order/order-view'
import BookOrder from '../pages/three-style/orders/book/book-order'
import { BookOrderView } from '../pages/three-style/orders/book/book-order-view'
import { BookUserOrderView } from '../pages/three-style/orders/book/book-user-order-view'
import DigitalPlanOrder from '../pages/three-style/orders/digital-plan/digital-plan-order'
import EBookOrder from '../pages/three-style/orders/e-book/e-book-order'
import FitnessOrder from '../pages/three-style/orders/fitness-course/fitness'
import FitnessPlanOrder from '../pages/three-style/orders/fitness-plan/fitness-plan'
import UserFitnessCourses from '../pages/three-style/users/fitness-course/fitness'
import { FitnessView } from '../pages/three-style/users/fitness-course/fitness-view'
import AddUserForm from '../pages/three-style/users/users/add-user'
import Users from '../pages/three-style/users/users/users'
import { UserView } from '../pages/three-style/users/users/view-user'

const ThreeStylePrivateRoutes = () => {
	const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

	return (
		<Routes>
			<Route element={<MasterLayout />}>
				{/* <Route path='dashboard' element={<DashboardWrapper />} /> */}
				<Route
					path='users/view-user'
					element={<UserView />}
				/>
				<Route
					path='users/add-user'
					element={<AddUserForm />}
				/>

				{/*  */}
				<Route
					path='/fitness-courses'
					element={<FitnessCourses />}
				/>
				<Route
					path='/scholarship-result/UserDetails'
					element={<UserView />}
				/>
				<Route
					path='/books'
					element={<Books />}
				/>
				<Route
					path='/books/book-view'
					element={<BookView />}
				/>
				<Route
					path='/books/book-add'
					element={<BookAdd />}
				/>
				<Route
					path='/users'
					element={<Users />}
				/>
				<Route
					path='/diet-prefrence'
					element={<UserFitnessCourses />}
				/>
				<Route
					path='/fitness-view'
					element={<FitnessView />}
				/>
				<Route
					path='/all-order'
					element={<AllOrder />}
				/>
				<Route
					path='/all-order/view-order'
					element={<OrderView />}
				/>
				<Route
					path='/fitness-course-order'
					element={<FitnessOrder />}
				/>
				<Route
					path='/book-order'
					element={<BookOrder />}
				/>
				<Route
					path='/book-order-view'
					element={<BookOrderView />}
				/>
				<Route
					path='/book-user-order-view'
					element={<BookUserOrderView />}
				/>
				<Route
					path='/digital-plan-order'
					element={<DigitalPlanOrder />}
				/>
				<Route
					path='/fitness-plan-order'
					element={<FitnessPlanOrder />}
				/>
				<Route
					path='/e-book-order'
					element={<EBookOrder />}
				/>
				<Route
					path='admin-user'
					element={<AdminUserList />}
				/>
				<Route
					path='admin-user-edit'
					element={<EditAdminUser />}
				/>
				<Route
					path='admin-user-add'
					element={<AddAdminUser />}
				/>
				<Route
					path='admin-user/admin-profile'
					element={<AdminProfileView />}
				/>

				{/* Invoice  */}
				<Route
					path='/invoice/create'
					element={<CreateInvoiceFGIIT />}
				/>
				<Route
					path='/invoice/update'
					element={<UpdateInvoiceFGIIT />}
				/>
				<Route
					path='/invoice/list'
					element={<TotalSalesListFgiit />}
				/>

				<Route
					path='/cart/add-to-cart'
					element={<FgiitAddToCart />}
				/>
				<Route
					path='/cart/abandoned-list'
					element={<FgiitAbandonedList />}
				/>

				{/* Lazy Modules */}
				<Route
					path='admin-user'
					element={
						<SuspensedView>
							<UsersPage />
						</SuspensedView>
					}
				/>

				{/* fgiit route */}
				<Route
					path='dashboard'
					element={<DashboardWrapper />}
				/>
				{/* Page Not Found */}
				<Route
					path='*'
					element={<Navigate to='/error/404' />}
				/>
			</Route>
		</Routes>
	)
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
	const baseColor = getCSSVariableValue('--bs-primary')
	TopBarProgress.config({
		barColors: {
			'0': baseColor,
		},
		barThickness: 1,
		shadowBlur: 5,
	})
	return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { ThreeStylePrivateRoutes }
