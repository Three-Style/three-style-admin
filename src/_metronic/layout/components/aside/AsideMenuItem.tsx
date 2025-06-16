import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { FC } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { checkIsActive, WithChildren } from '../../../helpers'

type Props = {
	to: string
	title: string
	Icon?: IconDefinition
	fontIcon?: string
	hasBullet?: boolean
}

const AsideMenuItem: FC<Props & WithChildren> = ({
	children,
	to,
	title,
	Icon,
	fontIcon,
	hasBullet = false,
}) => {
	const { pathname } = useLocation()
	const isActive = checkIsActive(pathname, to)

	return (
		<div className='menu-item'>
			<Link
				className={clsx('menu-link without-sub', { active: isActive })}
				to={to}>
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
			</Link>
			{children}
		</div>
	)
}

export { AsideMenuItem }
