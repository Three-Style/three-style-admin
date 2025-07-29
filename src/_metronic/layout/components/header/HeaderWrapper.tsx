import clsx from 'clsx'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'
import { useLayout } from '../../core'
import { HeaderToolbar } from './HeaderToolbar'

export function HeaderWrapper() {
	const { config, classes, attributes } = useLayout()
	const { aside } = config
	const location = useLocation()
	const routesToCloseSidebar = [
		'/three-style/all-order',
		'/three-style/contact-inquiry/contact-inquiry-view',
	]

	const shouldCloseSidebar = routesToCloseSidebar.includes(location.pathname)

	useEffect(() => {
		const asideToggle = document.getElementById('kt_aside_toggle')
		if (asideToggle) {
			const body = document.body
			const isActive = body.classList.contains('aside-minimize')

			if (shouldCloseSidebar && !isActive) {
				asideToggle.click()
			} else if (!shouldCloseSidebar && isActive) {
				asideToggle.click()
			}
		}
	}, [shouldCloseSidebar])

	return (
		<div
			id='kt_header'
			className={clsx('header', classes.header.join(' '), 'align-items-stretch')}
			{...attributes.headerMenu}>
			{/* begin::Brand */}
			<div className='header-brand'>
				{/* begin::Logo */}
				<div className='d-flex align-items-center'>
					<div>
						<img
							alt='Logo'
							src={toAbsoluteUrl('/media/logos/fwg-logo.png')}
							className='h-25px h-lg-45px'
						/>
					</div>
					<div>
						<h3
							style={{ marginLeft: '15px', marginTop: '10px' }}
							className='text-white'>
							FG Group
							{process.env.REACT_APP_NODE_ENV === 'development' && (
								<span className='badge badge-light-warning fs-8 m-2'>Test</span>
							)}
							{process.env.REACT_APP_NODE_ENV === 'production' && (
								<span className='badge badge-light-success fs-8 m-1'>
									Live <i className='fa-solid fa-2xs fa-circle fa-fade text-success ms-1'></i>
								</span>
							)}
						</h3>
					</div>
				</div>
				{/* end::Logo */}

				{aside.minimize && (
					<div
						id='kt_aside_toggle'
						className='btn btn-icon w-auto px-0 btn-active-color-primary aside-minimize'
						data-kt-toggle='true'
						data-kt-toggle-state='active'
						data-kt-toggle-target='body'
						data-kt-toggle-name='aside-minimize'>
						<KTIcon
							iconName='exit-left'
							className='fs-1 me-n1 minimize-default'
						/>
						<KTIcon
							iconName='entrance-left'
							className='fs-1 minimize-active'
						/>
					</div>
				)}

				{/* begin::Aside toggle */}
				<div
					className='d-flex align-items-center d-lg-none ms-n3 me-1'
					title='Show aside menu'>
					<div
						className='btn btn-icon btn-active-color-primary w-30px h-30px'
						id='kt_aside_mobile_toggle'>
						<KTIcon
							iconName='abstract-14'
							className='fs-1'
						/>
					</div>
				</div>
				{/* end::Aside toggle */}
			</div>
			{/* end::Brand */}
			<HeaderToolbar />
		</div>
	)
}
