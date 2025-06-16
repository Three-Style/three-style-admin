import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import React from 'react'
import { useLocation } from 'react-router'
import { checkIsActive, WithChildren } from '../../../helpers'

type Props = {
	to: string
	title: string
	Icon?: IconDefinition
	fontIcon?: string
	hasBullet?: boolean
}

const AsideMenuItemWithSub: React.FC<Props & WithChildren> = ({
	children,
	to,
	title,
	Icon,
	fontIcon,
	hasBullet,
}) => {
	const { pathname } = useLocation()
	const isActive = checkIsActive(pathname, to)

	return (
		<div
			className={clsx('menu-item', { 'here show': isActive }, 'menu-accordion')}
			data-kt-menu-trigger='click'>
			<span className='menu-link'>
				{hasBullet && (
					<span className='menu-bullet'>
						<span className='bullet bullet-dot'></span>
					</span>
				)}
				{Icon && (
					<span className='menu-icon'>
						<FontAwesomeIcon
							icon={Icon}
							className='fs-2'
						/>
					</span>
				)}
				{fontIcon && <i className={clsx('bi fs-3', fontIcon)}></i>}
				<span className='menu-title'>{title}</span>
				<span className='menu-arrow'></span>
			</span>
			<div className={clsx('menu-sub menu-sub-accordion', { 'menu-active-bg': isActive })}>
				{children}
			</div>
		</div>
	)
}

export { AsideMenuItemWithSub }
