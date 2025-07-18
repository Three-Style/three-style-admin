import { FC, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { App } from '../App'
import { AuthPage, Logout } from '../modules/auth'
import { NutritionAuthPage } from '../pages/gomzi-nutrition/auth/AuthPage'
import { MasterAuthPage } from '../pages/master/auth/AuthPage'
import { ThreeStylePrivateRoutes } from './ThreeStylePrivateRoutes'
import { GomziNutritionPrivateRoutes } from './GomziNutritionPrivateRoutes'
import { MasterPrivateRoutes } from './MasterPrivateRoutes'
const { PUBLIC_URL } = process.env

const AppRoutes: FC = () => {
	const [threeStyleToken, setThreeStyleToken] = useState<string | null>(null)
	const [masterToken, setMasterToken] = useState<string | null>(null)
	const [gomziNutritionToken, setGomziNutritionToken] = useState<string | null>(null)
	const [adminType, setAdminType] = useState<string | null>(null)
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

	useEffect(() => {
		const three_style_Token = localStorage.getItem('auth_three_style')
		const master_Token = localStorage.getItem('auth_three_style')
		const Gomzi_Nutrition_Token = localStorage.getItem('auth_three_style')
		const admin_Type = localStorage.getItem('admin')

		setThreeStyleToken(three_style_Token)
		setMasterToken(master_Token)
		setGomziNutritionToken(Gomzi_Nutrition_Token)
		setAdminType(admin_Type)

		// Check if the auth_three_style token is available
		if (three_style_Token) {
			setIsAuthenticated(true)
		}
	}, [])

	const getDefaultRoute = () => {	
		if (adminType === 'Gomzi_Nutrition' && gomziNutritionToken) return '/nutrition/dashboard'
		if (adminType === 'Master' && masterToken) return '/master/dashboard'
		if (adminType === 'THREE-STYLE' && threeStyleToken) return '/fgiit/dashboard'
		if (gomziNutritionToken) return '/nutrition/dashboard'
		return '/error/404'
	}

	useEffect(() => {
		redirectDashboard()
		redirectLoginToUrl()
	}, [])

	const redirectLoginToUrl = () => {
		const adminType = localStorage.getItem('admin_type')
		const admin: any = localStorage.getItem('admin')

		// if (admin) {
		// 	localStorage.removeItem('admin')
		// }
		
		const currentUrl = window.location.pathname
		
		const isLoginPage = currentUrl.includes('login')
		
		if (!admin && !isLoginPage) {
			localStorage.setItem('searchedURL', currentUrl)
		}
		
	}
	
	const redirectDashboard = () => {
		const adminType = localStorage.getItem('admin_type')
		const admin = localStorage.getItem('admin')
		
		const currentUrl = window.location.pathname
		
		const extractedText = currentUrl.split('/')[1]
		
		const isLoginPage = currentUrl.includes('login')
		const masterAdminLogin = localStorage.getItem('fg_master')
		
		const searchedURL: any = localStorage.getItem('searchedURL')
		if (admin && searchedURL) {
			window.location.href = searchedURL
			localStorage.removeItem('searchedURL')
		}

		if (admin && !isLoginPage) {
			console.log(1);
			console.log('extractedText :- ', extractedText);
			console.log('admin :- ', admin);
			
			if (
				extractedText === 'fgiit' &&
				admin !== 'THREE-STYLE'
			) {
				localStorage.setItem('admin', 'THREE-STYLE')
				window.location.href = currentUrl
			}
			if (
				extractedText === 'master' &&
				admin !== 'Master' &&
				masterAdminLogin === 'main_master'
			) {
				localStorage.setItem('admin', 'Master')
				window.location.href = currentUrl
			} else if(extractedText === 'master' && masterAdminLogin !== 'main_master') {
				window.location.href = '/fgiit/dashboard'
			}
			if (
				extractedText === 'nutrition' &&
				admin !== 'Gomzi_Nutrition'
			) {
				localStorage.setItem('admin', 'Gomzi_Nutrition')
				window.location.href = currentUrl
			}

			if (currentUrl == '/master/login' && adminType) {
				return (window.location.href = '/master/dashboard')
			}
			if (currentUrl == '/nutrition/login' && adminType && admin == 'Store') {
				return (window.location.href = '/nutrition/dashboard')
			}
			if (currentUrl == '/nutrition/login' && adminType && admin !== 'Store') {
				return (window.location.href = '/fgiit/dashboard')
			}
		}
	}

	return (
		<BrowserRouter basename={PUBLIC_URL}>
			<Routes>
				<Route element={<App />}>
					<Route
						path='logout'
						element={<Logout />}
					/>
					{isAuthenticated ? (
						<>
							{threeStyleToken && adminType === 'THREE-STYLE' ? (
								<>
									<Route
										path='/fgiit/*'
										element={<ThreeStylePrivateRoutes />}
									/>
									<Route
										index
										element={<Navigate to='/fgiit/dashboard' />}
									/>
								</>
							) : null}
							{masterToken && adminType === 'Master' ? (
								<>
									<Route
										path='/master/*'
										element={<MasterPrivateRoutes />}
									/>
									<Route
										path='/fgiit/*'
										element={<ThreeStylePrivateRoutes />}
									/>
									<Route
										index
										element={<Navigate to='/master/dashboard' />}
									/>
								</>
							) : null}
							{gomziNutritionToken && (
								<>
									<Route
										path='/nutrition/*'
										element={<GomziNutritionPrivateRoutes />}
										/>
									<Route
										index
										element={<Navigate to='/nutrition/dashboard' />}
									/>
								</>
							)}
							{
							threeStyleToken ||
							gomziNutritionToken ? (
								<Route
									path='/master/*'
									element={<MasterPrivateRoutes />}
								/>
							) : null}
							<Route
								path='*'
								element={<Navigate to={getDefaultRoute()} />}
							/>
						</>
					) : (
						<>
							<Route
								path='login/*'
								element={<AuthPage />}
							/>
							<Route
								path='*'
								element={<Navigate to='/login' />}
							/>
							<Route
								path='master/login/*'
								element={<MasterAuthPage />}
							/>
							<Route
								path='*'
								element={<Navigate to='/master/login' />}
							/>
							<Route
								path='nutrition/login/*'
								element={<NutritionAuthPage />}
							/>
							<Route
								path='*'
								element={<Navigate to='/nutrition/login' />}
							/>
						</>
					)}
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export { AppRoutes }
