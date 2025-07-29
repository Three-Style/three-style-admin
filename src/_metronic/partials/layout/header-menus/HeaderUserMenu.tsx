/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../helpers'

const HeaderUserMenu: FC = () => {
	const navigate = useNavigate()
	const [userProfile, setUserProfile] = useState<any>(null)
	const [adminType, setAdminType] = useState('')
	const [portalAdminType, setPortalAdminType] = useState('')

	const logout = () => {
		localStorage.clear()
		window.location.href = '/login'
		// navigate('/login')
	}

	const masterLogout = () => {
		localStorage.clear()
		window.location.href = '/master/login'
	}

	useEffect(() => {
		const adminData: any = localStorage.getItem('fg_group_info')
		const storedAdminType = localStorage.getItem('admin')

		if (adminData) {
			setUserProfile(JSON.parse(adminData))
		}
		if (storedAdminType) {
			setAdminType(storedAdminType)
		}
	}, [])

	return (
		<div
			className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
			data-kt-menu='true'
			data-popper-placement='bottom-start'>
			<div className='menu-item px-3'>
				<div className='menu-content d-flex align-items-center px-3'>
					<div className='symbol symbol-50px me-5'>
						<img
							alt='Logo'
							src={toAbsoluteUrl('/media/avatars/300-1.jpg')}
						/>
					</div>

					<div className='d-flex flex-column'>
						<div className='fw-bolder d-flex align-items-center fs-5'>
							{userProfile?.full_name}
							<span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>
								{userProfile?.type}
							</span>
						</div>
						<p className='fw-bold text-muted text-hover-primary fs-7 mb-0'>{userProfile?.email}</p>
					</div>
				</div>
			</div>

			<div className='separator my-2'></div>

			{adminType == 'Master' ? (
				<div className='menu-item px-5'>
					<button
						onClick={masterLogout}
						className='menu-link px-5 btn'>
						Logout
					</button>
				</div>
			) : (
				<>
					<div className='menu-item px-5'>
						<Link
							to={'/three-style/admin-user/admin-profile'}
							className='menu-link px-5'>
							My Profile
						</Link>
					</div>
					<div className='menu-item px-5'>
						<button
							onClick={logout}
							className='menu-link px-5 btn'>
							Logout
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export { HeaderUserMenu }
