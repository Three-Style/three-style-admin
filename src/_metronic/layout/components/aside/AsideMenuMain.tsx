/* eslint-disable react/jsx-no-target-blank */
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ThreeStyleAsideMenuItems } from './components/ThreeStyleAsideMenuItems'
import { MasterAsideMenuItems } from './components/MasterAsideMenuItems'

export function AsideMenuMain() {
	const [adminType, setAdminType] = useState('')
	const location = useLocation()

	useEffect(() => {
		const storedAdminType = localStorage.getItem('admin')
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
			{adminType === 'THREE-STYLE' && <ThreeStyleAsideMenuItems />}
			{adminType === 'Master' && <MasterAsideMenuItems />}
		</>
	)
}
