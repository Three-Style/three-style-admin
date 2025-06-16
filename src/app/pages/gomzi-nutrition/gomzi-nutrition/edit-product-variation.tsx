import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import { PageTitle } from '../../../../_metronic/layout/core'
import CopyableInput from '../../../components/CopyableInput'
import InputField from '../../../components/InputField'
import TableButton from '../../../components/TableButton'
import { FileUploadToFGGroup, GetProduct, UpdateProductVariation } from '../../../Functions/FGGroup'

const EditGomziNutritionVariationProduct = () => {
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const product_id: string | any = searchParams.get('product_id')
	const variation_id: string | any = searchParams.get('variation_id')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [displayImg, setDisplayImg] = useState<string | null>(null)
	const [formData, setFormData] = useState<any>({
		product_id: '',
		variant_id: '',
		name: '',
		price: '',
		discountPrice: '',
		description: '',
		display_image: [],
		stock: '',
		isAvailable: Boolean,
		selectedFile: null as File | null,
	})
	const [images, setImages] = useState([])
	const [activeImageIndex, setActiveImageIndex] = useState(0)

	// const handleInputChange = (event: any) => {
	// 	const files = event.target.files
	// 	const imageUrls: any = Array.from(files).map((file: any) => URL.createObjectURL(file))
	// 	setImages(imageUrls)
	// }

	// const handleFileButtonClick = () => {
	// 	document.getElementById('fileInput').click()
	// }

	const handleInputChange = async (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, name, value } = event.target

		if (id === 'fileInput' && event.target instanceof HTMLInputElement && event.target.files) {
			const files = event.target.files
			const imageUrls: any = Array.from(files).map((file: any) => URL.createObjectURL(file))
			setImages(imageUrls)

			setFormData((prevData: any) => ({
				...prevData,
				selectedFile: files,
				display_image: imageUrls,
			}))

			// Fix: Convert FileList to an array for upload
			const uploadedImages: any = await FileUploadToFGGroup(Array.from(files), {
				directory: 'products',
			})

			const imgUrl = uploadedImages.data?.fileURLs
			setDisplayImg(imgUrl)
			toast.success('Image uploaded successfully')
		} else {
			setFormData((prevData: any) => ({
				...prevData,
				[name]: value,
			}))
		}
	}

	const handleFileButtonClick = () => {
		const fileInput = document.getElementById('fileInput') as HTMLInputElement | null
		if (fileInput) {
			fileInput.click()
		}
	}

	useEffect(() => {
		const fetchProductData = async () => {
			try {
				const response: any = await GetProduct({ id: product_id })
				let data = response.data[0]?.variations

				data = data.find((product: any) => product._id == variation_id)

				setFormData(data)
			} catch (error: any) {
				toast.error(error.message)
				console.error(error)
			}
		}

		fetchProductData()
	}, [])

	const handleUpdateButtonClick = async () => {
		try {
			setIsSubmitting(true)

			const payload: any = {
				product_id: product_id,
				variant_id: variation_id,
				name: formData.name,
				price: formData.price,
				discountPrice: formData.discountPrice,
				description: formData.description,
				stock: formData.stock,
				isAvailable: formData.isAvailable,
				...(displayImg && { display_image: displayImg }),
			}

			await UpdateProductVariation(payload)

			toast.success('Product Updated Successfully')
			setIsSubmitting(false)
		} catch (error: any) {
			toast.error(error.message)
			setIsSubmitting(false)
			console.error(error)
		}
	}

	return (
		<>
			<PageTitle breadcrumbs={[]}>Product Details</PageTitle>
			<div className='row'>
				<div className='col-12 mt-3'>
					<div className='card py-10'>
						<div className='card-body'>
							<div className='row px-6 justify-content-between'>
								<div className='col-md-4 text-center mb-md-10'>
									<div className='row'>
										<div className='col-12 p-0 product-hori-slider-main'>
											{/* Large Image Display */}
											<div className='product-imgs one-book singal-product-img d-none d-lg-block'>
												<div className='row'>
													<div className='col-12'>
														<div className='main-image text-center'>
															<div style={{ transition: 'opacity 0.5s ease-in-out' }}>
																<img
																	src={
																		images.length > 0
																			? images[activeImageIndex]
																			: `https://files.fggroup.in/${formData.display_image[activeImageIndex]}`
																	}
																	alt='Selected'
																	width='70%'
																	style={{ borderRadius: '10px' }}
																/>
															</div>
														</div>
													</div>

													{/* Thumbnail Images */}
													<div className='col-12'>
														<div className='thumbnail-images row justify-content-center mt-4'>
															{images.length > 0
																? images.map((image, index) => (
																		<div
																			key={index}
																			className='col-3 p-2'>
																			<img
																				src={image}
																				alt={`Thumbnail ${index}`}
																				style={{
																					width: '100%',
																					height: 'auto',
																					cursor: 'pointer',
																					borderRadius: '8px',
																					border:
																						index === activeImageIndex
																							? '2px solid #007bff'
																							: '2px solid transparent',
																				}}
																				onClick={() => setActiveImageIndex(index)} // Update large image on click
																			/>
																		</div>
																  ))
																: formData.display_image.map((image: any, index: number) => (
																		<div
																			key={index}
																			className='col-3 p-2'>
																			<img
																				src={`https://files.fggroup.in/${image}`}
																				alt={`Thumbnail ${index}`}
																				style={{
																					width: '100%',
																					height: 'auto',
																					cursor: 'pointer',
																					borderRadius: '8px',
																					border:
																						index === activeImageIndex
																							? '2px solid #007bff'
																							: '2px solid transparent',
																				}}
																				onClick={() => setActiveImageIndex(index)} // Update large image on click
																			/>
																		</div>
																  ))}
														</div>
													</div>
												</div>
											</div>

											{/* Mobile View for Large Image */}
											<div className='product-imgs one-book singal-product-img d-block d-lg-none'>
												<div className='row'>
													<div className='col-12'>
														<div className='main-image text-center'>
															<div style={{ transition: 'opacity 0.5s ease-in-out' }}>
																<img
																	src={
																		images.length > 0
																			? images[activeImageIndex]
																			: `https://files.fggroup.in/${formData.display_image[activeImageIndex]}`
																	}
																	alt='Selected'
																	width='100%'
																	style={{ borderRadius: '10px' }}
																/>
															</div>
														</div>
													</div>
													<div className='col-12'>
														<div className='thumbnail-images row justify-content-center mt-4'>
															{images.length > 0
																? images.map((image, index) => (
																		<div
																			key={index}
																			className='col-3 p-2'>
																			<img
																				src={image}
																				alt={`Thumbnail ${index}`}
																				style={{
																					width: '100%',
																					height: 'auto',
																					cursor: 'pointer',
																					borderRadius: '8px',
																					border:
																						index === activeImageIndex
																							? '2px solid #007bff'
																							: '2px solid transparent',
																				}}
																				onClick={() => setActiveImageIndex(index)}
																			/>
																		</div>
																  ))
																: formData.display_image.map((image: any, index: number) => (
																		<div
																			key={index}
																			className='col-3 p-2'>
																			<img
																				src={`https://files.fggroup.in/${image}`}
																				alt={`Thumbnail ${index}`}
																				style={{
																					width: '100%',
																					height: 'auto',
																					cursor: 'pointer',
																					borderRadius: '8px',
																					border:
																						index === activeImageIndex
																							? '2px solid #007bff'
																							: '2px solid transparent',
																				}}
																				onClick={() => setActiveImageIndex(index)}
																			/>
																		</div>
																  ))}
														</div>
													</div>
												</div>
											</div>

											{/* Upload Button */}
											<div className='col-md-12 text-center my-4'>
												<button
													type='button'
													className='px-2 py-1 mb-2 btn btn-success'
													onClick={handleFileButtonClick}>
													Upload Photos
												</button>
												<input
													type='file'
													id='fileInput'
													className='d-none'
													onChange={handleInputChange}
													multiple
													accept='image/*'
												/>
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-7'>
									<div className='row'>
										<div className='col-md-6 fv-row mb-7'>
											<CopyableInput
												value={product_id}
												label={'Product ID'}
												className='col-12 fv-row mb-7'
												htmlFor={'product_id'}
												placeholder='Enter Product ID'
												type='text'
												name='product_id'
												onChange={handleInputChange}
												disabled
											/>
										</div>
										<div className='col-md-6 fv-row mb-7'>
											<CopyableInput
												value={variation_id}
												label={'Variant ID'}
												className='col-12 fv-row mb-7'
												htmlFor={'variant_id'}
												placeholder='Enter Product ID'
												type='text'
												name='variant_id'
												onChange={handleInputChange}
												disabled
											/>
										</div>
										<div className='col-md-6 fv-row mb-7'>
											<InputField
												placeholder='Enter Product Name'
												type='text'
												className='fv-row'
												name='name'
												label='Product Name'
												htmlFor='name'
												value={formData.name}
												onChange={handleInputChange}
											/>
										</div>
										<div className='col-md-6 fv-row mb-7'>
											<InputField
												placeholder='Enter Price'
												type='number'
												className='fv-row'
												name='price'
												label='Price'
												htmlFor='price'
												value={formData.price}
												onChange={handleInputChange}
											/>
										</div>
										<div className='col-md-6 fv-row mb-7'>
											<InputField
												placeholder='Enter Discount Price'
												type='number'
												className='fv-row'
												name='discountPrice'
												label='Discount Price'
												htmlFor='discountPrice'
												value={formData.discountPrice}
												onChange={handleInputChange}
											/>
										</div>
										<div className='col-md-6 fv-row mb-7'>
											<InputField
												placeholder='Enter Stock'
												type='number'
												className='fv-row'
												name='stock'
												label='Stock'
												htmlFor='stock'
												value={formData.stock}
												onChange={handleInputChange}
											/>
										</div>
										<div className='col-md-6 fv-row mb-7'>
											<InputField
												placeholder='Enter Description'
												type='text'
												className='fv-row'
												name='description'
												label='Description'
												htmlFor='description'
												value={formData.description}
												onChange={handleInputChange}
											/>
										</div>
										<div className='col-md-6 fv-row mb-7'>
											<label
												htmlFor='isAvailable'
												className='fw-bold fs-6 mb-md-5 mb-2'>
												isAvailable
											</label>
											<br />
											<div className='d-flex'>
												<div className='me-4'>
													<input
														type='radio'
														name='isAvailable'
														id='Yes'
														checked={formData.isAvailable === true}
														onChange={() =>
															setFormData((prevData: any) => ({
																...prevData,
																isAvailable: true,
															}))
														}
													/>{' '}
													<label
														htmlFor='Yes'
														className='fw-bold fs-6 mb-md-5 mb-2'>
														Yes
													</label>
												</div>
												<div>
													<input
														type='radio'
														name='isAvailable'
														id='No'
														checked={formData.isAvailable === false}
														onChange={() =>
															setFormData((prevData: any) => ({
																...prevData,
																isAvailable: false,
															}))
														}
													/>{' '}
													<label
														htmlFor='No'
														className='fw-bold fs-6 mb-md-5 mb-2'>
														No
													</label>
												</div>
											</div>
										</div>
										<div className='col-md-12 fv-row text-end mb-7'>
											<TableButton
												action='edit'
												onClick={handleUpdateButtonClick}
												text={
													isSubmitting
														? 'Please wait, Updating Product Details...'
														: 'Update Product Details'
												}
												showIcon={false}
												disabled={isSubmitting}
												backgroundDark={true}
												className={`mb-4 btn-block ${isSubmitting ? 'disabled' : ''}`}
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

export { EditGomziNutritionVariationProduct }
