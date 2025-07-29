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
import { DashboardWrapper } from '../pages/three-style/dashboard/DashboardWrapper'
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
import GomziNutritionProductList from '../pages/three-style/product/gomzi-list'
import { AddGomziNutritionProduct } from '../pages/three-style/product/add-product'
import { EditGomziNutritionProduct } from '../pages/three-style/product/edit-product'
import AddToCart from '../pages/three-style/add-to-cart/add-to-cart'
import AbandonedList from '../pages/three-style/abandoned-list/abandoned-list'
import ProductOrder from '../pages/three-style/product-order/product-order'
import { ProductOrderView } from '../pages/three-style/product-order/product-order-view'
import { NutritionOrderView } from '../pages/three-style/product-order/all-order/order-view'
import NutritionProductFeedback from '../pages/three-style/feedback/product-feedback'
import ManageCoupon from '../pages/three-style/reference-coupon/manage-coupon'
import Reference from '../pages/three-style/reference-coupon/reference'
import GomziNutritionProductStock from '../pages/three-style/stock/gomzi-product-stock-list'
import WishlistList from '../pages/three-style/wishlist/wishlist-list'

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
					path='/scholarship-result/UserDetails'
					element={<UserView />}
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

				<Route
					path='/gomzi-nutrition-product'
					element={<GomziNutritionProductList />}
				/>
				<Route
					path='/gomzi-nutrition-product-add'
					element={<AddGomziNutritionProduct />}
				/>
				<Route
					path='gomzi-nutrition-product-edit'
					element={<EditGomziNutritionProduct />}
				/>
				<Route
					path='/add-to-cart'
					element={<AddToCart />}
				/>
				<Route
					path='/abandoned-list'
					element={<AbandonedList />}
				/>

				<Route
					path='product-order'
					element={<ProductOrder />}
				/>
				<Route
					path='product-order-view'
					element={<ProductOrderView />}
				/>
				<Route
					path='/all-order/view-order'
					element={<NutritionOrderView />}
				/>
				<Route
					path='nutrition-product-feedback'
					element={<NutritionProductFeedback />}
				/>

				<Route
					path='/manage-coupon'
					element={<ManageCoupon />}
				/>
				<Route
					path='/manage-coupon/reference'
					element={<Reference />}
				/>
				<Route
					path='product-stock-management'
					element={<GomziNutritionProductStock />}
				/>
				<Route
					path='/wishlist'
					element={<WishlistList />}
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
