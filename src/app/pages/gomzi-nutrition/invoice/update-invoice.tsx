import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { DayJS } from '../../../../_metronic/helpers/Utils'
import { PageTitle } from '../../../../_metronic/layout/core'
import InputField from '../../../components/InputField'
import SelectField from '../../../components/SelectField'
import TableButton from '../../../components/TableButton'
import TextareaField from '../../../components/TextareaField'
import { getInvoice, updateInvoice } from '../../../Functions/FGGroup'

const NutritionUpdateInvoice: React.FC = () => {
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const invoice_id: string | null = searchParams.get('invoice_id')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [formData, setFormData] = useState<any>({
		invoice_number: '',
		date: '',
		name: '',
		billing_address: '',
		mobile: '',
		email: '',
		items: [
			{
				item_name: '',
				amount: '',
				totalAmount: '',
				quantity: '',
				delete: false,
				inputField: false,
			},
		],
		payment_method: '',
		net_amount: '',
		paid_amount: '',
		note: '',
	})
	const [invoiceData, setInvoiceData] = useState<any>({
		invoice_number: '',
		date: '',
		name: '',
		billing_address: '',
		mobile: '',
		email: '',
		items: [],
		payment_method: '',
		net_amount: '',
		paid_amount: '',
		note: '',
	})
	const [dueAmount, setDueAmount] = useState('')
	const adminType = localStorage.getItem('admin')
	const predefinedOptions = [
		'All plan',
		'Marketing Guru',
		'Portfolio management service',
		'Management Consultation',
		'Business management course',
		'Digital marketing course',
		'Stock market course',
		'Content shoot & Edit',
		'Graphics designing',
		'Social Media marketing',
		'Website designing and development',
		'Paid Advertisement',
		'Content writing',
		'SEO- Search engine optimization',
		'SEM- Search engine management',
		'GMB- Google my business profile maintain',
		'ERP setup and service',
		'Business solution',
		'Logo design',
	]

	const fetchInvoiceData = async () => {
		try {
			const response: any = await getInvoice({ id: String(invoice_id) })
			const data = response.data[0]
			const predefinedOptions = [
				'All plan',
				'Marketing Guru',
				'Portfolio management service',
				'Management Consultation',
				'Business management course',
				'Digital marketing course',
				'Stock market course',
				'Content shoot & Edit',
				'Graphics designing',
				'Social Media marketing',
				'Website designing and development',
				'Paid Advertisement',
				'Content writing',
				'SEO- Search engine optimization',
				'SEM- Search engine management',
				'GMB- Google my business profile maintain',
				'ERP setup and service',
				'Business solution',
				'Logo design',
			]

			const plansData = data.items.map((plan: any) => ({
				_id: plan?._id,
				item_name: plan?.item_name,
				amount: plan?.amount,
				totalAmount: plan?.totalAmount,
				quantity: plan?.quantity,
				inputField: !predefinedOptions.includes(plan.item_name),
			}))

			const setData = {
				invoice_number: data?.invoice_number,
				date: DayJS(data?.date).format('YYYY-MM-DD'),
				name: data?.name,
				billing_address: data?.billing_address?.address_line_1 || '',
				mobile: data?.mobile,
				email: data?.email,
				items: plansData,
				payment_method: data?.payment_method,
				net_amount: data?.net_amount,
				paid_amount: data?.paid_amount,
				note: data?.note,
			}
			setInvoiceData(setData)

			const due = data?.net_amount - data?.paid_amount
			setDueAmount(due.toString())
			setFormData(setData)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchInvoiceData()
	}, [])

	const handleUpdateInvoice = async () => {
		const plansData = formData.items.map((plan: any) => ({
			_id: plan?._id,
			item_name: plan?.item_name,
			amount: plan?.amount,
			totalAmount: plan?.totalAmount,
			quantity: plan?.quantity,
			delete: plan?.delete,
		}))

		try {
			setIsSubmitting(true)
			const payload: any = {
				id: invoice_id,
				invoice_number: Number(formData?.invoice_number),
				date: DayJS(formData?.date).format('YYYY/MM/DD'),
				name: formData?.name,
				email: formData?.email,
				mobile: formData?.mobile,
				billing_address: {
					address_line_1: formData?.billing_address || '',
				},
				payment_method: formData?.payment_method,
				net_amount: Number(formData?.net_amount),
				paid_amount: parseInt(formData?.paid_amount),
				note: formData?.note,
				items: plansData,
			}
			await updateInvoice(payload)
			toast.success('Invoice Updated Successfully')
			const due = payload?.net_amount - payload?.paid_amount
			setDueAmount(due.toString())

			fetchInvoiceData()
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

	const generatePDF = (name: any) => {
		const invoiceContent = document.getElementById('invoiceContent')
		const invoiceTermAndCondition = document.getElementById('invoiceTermAndCondition')

		if (invoiceContent && invoiceTermAndCondition) {
			invoiceContent.classList.add('pdf-font-black')
			invoiceTermAndCondition.classList.add('pdf-font-black')

			const doc = new jsPDF({
				orientation: 'portrait',
				unit: 'mm',
				format: 'a4',
			})

			const margin = 10
			const contentWidth = doc.internal.pageSize.getWidth() - 2 * margin
			const contentHeight = doc.internal.pageSize.getHeight() - 2 * margin

			Promise.all([
				html2canvas(invoiceContent, { scale: 2, useCORS: true }),
				html2canvas(invoiceTermAndCondition, { scale: 2, useCORS: true }),
			]).then(([invoiceCanvas, termsCanvas]) => {
				const invoiceImg = invoiceCanvas.toDataURL('image/jpeg', 1)
				const termsImg = termsCanvas.toDataURL('image/jpeg', 1)

				invoiceContent.classList.remove('pdf-font-black')
				invoiceTermAndCondition.classList.remove('pdf-font-black')

				// Page 1 - Invoice
				doc.addImage(invoiceImg, 'JPEG', margin, margin, contentWidth, contentHeight)

				// Page 2 - Terms and Conditions
				doc.addPage()
				doc.addImage(termsImg, 'JPEG', margin, margin, contentWidth, contentHeight)

				const pdfName = `${name || 'demoName'}.pdf`
				doc.save(pdfName)
			})
		} else {
			console.error('Invoice content or terms not found.')
		}
	}

	const handleDeleteFeature = async (index: any) => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'Cancel',
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					const newPlans = [...formData.items]
					newPlans[index].delete = true // Mark the item as deleted

					// Recalculate the totalPayment for the form excluding deleted items
					const newTotalPayment = calculateTotalPayment(newPlans)

					setFormData((prevFormData: any) => ({
						...prevFormData,
						items: newPlans,
						net_amount: newTotalPayment.toString(),
					}))

					toast.success('Plan Deleted Successfully')
				} catch (error: any) {
					toast.error(error.message)
					console.error(error)
				}
			}
		})
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

	const handlePlanInputChange = (
		index: number,
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target
		const updatedPlans: any = [...formData.items]

		if (name === 'item_name') {
			if (predefinedOptions.includes(value)) {
				updatedPlans[index].inputField = value === 'Other'
			} else {
				updatedPlans[index].inputField = true
			}
		}

		updatedPlans[index][name] = value

		if (name === 'quantity' || name === 'amount') {
			const quantity = parseFloat(updatedPlans[index].quantity) || 0
			const amount = parseFloat(updatedPlans[index].amount) || 0
			updatedPlans[index].totalAmount = (quantity * amount).toString()
		}

		setFormData((prevFormData: any) => ({
			...prevFormData,
			items: updatedPlans,
			totalPayment: calculateTotalPayment(updatedPlans).toString(),
		}))
	}

	const calculateTotalPayment = (plans: any) => {
		return plans.reduce((total: any, plan: any) => {
			if (!plan.delete) {
				const quantity = parseFloat(plan.quantity) || 0
				const amount = parseFloat(plan.amount) || 0
				return total + quantity * amount
			}
			return total
		}, 0)
	}

	const removePlan = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		handleDeleteFeature(index)
	}

	// Separate event handler for textarea
	const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = event.target
		setFormData({ ...formData, [name]: value })
	}

	return (
		<>
			<PageTitle breadcrumbs={[]}>Update Invoice</PageTitle>

			{/* <h1 className='fw-bold text-dark fs-1 mb-6 '>Create Invoice</h1> */}
			<div className='row'>
				<div className='col-md-12 mt-3'>
					<div className='card'>
						<div className='card-body'>
							<p className='fw-bold fs-2 mb-4'>Update Invoice</p>

							<form>
								<div className='row'>
									<div className='col-12 row'>
										<InputField
											className='col-md-6 fv-row'
											label='Invoice Number'
											placeholder="Invoice Number'"
											type='number'
											name='invoice_number'
											htmlFor='invoice_number'
											value={formData?.invoice_number}
											onChange={handleInputChange}
										/>
										<InputField
											className='col-md-6 fv-row'
											label='Date'
											placeholder="Date'"
											type='date'
											name='date'
											htmlFor='date'
											value={formData?.date}
											onChange={handleInputChange}
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
										/>
										<InputField
											className='col-md-3 fv-row'
											label='Address'
											placeholder='Enter Address'
											type='text'
											name='billing_address'
											htmlFor='billing_address'
											value={formData?.billing_address}
											onChange={handleInputChange}
										/>
										<InputField
											className='col-md-3 fv-row'
											label='Phone No.'
											placeholder='Enter Phone No.'
											type='Number'
											name='mobile'
											htmlFor='mobile'
											value={formData?.mobile}
											onChange={handleInputChange}
										/>
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

									<h1 className='mb-4'>Product:</h1>
									{formData.items.map(
										(plan: any, index: any) =>
											!plan.delete && (
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
														<div className='col-md-11 row py-5 pb-0'>
															{plan.inputField ? (
																<InputField
																	className='col-md-3 fv-row'
																	label='Plan Name'
																	placeholder='Enter Plan Name'
																	type='text'
																	name='item_name'
																	htmlFor='item_name'
																	value={plan.item_name == 'Other' ? '' : plan.item_name}
																	onChange={(e: any) => handlePlanInputChange(index, e)}
																/>
															) : (
																<SelectField
																	className='col-md-3 fv-row mb-7'
																	label='Plan Name'
																	name='item_name'
																	value={plan.item_name}
																	onChange={(e: any) => handlePlanInputChange(index, e)}
																	htmlFor='txt_company'
																	options={[
																		'All plan',
																		'Marketing Guru',
																		'Portfolio management service',
																		'Management Consultation',
																		'Business management course',
																		'Digital marketing course',
																		'Stock market course',
																		'Content shoot & Edit',
																		'Graphics designing',
																		'Social Media marketing',
																		'Website designing and development',
																		'Paid Advertisement',
																		'Content writing',
																		'SEO- Search engine optimization',
																		'SEM- Search engine management',
																		'GMB- Google my business profile maintain',
																		'ERP setup and service',
																		'Business solution',
																		'Logo design',
																		'Other',
																	]}
																/>
															)}
															<InputField
																className='col-md-3 fv-row'
																label='Quantity'
																placeholder='Enter Quantity'
																type='number'
																name='quantity'
																htmlFor='quantity'
																value={plan?.quantity}
																onChange={(e: any) => handlePlanInputChange(index, e)}
															/>
															<InputField
																className='col-md-3 fv-row'
																label='Amount'
																placeholder='Enter Amount'
																type='number'
																name='amount'
																htmlFor='amount'
																value={plan?.amount}
																onChange={(e: any) => handlePlanInputChange(index, e)}
															/>
															<InputField
																className='col-md-3 fv-row'
																label='Total'
																placeholder='Total'
																type='Number'
																name='totalPayment'
																htmlFor='totalPayment'
																value={plan?.totalAmount}
																disabled
															/>
														</div>
														<div className='col-md-1'>
															<div className='mt-md-17 mb-md-0 mb-5 d-flex justify-content-md-end justify-content-center'>
																<TableButton
																	action='remove'
																	backgroundDark={true}
																	onClick={(e) => removePlan(index, e)}
																/>
															</div>
														</div>
													</div>
												</div>
											)
									)}

									<div className='col-12 row'>
										<InputField
											className='col-md-3 fv-row'
											label='Total Amount'
											placeholder='Enter Total Amount'
											type='text'
											name='net_amount'
											htmlFor='net_amount'
											value={formData?.net_amount}
											onChange={handleInputChange}
											disabled
										/>
										<InputField
											className='col-md-3 fv-row'
											label='Paid Amount'
											placeholder='Enter Paid Amount'
											type='text'
											name='paid_amount'
											htmlFor='paid_amount'
											value={formData?.paid_amount}
											onChange={handleInputChange}
										/>
										<InputField
											className='col-md-3 fv-row'
											label='Due Amount'
											placeholder='Enter Due Amount'
											type='text'
											name='due_amount'
											htmlFor='due_amount'
											value={dueAmount}
											onChange={handleInputChange}
										/>{' '}
										<SelectField
											className='col-md-3 fv-row mb-7'
											label='Payment Method'
											name='payment_method'
											value={formData?.payment_method}
											onChange={handleInputChange}
											htmlFor='txt_company'
											options={[
												'COD',
												'Google Pay',
												'Phone Pay',
												'Bharat Pay',
												'Paytm',
												'Freecharg',
												'Amazon pay',
												'UPI ID Pay',
												'MobikWik',
												'PayU',
												'Cred',
												'Paypal',
												'Bank Application Pay',
												'Credit Card',
												'Debit Card',
												'RTGS',
												'NEFT',
												'Cheque',
												'Cash',
												'None',
											]}
										/>
										<TextareaField
											className='col-md-12 fv-row'
											label='Description'
											placeholder='Write Description'
											name='note'
											htmlFor='note'
											value={formData?.note}
											onChange={handleNotesChange}
										/>
									</div>

									<div className='col-md-12 fv-row mb-7'>
										<div className='d-flex justify-content-end'>
											<button
												type='button'
												className='btn btn-success mb-4 me-3'
												onClick={() => generatePDF(invoiceData?.name)}>
												Download Invoice
											</button>
											<button
												type='button'
												className={`btn btn-primary btn-block mb-4 ${
													isSubmitting ? 'disabled' : ''
												}`}
												onClick={handleUpdateInvoice}
												disabled={isSubmitting}>
												{isSubmitting ? 'Please wait, updating invoice...' : 'Update Invoice'}
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className='col-md-6 mt-3'>
				<div className='card'>
					<div className='card-body'>
						<div id='invoiceContent'>
							<p className='fw-bold fs-5 text-center mb-2'>INVOICE</p>
							<div className='border border-black'>
								<div className='invoice-header row mt-2 p-3 align-items-start'>
									<div className='col-md-8'>
										<p className='fs-4 mb-1'>
											<b>{adminType == 'Store' ? 'GOMZI NUTRITION ' : 'Gomzi Lifesciences LLP'}</b>
										</p>
										<p
											style={{ fontSize: '12px' }}
											className='mt-1 mb-1'>
											{adminType == 'Store'
												? 'G-23-TIME SQUARE, Gaurav Path Road, TP 10 Main Rd, Surat, Gujarat, Opp. Shree Bharti Residency, Surat, Gujarat 394510'
												: '547,548, FIRST FLOOR, RJD TEXTILES PARK, Hazira Rd, Ichchhapor, PAL, Surat, Gujarat 394510'}
										</p>
										<p
											style={{ fontSize: '12px' }}
											className='mb-1'>
											Phone no.:
											<strong>
												{adminType == 'Store' ? '8866465275 / 9081091068' : '7874331000'}
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
										<div className='bill-to border-bottom border-black'>Bill To</div>
										<strong>
											<p
												className='mt-2 px-2'
												style={{ fontSize: '14px' }}
												id='inv-name'>
												{invoiceData.name || '-'}
											</p>
										</strong>
										<strong>
											<p
												className='px-2'
												style={{ fontSize: '14px' }}
												id='inv-email'>
												{invoiceData.email || '-'}
											</p>
										</strong>
									</div>
									<div className='col-md-7 border border-black text-right'>
										<div className='bill-name-date px-2'>
											<p>
												<strong>Invoice No. :</strong>
												<span id='inv-n'>{invoiceData.invoice_number || '-'}</span>
											</p>
											<p className=''>
												<strong>Date :-</strong>
												<span id='inv-date'>{invoiceData.date || '-'}</span>
											</p>
											<p className=''>
												<strong>Phone No. :-</strong>
												<span id='inv-mobile'>{invoiceData.mobile || '-'}</span>
											</p>
											<p className=''>
												<strong>Address :-</strong>
												<span id='inv-address'>{invoiceData.billing_address || '-'}</span>
											</p>
										</div>
									</div>
								</div>
								<div className='invoice-items'>
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
											{invoiceData.items.length == 0 ? (
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
												invoiceData.items.map((item: any, index: any) => {
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
									<div className='col-md-6 border border-black px-0'>
										<div className='bill-to px-2 border-bottom border-black'>Description :-</div>
										<p
											style={{ fontSize: '16px' }}
											className='px-2'>
											<b></b> <span id='inv-notes'> {invoiceData.note || '-'}</span>{' '}
										</p>
									</div>
									<div className='col-md-6 border border-black px-0'>
										<div className='bill-to px-2 border-bottom border-black'>Amount :-</div>
										<div className='bill-name-date px-2'>
											<p>
												<strong>Paid Amount :-</strong>
												<span className='inv-paid'> {invoiceData.paid_amount || '-'}</span>
											</p>
											<p className=''>
												<strong>Due Amount :-</strong>
												<span id='inv-due'> {dueAmount || '-'}</span>
											</p>
											<p className=''>
												<strong>Total Amount :-</strong>
												<span className='inv-total'> {invoiceData.net_amount || '-'}</span>
											</p>
										</div>
									</div>
								</div>
								<div className='invoice-details d-flex'>
									<div className='col-md-6 border border-black px-0'>
										<div className='bill-to px-2 border-bottom border-black'>Sign:</div>
									</div>
									<div className='col-md-6 border border-black px-0'>
										<div className='bill-to px-2 border-bottom border-black'>Administrator:</div>
										<div className='px-2 d-flex justify-content-center'>
											<img
												src={
													adminType == 'Store'
														? '/media/sign/chirag.png'
														: '/media/sign/goutam_sir.png'
												}
												alt='sign'
												width='90%'
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='col-md-12 fv-row mt-10 text-center'>
							<button
								type='button'
								className='btn btn-success'
								onClick={() => generatePDF(invoiceData?.name)}>
								Download Invoice
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				className='col-md-6 mt-3'
				style={{ height: '0px', overflow: 'hidden' }}>
				<div className='card'>
					<div className='card-body'>
						<div id='invoiceTermAndCondition'>
							<p className='fw-bold fs-5 text-center mb-2'>
								Gomzi Life Sciences – Supplement Manufacturing Terms & Conditions
							</p>
							<div className='border'>
								<div className='invoice-details d-flex'>
									<div className='col-md-12 border px-0'>
										<div className='bill-to px-2'>Terms and Conditions :-</div>
										<div className='px-2'>
											<p
												style={{ fontSize: '12px' }}
												className='mt-1'>
												Welcome to Gomzi Life Sciences, your trusted partner in premium-quality
												supplement manufacturing. To maintain smooth production and timely delivery,
												we request all clients to strictly follow the terms below:
											</p>
											<div>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1'>
													<strong>1. Payment Policy</strong>
												</p>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1'>
													<strong>*</strong> 100% advance payment is compulsory for confirming any
													manufacturing order.
												</p>
												<p style={{ fontSize: '12px' }}>
													<strong>*</strong> This is necessary as we immediately initiate
													procurement of raw materials, packaging, and production setup.
												</p>
												<p style={{ fontSize: '12px' }}>
													<strong>*</strong> In case of partial payment approval, the remaining
													balance must be paid within 7 days from the date of order confirmation.
												</p>
											</div>
											<div>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1'>
													<strong> {'=>'} Important Note:</strong>
												</p>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1'>
													<strong>*</strong> If full payment is not received in time, we cannot
													proceed to the sticker/batch number stage, which can cause major losses
													and project delays.
												</p>
											</div>
											<div>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1'>
													<strong>2. GST (18%) is Mandatory</strong>
												</p>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1'>
													<strong>*</strong> 18% GST is applicable on all orders, as per government
													guidelines.
												</p>
												<p style={{ fontSize: '12px' }}>
													<strong>*</strong> We also pay GST on our raw material purchases—hence,
													orders cannot be processed or dispatched without GST payment.
												</p>
											</div>
											<div>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1'>
													<strong>3. Transport & Delivery Charges</strong>
												</p>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1'>
													<strong>*</strong> All transport or courier charges are 100% to be borne
													by the client.
												</p>
												<p style={{ fontSize: '12px' }}>
													<strong>*</strong> You may:
													<ul>
														<li>Collect the goods yourself</li>
														<li>Arrange your own transport</li>
														<li>Or pay us courier charges in advance for dispatch</li>
													</ul>
												</p>
											</div>
											<div>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1'>
													<strong>4. Dispatch Confirmation & Responsibility Clause</strong>
												</p>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1'>
													<strong>*</strong> A video of the packed goods will be shared with you
													before dispatch for final confirmation.
												</p>
												<p style={{ fontSize: '12px' }}>
													<strong>*</strong> Once confirmed, Gomzi Life Sciences is not responsible
													for any issues related to damage, loss, or complaints after dispatch.
												</p>
											</div>
											<div>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1'>
													<strong>5. Minimum Order Quantity (MOQ)</strong>
												</p>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1'>
													<strong>*</strong> Orders are subject to minimum quantity requirements,
													which vary depending on the product.
												</p>
												<p style={{ fontSize: '12px' }}>
													<strong>*</strong> Please confirm the MOQ for your specific product before
													placing an order.
												</p>
											</div>
											<div>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1'>
													<strong>6. Formula Finalization</strong>
												</p>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1'>
													<strong>*</strong> Once your formula (flavor, ingredients, etc.) is
													finalized and production begins, no changes can be made.
												</p>
												<p style={{ fontSize: '12px' }}>
													<strong>*</strong> Any further changes will be treated as a new order, and
													additional costs will apply.
												</p>
											</div>
											<div>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1'>
													<strong>7. Refund & Cancellation Policy</strong>
												</p>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1'>
													<strong>*</strong> No refund or cancellation is allowed once the
													production process has begun.
												</p>
												<p style={{ fontSize: '12px' }}>
													<strong>*</strong> If cancelled before production, a processing fee will
													be deducted from the advance.
												</p>
											</div>
											<div>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1'>
													<strong>8. Branding & Confidentiality</strong>
												</p>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1'>
													<strong>*</strong> We value your brand identity and maintain full
													confidentiality of your formulas and project details.
												</p>
												<p
													style={{ fontSize: '12px' }}
													className='mt-1'>
													<strong>*</strong> Your formulation will never be shared with any third
													party without written consent.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='col-md-12 fv-row mt-10 text-center'>
							<button
								type='button'
								className='btn btn-success'
								onClick={() => generatePDF(invoiceData.name)}>
								Download Invoice
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default NutritionUpdateInvoice
