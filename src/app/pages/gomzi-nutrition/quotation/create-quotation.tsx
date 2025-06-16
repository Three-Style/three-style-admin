import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { DayJS } from '../../../../_metronic/helpers/Utils'
import { PageTitle } from '../../../../_metronic/layout/core'
import InputField from '../../../components/InputField'
import SelectField from '../../../components/SelectField'
import TableButton from '../../../components/TableButton'
// import SignImg from './sigh.png'

const NutritionCreateQuotation: React.FC = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [downloadBtn, setDownloadBtn] = useState(false)
	const [formData, setFormData] = useState({
		date: '',
		name: '',
		branch_name: '',
		billing_address: '',
		mobile: '',
		email: '',
		items: [],
		payment_method: '',
		net_amount: '',
		paid_amount: '',
		note: '',
	})
	const [quotationData, setQuotationData] = useState({
		date: '',
		name: '',
		branch_name: '',
		billing_address: '',
		mobile: '',
		email: '',
		items: [],
		payment_method: '',
		net_amount: '',
		paid_amount: '',
		note: '',
	})
	const [quotationPlanData, setQuotationPlanData] = useState([])

	const [plans, setPlans] = useState([
		{ items: '', quantity: '', amount: '', totalPayment: '', inputField: false },
	])
	const [dueAmount, setDueAmount] = useState('')
	const adminType = localStorage.getItem('admin')

	const handleCreateQuotation = async () => {
		const plansData: any = plans.map((plan: any) => ({
			item_name: plan?.items,
			amount: plan?.amount,
			totalAmount: plan?.totalPayment,
			quantity: plan?.quantity,
		}))

		try {
			setIsSubmitting(true)
			const payload: any = {
				quotation_category: adminType == 'Store' ? adminType : 'Gomzi Nutrition',
				date: DayJS(formData?.date).format('YYYY/MM/DD'),
				name: formData?.name,
				branch_name: formData.branch_name,
				email: formData?.email,
				mobile: formData?.mobile,
				billing_address: { address_line_1: formData?.billing_address },
				payment_method: formData?.payment_method,
				net_amount: Number(formData?.net_amount),
				paid_amount: Number(formData?.paid_amount),
				note: formData?.note,
				items: plansData,
			}

			toast.success('Quotation Created Successfully')

			// setFormData({
			// 	date: '',
			// 	name: '',
			// 	billing_address: '',
			// 	mobile: '',
			// 	email: '',
			// 	items: [],
			// 	payment_method: '',
			// 	net_amount: '',
			// 	paid_amount: '',
			// 	note: '',
			// })
			// setPlans([
			// 	{
			// 		items: '',
			// 		quantity: '',
			// 		amount: '',
			// 		totalPayment: '',
			// 		inputField: false,
			// 	},
			// ])

			setQuotationData(formData)
			setQuotationPlanData(plansData)
			setDownloadBtn(true)

			const due = payload?.net_amount - payload?.paid_amount
			setDueAmount(due.toString())
			setIsSubmitting(false)

			setTimeout(() => {
				generatePDF(formData?.name)
			}, 1000)
		} catch (error: any) {
			toast.error(error.message)
			setIsSubmitting(false)
			console.error(error)
		}
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = event.target
		const updatedFormData = { ...formData, [name]: value }

		setFormData(updatedFormData)

		if (name === 'net_amount' || name === 'paid_amount') {
			const paidAmount = parseInt(updatedFormData.paid_amount) || 0
			const netAmount = parseInt(updatedFormData.net_amount) || 0
			const dueAmount = netAmount - paidAmount
			setDueAmount(dueAmount.toString())
		}
	}

	const calculateTotalPayment = (plans: any) => {
		return plans.reduce((total: any, plan: any) => {
			const quantity = parseFloat(plan.quantity) || 0
			const amount = parseFloat(plan.amount) || 0
			return total + quantity * amount
		}, 0)
	}

	const handlePlanInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		const newPlans: any = [...plans]

		if (name === 'items') {
			if (value === 'Other') {
				newPlans[index].inputField = value === 'Other'
			}
		}
		newPlans[index][name] = value

		// Calculate totalPayment if both quantity and amount are filled
		if (name === 'quantity' || name === 'amount') {
			const quantity = parseFloat(newPlans[index].quantity)
			const amount = parseFloat(newPlans[index].amount)
			newPlans[index].totalPayment = (quantity * amount).toString()
		}

		setPlans(newPlans)

		// Recalculate the totalPayment for the form
		const newTotalPayment = calculateTotalPayment(newPlans)
		setFormData({ ...formData, net_amount: newTotalPayment.toString() })
	}

	const addPlan = (event: any) => {
		event.preventDefault()
		setPlans([
			...plans,
			{ items: '', quantity: '', amount: '', totalPayment: '', inputField: false },
		])
	}

	const removePlan = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		Swal.fire({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'Cancel',
		}).then((result) => {
			if (result.isConfirmed) {
				try {
					const newPlans = [...plans]
					newPlans.splice(index, 1)
					setPlans(newPlans)
					toast.success('Plan Deleted Successfully')

					// Recalculate net_amount after plan deletion
					const newTotalPayment = calculateTotalPayment(newPlans)
					setFormData({ ...formData, net_amount: newTotalPayment.toString() })
				} catch (error: any) {
					toast.error(error.message)
					console.error(error)
				}
			}
		})
	}

	// Separate event handler for textarea
	const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = event.target
		setFormData({ ...formData, [name]: value })
	}

	const generatePDF = async (name: any) => {
		const quotationContent = document.getElementById('quotationContent')

		if (quotationContent) {
			// Temporarily show the quotation content
			// quotationContent.classList.remove('d-none')
			// quotationContent.classList.add('pdf-font-black')

			const doc = new jsPDF({
				orientation: 'portrait',
				unit: 'mm',
				format: 'a4',
			})

			// Add margins
			const margin = 10
			const contentWidth = doc.internal.pageSize.getWidth() - 2 * margin
			const contentHeight = doc.internal.pageSize.getHeight() - 2 * margin

			html2canvas(quotationContent, { scale: 2, useCORS: true }).then((canvas) => {
				const imgData = canvas.toDataURL('image/jpeg', 1)

				// Restore the visibility of the quotation content
				// quotationContent.classList.add('d-none')
				// quotationContent.classList.remove('pdf-font-black')

				doc.addImage(imgData, 'jpeg', margin, margin, contentWidth, contentHeight)

				const pdfName = `${name || 'demoName'}.pdf`
				doc.save(pdfName)
			})
		} else {
			console.error('Quotation content not found.')
		}
	}

	return (
		<>
			<PageTitle breadcrumbs={[]}>Quotation</PageTitle>

			{/* <h1 className='fw-bold text-dark fs-1 mb-6 '>Create Quotation</h1> */}
			<div className='row'>
				<div className='col-md-12 mt-3'>
					<div className='card'>
						<div className='card-body'>
							<p className='fw-bold fs-2 mb-4'>Create Quotation</p>
							<form>
								<div className='row'>
									<div className='col-12 row'>
										{' '}
										<InputField
											className='col-md-6 fv-row'
											label='Date'
											placeholder="Date'"
											type='date'
											name='date'
											htmlFor='date'
											value={formData?.date}
											onChange={handleInputChange}
										/>{' '}
										<SelectField
											className='col-md-6 fv-row mb-7'
											label='Branch Name'
											name='branch_name'
											value={formData.branch_name}
											onChange={handleInputChange}
											htmlFor='txt_company'
											options={['Adajan', 'Katargam']}
										/>
										<InputField
											className='col-md-3 fv-row'
											label='Full Name'
											placeholder='Enter Full Name'
											type='text'
											name='name'
											htmlFor='name'
											value={formData?.name}
											onChange={handleInputChange}
										/>{' '}
										<InputField
											className='col-md-3 fv-row'
											label='Address'
											placeholder='Enter Address'
											type='text'
											name='billing_address'
											htmlFor='billing_address'
											value={formData?.billing_address}
											onChange={handleInputChange}
										/>{' '}
										<InputField
											className='col-md-3 fv-row'
											label='Phone No.'
											placeholder='Enter Phone No.'
											type='text'
											name='mobile'
											htmlFor='mobile'
											value={formData?.mobile}
											onChange={handleInputChange}
										/>{' '}
										<InputField
											className='col-md-3 fv-row'
											label='Email'
											placeholder='Enter Email'
											type='email'
											name='email'
											htmlFor='email'
											value={formData?.email}
											onChange={handleInputChange}
										/>
									</div>

									<h1 className='mb-4'>Supplements:</h1>
									{plans.map((plan, index) => (
										<div
											key={index}
											className='col-12 mb-5'>
											<div
												className='row'
												style={{
													border: '1px solid #00000008',
													borderRadius: '10px',
													backgroundColor: '#00000008',
												}}>
												<div className='col-11 row py-5 pb-0'>
													{plan.inputField ? (
														<>
															<InputField
																className='col-md-3 fv-row'
																label='Product Name'
																placeholder='Enter Product Name'
																type='text'
																name='items'
																htmlFor='items'
																value={plan.items == 'Other' ? '' : plan.items}
																onChange={(e: any) => handlePlanInputChange(index, e)}
															/>
														</>
													) : (
														<SelectField
															className='col-md-3 fv-row mb-7'
															label='Product Name'
															name='items'
															value={plan.items}
															onChange={(e: any) => handlePlanInputChange(index, e)}
															htmlFor='txt_company'
															options={[
																'Whey Protein 1Kg',
																'WHEY PROTEIN 2KG',
																'Mass Gainer Powder 1kg',
																'Mass Gainer Powder 2kg',
																'Whey Protein Blend 100% - 1Kg',
																'Whey Protein Concentrate - 1Kg',
																'Whey Protein Isolate 100% - 1Kg',
																'Pre-workout - 250g',
																'Spark EAA - 250g',
																'ATP Creatine - 250g',
																'Muscle Build Combo',
																'Fat Loss Combo',
																'All Trial Pouch',
																'Bowlease Powder',
																'Sugarguard Powder',
																'Ayurease Gastric Powder',
																'Vitamin B12 Powder',
																'SlimAyur Fat Loss Powder',
																'Ayurstrength Powder',
																'Sample Pouch Combo',
																'Other',
															]}
														/>
													)}
													<InputField
														className='col-md-3 fv-row'
														label='Quantity'
														placeholder='Enter Quantity'
														type='text'
														name='quantity'
														htmlFor='quantity'
														value={plan?.quantity}
														onChange={(e: any) => handlePlanInputChange(index, e)}
													/>{' '}
													<InputField
														className='col-md-3 fv-row'
														label='Amount'
														placeholder='Enter Amount'
														type='text'
														name='amount'
														htmlFor='amount'
														value={plan?.amount}
														onChange={(e: any) => handlePlanInputChange(index, e)}
													/>{' '}
													<InputField
														className='col-md-3 fv-row'
														label='Total'
														placeholder='Total'
														type='text'
														name='totalPayment'
														htmlFor='totalPayment'
														value={plan?.totalPayment}
														disabled
													/>
												</div>
												<div className='col-1'>
													<div className='mt-17 d-flex justify-content-end'>
														<TableButton
															action='remove'
															backgroundDark={true}
															onClick={(e) => removePlan(index, e)}
														/>
													</div>
												</div>
											</div>
										</div>
									))}

									<div className='col-12 my-3 d-flex justify-content-end'>
										<button
											className='btn-primary btn gap-2 mx-2 btn-sm me-1'
											onClick={(e) => addPlan(e)}>
											Add
										</button>
									</div>

									<div className='col-12 row'>
										{' '}
										<InputField
											className='col-md-3 fv-row'
											label='Total Amount'
											placeholder='Enter Total Amount'
											type='text'
											name='net_amount'
											htmlFor='net_amount'
											value={formData?.net_amount}
											onChange={handleInputChange}
										/>{' '}
									</div>
									<div className='col-md-12 fv-row mb-7'>
										<div className='d-flex justify-content-end'>
											{downloadBtn ? (
												<button
													type='button'
													className='btn btn-success mb-4 me-3'
													onClick={() => generatePDF(quotationData?.name)}>
													Download Quotation
												</button>
											) : (
												''
											)}
											<button
												type='button'
												className={`btn btn-primary btn-block mb-4 ${
													isSubmitting ? 'disabled' : ''
												}`}
												onClick={handleCreateQuotation}
												disabled={isSubmitting}>
												{isSubmitting ? 'Please wait, creating quotation...' : 'Create Quotation'}
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			<div
				className='col-md-6 mt-3'
				id='quotationContent'>
				<div className='card'>
					<div className='card-body'>
						<div>
							<p className='fw-bold fs-5 text-center mb-2'>QUOTATION</p>
							<div className='border border-black'>
								<div className='invoice-header row mt-2 p-3 align-items-start'>
									<div className='col-md-8'>
										<p className='fs-4 mb-1'>
											<b>{adminType == 'Store' ? 'GOMZI NUTRITION ' : 'Gomzi Lifesciences LLP'}</b>
										</p>
										{formData.branch_name == 'Adajan' ? (
											<>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1 mb-1'>
													{adminType == 'Store'
														? 'G-23-TIME SQUARE, Gaurav Path Road, TP 10 Main Rd, Surat, Gujarat, Opp. Shree Bharti Residency, Surat, Gujarat 394510'
														: '547,548, FIRST FLOOR, RJD TEXTILES PARK, Hazira Rd, Ichchhapor, PAL, Surat, Gujarat 394510'}
												</p>
											</>
										) : formData.branch_name == 'Katargam' ? (
											<>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1 mb-1'>
													{adminType == 'Store'
														? 'G-23-TIME SQUARE, Gaurav Path Road, TP 10 Main Rd, Surat, Gujarat, Opp. Shree Bharti Residency, Surat, Gujarat 394510'
														: "323 3'rd floor, Laxmi Enclave-1, opp. Gajera School, Chitrakut Society, Katargam, Surat, Gujarat 395004"}
												</p>
											</>
										) : (
											<>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1 mb-1'>
													Address:
												</p>
											</>
										)}
										<p
											style={{ fontSize: '12px' }}
											className='mb-1'>
											Phone no.:
											<strong>
												{adminType == 'Store' ? '8866465275 / 9081091068' : '8320077993'}
											</strong>
										</p>
										<p
											style={{ fontSize: '12px' }}
											className='mb-1'>
											Email:
											<strong id='emailLabel'>
												{adminType == 'Store'
													? 'gomzinutrition.palshop@gmail.com'
													: 'Sales@Gomzilifesciences.In'}
											</strong>
										</p>
										<p
											style={{ fontSize: '12px' }}
											className='mb-1'>
											GSTIN:
											<strong>{adminType == 'Store' ? '-' : '24ABBFG3336P1Z9'}</strong>
											{adminType == 'Store' ? '' : ' , State: Gujarat'}
										</p>
									</div>
									<div className='col-md-4'>
										<div className='text-center'>
											<img
												src='/media/logos/gomzi-nutrition.png'
												width='60%'
												alt='Company Logo'
											/>
										</div>
									</div>
								</div>
								<div className='invoice-details d-flex'>
									<div className='col-md-5 border border-black px-0'>
										<div className='quotation-bill-to border-bottom border-black'>Bill To</div>
										<strong>
											<p
												className='mt-2 px-2'
												style={{ fontSize: '14px' }}
												id='inv-name'>
												{quotationData.name || '-'}
											</p>
										</strong>
										<strong>
											<p
												className='px-2'
												style={{ fontSize: '14px' }}
												id='inv-email'>
												{quotationData.email || '-'}
											</p>
										</strong>
									</div>
									<div className='col-md-7 border border-black text-right'>
										<div className='bill-name-date px-2'>
											<p className=''>
												<strong>Date :-</strong>
												<span id='inv-date'>{quotationData.date || '-'}</span>
											</p>
											<p className=''>
												<strong>Phone No. :-</strong>
												<span id='inv-mobile'>{quotationData.mobile || '-'}</span>
											</p>
											<p className=''>
												<strong>Address :-</strong>
												<span id='inv-address'>{quotationData.billing_address || '-'}</span>
											</p>
										</div>
									</div>
								</div>
								<div className='invoice-items quotation-items'>
									<table className='border border-black'>
										<thead>
											<tr>
												<th className='border border-black'>Product</th>
												<th className='border border-black'>Quantity</th>
												<th className='border border-black'>Amount</th>
												<th className='border border-black'>Total</th>
											</tr>
										</thead>
										<tbody>
											{quotationPlanData.length == 0 ? (
												<tr>
													<td className='border border-black'>
														<div id='inv-product'>-</div>
													</td>
													<td className='border border-black'>
														<span className='inv-paid'>-</span>
													</td>
													<td className='border border-black'>
														<span className='inv-total'>-</span>
													</td>
													<td className='border border-black'>
														<span className='inv-total'>-</span>
													</td>
												</tr>
											) : (
												quotationPlanData.map((item: any, index: any) => {
													return (
														<tr>
															<td>
																<div id='inv-product'>{item.item_name}</div>
															</td>
															<td>
																<span className='inv-paid'>{item.quantity || '-'}</span>
															</td>
															<td>
																<span className='inv-total'>{item.amount || '-'}</span>
															</td>
															<td>
																<span className='inv-total'>
																	{item.totalAmount ? item.totalAmount : '-'}
																</span>
															</td>
														</tr>
													)
												})
											)}
										</tbody>
									</table>
								</div>
								<div className='invoice-details d-flex'>
									<div className='col-md-12 border border-black px-0'>
										<div className='quotation-bill-to px-2 border-bottom border-black'>Amount :-</div>
										<div className='bill-name-date px-2'>
											<p className=''>
												<strong>Total Amount :-</strong>
												<span className='inv-total'> {quotationData.net_amount || '-'}</span>
											</p>
										</div>
									</div>
								</div>
								<div className='invoice-details d-flex'>
									<div className='col-md-7 border border-black px-0'>
										<div className='quotation-bill-to px-2 border-bottom border-black'>
											Terms and Conditions :-
										</div>
										<div className='px-2'>
											<p
												style={{ fontSize: '13px' }}
												className='mt-1'>
												<strong>*</strong> GST will be applicable additionally on all payments.
											</p>
											<p style={{ fontSize: '13px' }}>
												<strong>*</strong> Courier charges will be borne by the customer additionally.
											</p>
											<p style={{ fontSize: '13px' }}>
												<strong>*</strong> Payment made is non-refundable, non-transferable, and non-cancellable.
											</p>
											<p style={{ fontSize: '13px' }}>
												<strong>*</strong> 70% advance payment is required to confirm the order, and the balance 30% payment is due upon delivery, which will be verified through a video shared with the customer.
											</p>
										</div>
									</div>
									<div className='col-md-5 border border-black px-0'>
										<div className='quotation-bill-to px-2 border-bottom border-black'>Administrator :-</div>
										<div className='px-2'>
											<img
												src={
													adminType == 'Store'
														? '/media/sign/chirag.png'
														: '/media/sign/goutam_sir.png'
												}
												alt='sign'
												width='100%'
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default NutritionCreateQuotation
