import { Route, Routes } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'

const MasterPrivateRoutes = () => {
	return (
		<Routes>
			<Route element={<MasterLayout />}>
				{/* <Route
					path='facebook-automation-create'
					element={<FacebookAutomationCreate />}
				/> */}
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

export { MasterPrivateRoutes }
