import { Route, Routes } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import AbandonedList from '../pages/gomzi-nutrition/abandoned-list/abandoned-list'
import AddToCart from '../pages/gomzi-nutrition/add-to-cart/add-to-cart'
import { GomziNutritionDashboard } from '../pages/gomzi-nutrition/dashboard/DashboardWrapper'
import { AddExpenseNutrition } from '../pages/gomzi-nutrition/expense/create-expense'
import ExpenseListDetailsNutrition from '../pages/gomzi-nutrition/expense/expense-details'
import NutritionProductFeedback from '../pages/gomzi-nutrition/feedback/product-feedback'
import { AddGomziNutritionProduct } from '../pages/gomzi-nutrition/gomzi-nutrition/add-gomzi-nutrition-product'
import { EditGomziNutritionProduct } from '../pages/gomzi-nutrition/gomzi-nutrition/edit-gomzi-nutrition-product'
import GomziNutritionProductList from '../pages/gomzi-nutrition/gomzi-nutrition/gomzi-nutrition-product-list'
import NutritionCreateInvoice from '../pages/gomzi-nutrition/invoice/create-invoice'
import NutritionTotalSalesList from '../pages/gomzi-nutrition/invoice/total-sales'
import NutritionUpdateInvoice from '../pages/gomzi-nutrition/invoice/update-invoice'
import NutritionAllOrder from '../pages/gomzi-nutrition/product/all-order/all-order'
import { NutritionOrderView } from '../pages/gomzi-nutrition/product/all-order/order-view'
import ProductOrder from '../pages/gomzi-nutrition/product/product-order'
import { ProductOrderView } from '../pages/gomzi-nutrition/product/product-order-view'
import ManageCoupon from '../pages/gomzi-nutrition/reference-coupon/manage-coupon'
import Reference from '../pages/gomzi-nutrition/reference-coupon/reference'
import GomziNutritionProductStock from '../pages/gomzi-nutrition/stock/gomzi-product-stock-list'
import NutritionCreateQuotation from '../pages/gomzi-nutrition/quotation/create-quotation'

const GomziNutritionPrivateRoutes = () => {
	return (
		<Routes>
			<Route element={<MasterLayout />}>
				<Route
					path='dashboard'
					element={<GomziNutritionDashboard />}
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
					path='/create-invoice-nutrition'
					element={<NutritionCreateInvoice />}
				/>
				<Route
					path='/update-invoice-nutrition'
					element={<NutritionUpdateInvoice />}
				/>
				<Route
					path='/nutrition-invoice'
					element={<NutritionTotalSalesList />}
				/>
				<Route
					path='/create-quotation'
					element={<NutritionCreateQuotation />}
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
					path='expense/create'
					element={<AddExpenseNutrition />}
				/>
				<Route
					path='expense'
					element={<ExpenseListDetailsNutrition />}
				/>
				<Route
					path='expense/update'
					element={<AddExpenseNutrition />}
				/>
				<Route
					path='product-stock-management'
					element={<GomziNutritionProductStock />}
				/>
			</Route>
		</Routes>
	)
}

// const SuspensedView: FC<WithChildren> = ({ children }) => {
// 	const baseColor = getCSSVariableValue('--bs-primary')
// 	TopBarProgress.config({
// 		barColors: {
// 			'0': baseColor,
// 		},
// 		barThickness: 1,
// 		shadowBlur: 5,
// 	})
// 	return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
// }

export { GomziNutritionPrivateRoutes }
