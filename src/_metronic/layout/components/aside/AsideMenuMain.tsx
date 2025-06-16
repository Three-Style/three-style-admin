/* eslint-disable react/jsx-no-target-blank */
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import { FGIITAsideMenuItems } from './components/FGIITAsideMenuItems'
import { GomziNutritionAsideMenuItems } from './components/GomziNutritionAsideMenuItems'
import { MasterAsideMenuItems } from './components/MasterAsideMenuItems'

export function AsideMenuMain() {
	const [portalAdminType, setPortalAdminType] = useState('')
	const [adminType, setAdminType] = useState('')
	const location = useLocation()

	useEffect(() => {
		const portalAdminType = localStorage.getItem('fwg_portal')
		const storedAdminType = localStorage.getItem('admin')
		if (portalAdminType) {
			setPortalAdminType(portalAdminType)
		}
		if (storedAdminType) {
			setAdminType(storedAdminType)
		}
	}, [])

	useEffect(() => {
		const pathSegments = location.pathname.split('/')
		const firstSegment = pathSegments[1]
	}, [location])

	return (
		<>
			{adminType === 'FGIIT' && <FGIITAsideMenuItems />}
			{adminType === 'Master' && <MasterAsideMenuItems />}
			{adminType === 'Gomzi_Nutrition' && <GomziNutritionAsideMenuItems />}
		</>
	)
}
