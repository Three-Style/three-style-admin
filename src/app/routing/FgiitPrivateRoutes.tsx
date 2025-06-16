import { FC, lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import FgiitAbandonedList from '../pages/fgiit/abandoned-list/abandoned-list'
import FgiitAddToCart from '../pages/fgiit/add-to-cart/add-to-cart'
import { AddAdminUser } from '../pages/fgiit/admin-user/add-admin-user'
import { AdminProfileView } from '../pages/fgiit/admin-user/admin-profile-view'
import AdminUserList from '../pages/fgiit/admin-user/admin-user-list'
import { EditAdminUser } from '../pages/fgiit/admin-user/edit-admin-user'
import { BookAdd } from '../pages/fgiit/books/book-add'
import { BookView } from '../pages/fgiit/books/book-view'
import Books from '../pages/fgiit/books/books'
import { DashboardWrapper } from '../pages/fgiit/dashboard/DashboardWrapper'
import FitnessCourses from '../pages/fgiit/fitness-course/fitness'
import CreateInvoiceFGIIT from '../pages/fgiit/invoice/create-invoice'
import TotalSalesListFgiit from '../pages/fgiit/invoice/total-sales'
import UpdateInvoiceFGIIT from '../pages/fgiit/invoice/update-invoice'
import AllOrder from '../pages/fgiit/orders/all-order/all-order'
import { OrderView } from '../pages/fgiit/orders/all-order/order-view'
import BookOrder from '../pages/fgiit/orders/book/book-order'
import { BookOrderView } from '../pages/fgiit/orders/book/book-order-view'
import { BookUserOrderView } from '../pages/fgiit/orders/book/book-user-order-view'
import DigitalPlanOrder from '../pages/fgiit/orders/digital-plan/digital-plan-order'
import EBookOrder from '../pages/fgiit/orders/e-book/e-book-order'
import FitnessOrder from '../pages/fgiit/orders/fitness-course/fitness'
import FitnessPlanOrder from '../pages/fgiit/orders/fitness-plan/fitness-plan'
import UserFitnessCourses from '../pages/fgiit/users/fitness-course/fitness'
import { FitnessView } from '../pages/fgiit/users/fitness-course/fitness-view'
import AddUserForm from '../pages/fgiit/users/users/add-user'
import Users from '../pages/fgiit/users/users/users'
import { UserView } from '../pages/fgiit/users/users/view-user'

const FgiitPrivateRoutes = () => {
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

export { FgiitPrivateRoutes }
