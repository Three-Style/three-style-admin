import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { endOfMonth, startOfMonth, subDays } from 'date-fns'
import React, { useEffect, useRef, useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

type DateRange = [Date, Date]

type DateFilterProps = {
	onDateRangeChange: (dateRange: DateRange | null) => void
	leftValue?: string
	setMonth?: boolean
	lastMonth?: boolean
}

const DateFilter: React.FC<DateFilterProps> = ({
	onDateRangeChange,
	leftValue,
	setMonth,
	lastMonth,
}) => {
	// Set default to current month's start and end
	let defaultRange: DateRange
	lastMonth
		? (defaultRange = [
				startOfMonth(subDays(new Date(), new Date().getDate())),
				endOfMonth(subDays(new Date(), new Date().getDate())),
		  ])
		: (defaultRange = [startOfMonth(new Date()), endOfMonth(new Date())])
	const [showDatePicker, setShowDatePicker] = useState(false)
	const [selectedRange, setSelectedRange] = useState<DateRange>(defaultRange)
	const [tempRange, setTempRange] = useState<DateRange | null>(null)
	const datePickerRef = useRef<HTMLDivElement>(null)

	// Predefined ranges (optional)
	const predefinedRanges = [
		{
			label: 'Today',
			range: {
				startDate: new Date(),
				endDate: new Date(),
				key: 'selection',
			},
		},
		{
			label: 'Yesterday',
			range: {
				startDate: subDays(new Date(), 1),
				endDate: subDays(new Date(), 1),
				key: 'selection',
			},
		},
	]

	// Format date range for input display
	const formatDateRange = (range: DateRange | null): string => {
		if (!range || !range[0] || !range[1]) return 'Select Date'
		const start = range[0].toLocaleDateString()
		const end = range[1].toLocaleDateString()
		return `${start} - ${end}`
	}

	// Handle selection of date range
	const handleSelectRange = (range: any) => {
		setSelectedRange([range.startDate, range.endDate])
		onDateRangeChange([range.startDate, range.endDate])
		setShowDatePicker(false)
	}

	// Handle date range change from the picker
	const handleDateRangeChange = (ranges: any) => {
		const { selection } = ranges
		if (selection) {
			const startDate = selection.startDate
			const endDate = selection.endDate
			setTempRange([startDate, endDate])
			if (startDate && endDate && startDate !== endDate) {
				setSelectedRange([startDate, endDate])
				onDateRangeChange([startDate, endDate])
				setShowDatePicker(false)
			}
		} else {
			setSelectedRange(defaultRange)
			onDateRangeChange(defaultRange)
			setShowDatePicker(false)
		}
	}

	// Toggle date picker visibility
	const toggleDatePicker = () => {
		setShowDatePicker((prev) => !prev)
	}

	// Close picker if clicked outside
	const handleClickOutside = (event: MouseEvent) => {
		if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
			setShowDatePicker(false)
		}
	}

	useEffect(() => {
		// Set up click outside handler
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const storedStringifyDateRange: any = localStorage.getItem('selectedDateRange')
	const storedDateRange: any = JSON.parse(storedStringifyDateRange)
	useEffect(() => {
		if (storedDateRange) {
			const startDate = new Date(storedDateRange.from)
			const endDate = new Date(storedDateRange.to)

			setSelectedRange([startDate, endDate])
		}
	}, [storedDateRange])

	return (
		<div
			ref={datePickerRef}
			style={{ position: 'relative' }}>
			<div
				role='button'
				onClick={toggleDatePicker}
				style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
				<input
					className='form-control'
					style={{ paddingRight: '2.5rem' }}
					readOnly
					placeholder='Select Date'
					value={formatDateRange(selectedRange)} // Show default or selected date range
				/>
				<FontAwesomeIcon
					icon={faCalendarDays}
					style={{
						position: 'absolute',
						right: '0.75rem',
						pointerEvents: 'none',
						color: '#999',
					}}
				/>
			</div>
			{showDatePicker && (
				<div
					style={{
						position: 'absolute',
						top: 'calc(100% + 5px)',
						left: `${leftValue ? leftValue : '-500px'}`,
						zIndex: 1000,
						backgroundColor: 'white',
						boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
						maxWidth: '500%',
						overflowX: 'auto',
					}}>
					<DateRangePicker
						ranges={[
							{
								startDate: tempRange ? tempRange[0] : defaultRange[0],
								endDate: tempRange ? tempRange[1] : defaultRange[1],
								key: 'selection',
							},
						]}
						onChange={handleDateRangeChange}
						months={2}
						direction='horizontal'
					/>
				</div>
			)}
		</div>
	)
}

export default DateFilter
