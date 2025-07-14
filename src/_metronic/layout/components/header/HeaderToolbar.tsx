/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import { toAbsoluteUrl } from '../../../helpers'
import { useLayout } from '../../core'
import { DefaultTitle } from './page-title/DefaultTitle'

const HeaderToolbar = () => {
	const { classes } = useLayout()
	const [selectedLogo, setSelectedLogo] = useState('')
	const [adminType, setAdminType] = useState('')
	const [masterShow, setMasterShow] = useState(false)
	const [fwgSubAdminShow, setFwgSubAdminShow] = useState('')

	useEffect(() => {
		const storedAdmin = localStorage.getItem('admin')
		const storedAdminType = localStorage.getItem('admin_type')
		const masterAdminLogin = localStorage.getItem('fg_master')
		const portalAdminLogin = localStorage.getItem('fwg_portal')
		if (masterAdminLogin === 'main_master') {
			setMasterShow(true)
		}
		if (portalAdminLogin === 'fwg_portal') {
			setFwgSubAdminShow(portalAdminLogin)
			setSelectedLogo('/media/logos/fintess-with-gomzi-logo.png')
		}
		if (storedAdmin) {
			if (storedAdmin === 'FGIIT') {
				setSelectedLogo('/media/logos/fgiit-logo.png')
			} else if (storedAdmin === 'Master') {
				setSelectedLogo('/media/logos/fwg-logo.png')
			} else if (storedAdmin === 'Gomzi_Nutrition') {
				setSelectedLogo('/media/logos/gomzi-nutrition.png')
			}
		}
		if (storedAdminType) {
			setAdminType(storedAdminType)
		}
		if (storedAdmin) {
			setAdminType(storedAdmin)
		}
	}, [])

	const handleSelection = (logo: string, value: string) => {
		setSelectedLogo(logo)
		localStorage.setItem('admin', value)

		if (value === 'FGIIT') {
			window.location.href = '/fgiit/dashboard'
		} else if (value === 'Master') {
			window.location.href = '/master/dashboard'
		} else if (value === 'Gomzi_Nutrition') {
			window.location.href = '/nutrition/dashboard'
		}
	}

	useEffect(() => {
		const rangeSlider = document.querySelector('#kt_toolbar_slider')
		const rangeSliderValueElement = document.querySelector('#kt_toolbar_slider_value')

		if (!rangeSlider || !rangeSliderValueElement) {
			return
		}

		const handle = rangeSlider.querySelector('.noUi-handle')
		if (handle) {
			handle.setAttribute('tabindex', '0')
		}
	}, [])

	return (
		<div className='toolbar d-flex align-items-stretch'>
			{/* begin::Toolbar container */}
			<div
				className={`${classes.headerContainer.join(
					' '
				)} py-6 py-lg-0 d-flex flex-row align-items-lg-stretch justify-content-between`}>
				<DefaultTitle />
				<div className='d-flex align-items-stretch pt-3 pt-lg-0'>
					{/* begin::Action wrapper */}
					{/* <div className='d-flex align-items-center'>
						<div className='bullet bg-secondary h-35px w-1px mx-5'></div>
					</div> */}
					{/* end::Action wrapper */}

					{/* begin::Action wrapper */}
					{/* <div className='d-flex align-items-center'>
						<span className='fs-7 text-gray-700 fw-bolder pe-3 d-none d-xxl-block'>Theme:</span>

						<div className='d-flex'>
							<div className='d-flex align-items-center'>
								<ThemeModeSwitcher toggleBtnClass='btn btn-sm btn-icon btn-icon-muted btn-active-icon-primary' />
							</div>
						</div>
					</div> */}

					<div className='d-flex align-items-center'>
						<div className='bullet bg-secondary h-35px w-1px mx-5'></div>

						<div className='d-flex align-items-center'>
							{adminType !== 'Employee' &&
							adminType !== 'Vesu-Master' &&
							adminType !== 'Store' &&
							fwgSubAdminShow !== 'fwg_portal' &&
							adminType !== 'Trainer' ? (
								<a
									href='#'
									className='btn btn-icon btn-sm btn-icon-muted btn-active-icon-primary'
									data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
									data-kt-menu-attach='parent'
									data-kt-menu-placement='bottom-end'>
									<img
										src={toAbsoluteUrl(selectedLogo)}
										alt=''
										style={{
											width: '100%',
										}}
									/>
								</a>
							) : (
								''
							)}
							{adminType !== 'Employee' &&
							adminType !== 'Vesu-Master' &&
							adminType !== 'Store' &&
							fwgSubAdminShow !== 'fwg_portal' &&
							adminType !== 'Trainer' ? (
								<div
									className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-175px'
									data-kt-menu='true'>
									{masterShow ? (
										<div className='menu-item my-0'>
											<a
												href='#'
												className='menu-link'
												onClick={() =>
													handleSelection('/media/logos/fintess-with-gomzi-logo.png', 'Master')
												}>
												<span className='menu-title'>Master</span>
											</a>
										</div>
									) : null}
									<div className='menu-item my-0'>
										<a
											href='#'
											className='menu-link'
											onClick={() => handleSelection('/media/logos/fgiit-logo.png', 'FGIIT')}>
											<span className='menu-title'>FGIIT</span>
										</a>
									</div>
									<div className='menu-item my-0'>
										<a
											href='#'
											className='menu-link'
											onClick={() =>
												handleSelection('/media/logos/gomzi-nutrition.png', 'Gomzi_Nutrition')
											}>
											<span className='menu-title'>Three Style</span>
										</a>
									</div>
									{/* <div className='menu-item my-0'>
										<a
											href='#'
											className='menu-link'
											onClick={() =>
												handleSelection(
													'/media/logos/gomzi-nutrition.png',
													'Gomzi_Nutrition_trainer'
												)
											}>
											<span className='menu-title'>Three Style Trainer</span>
										</a>
									</div> */}
								</div>
							) : (
								<>
									<a
										href='#'
										className='btn btn-icon btn-sm btn-icon-muted btn-active-icon-primary'
										data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
										data-kt-menu-attach='parent'
										data-kt-menu-placement='bottom-end'>
										<img
											src={toAbsoluteUrl(selectedLogo)}
											alt=''
											style={{
												width: '100%',
											}}
										/>
									</a>
									<div className='menu-item my-0'>
										<a
											href='#'
											className='menu-link px-0 py-0'
											onClick={() =>
												handleSelection('/media/logos/fintess-with-gomzi-logo.png', 'Employee')
											}></a>
									</div>
								</>
							)}
						</div>
					</div>
					{/* end::Action wrapper */}
				</div>
			</div>
			{/* end::Toolbar container */}
		</div>
	)
}

export { HeaderToolbar }
