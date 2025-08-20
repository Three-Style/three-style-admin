import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useLocation } from 'react-router-dom'
import { TagsInput } from 'react-tag-input-component'
import { PageTitle } from '../../../../_metronic/layout/core'
import InputField from '../../../components/InputField'
import SelectFieldManual from '../../../components/SelectFieldManual'
import TableButton from '../../../components/TableButton'
import { FileUploadToFGGroup, GetProduct, UpdateProduct } from '../../../Functions/FGGroup'
import { GetCategories } from '../../../Functions/FGGroup/Categories'
import { GetFabric } from '../../../Functions/FGGroup/Fabric'
import { GetSubCategories } from '../../../Functions/FGGroup/SubCategories'

const EditGomziNutritionProduct = () => {
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const product_id: string | any = searchParams.get('product_id')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [categoriesData, setCategoriesData] = useState([])
	const [fabricData, setFabricData] = useState([])
	const [subCategoriesData, setSubCategoriesData] = useState([])
	const [selectedData, setSelectedData] = useState<any>({
		categories: {
			name: '',
			_id: '',
		},
		fabric: {
			name: '',
			_id: '',
		},
		subCategories: {
			name: '',
			_id: '',
		},
	})
	const [formData, setFormData] = useState({
		_id: '',
		name: '',
		price: '',
		display_image: '',
		original_price: '',
		discount_percentage: '',
		description: '',
		short_description: '',
		stock: '',
		color_name: '',
		color_code: '',
		tags: [],
		selectedFile: null as File | null,
	})
	const [imageArray, setImageArray] = useState<string[]>([])
	const [editingIndex, setEditingIndex] = useState<number | null>(null)
	const addImageInputRef = useRef<HTMLInputElement>(null)

	const fetchCategoriesData = async () => {
		try {
			const response: any = await GetCategories()
			setCategoriesData(response.data)
		} catch (error: any) {
			console.error(error)
		}
	}

	const fetchFabricData = async () => {
		try {
			const response: any = await GetFabric()
			setFabricData(response.data)
		} catch (error: any) {
			console.error(error)
		}
	}

	const fetchSubCategoriesData = async () => {
		try {
			const response: any = await GetSubCategories()
			setSubCategoriesData(response.data)
		} catch (error: any) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchCategoriesData()
		fetchFabricData()
		fetchSubCategoriesData()
	}, [])

	const handleInputChange = async (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const selectedId = event.target.value
		const name = event.target.name

		if (name === 'categories') {
			const selectedData: any = categoriesData.find((data: any) => data._id === selectedId)
			if (selectedData) {
				setSelectedData((prevData: any) => ({
					...prevData,
					categories: {
						name: selectedData.name,
						_id: selectedData._id,
					},
				}))
			}
		} else if (name === 'fabric') {
			const selectedData: any = fabricData.find((data: any) => data._id === selectedId)
			if (selectedData) {
				setSelectedData((prevData: any) => ({
					...prevData,
					fabric: {
						name: selectedData.name,
						_id: selectedData._id,
					},
				}))
			}
		} else if (name === 'sub_categories') {
			const selectedData: any = subCategoriesData.find((data: any) => data._id === selectedId)
			if (selectedData) {
				setSelectedData((prevData: any) => ({
					...prevData,
					subCategories: {
						name: selectedData.name,
						_id: selectedData._id,
					},
				}))
			}
		}
	}

	const fetchProductData = async () => {
		try {
			const response: any = await GetProduct({ id: product_id })
			const data = response.data[0]

			if (data) {
				setFormData({
					...data,
					color_name: data?.color?.color_name,
					color_code: data?.color?.color_code,
				})
				setImageArray(data?.display_image)
				setSelectedData({
					categories: {
						_id: data?.categories,
					},
					fabric: {
						_id: data?.fabric,
					},
					subCategories: {
						_id: data?.sub_categories,
					},
				})
			}
		} catch (error: any) {
			toast.error(error.message)
			console.error(error)
		}
	}

	useEffect(() => {
		fetchProductData()
	}, [])

	const handleUpdateButtonClick = async () => {
		try {
			setIsSubmitting(true)

			const payload: any = {
				id: product_id,
				display_image: imageArray,
				name: formData.name,
				price: formData.price,
				original_price: formData.original_price,
				discount_percentage: formData.discount_percentage,
				description: formData.description,
				short_description: formData.short_description,
				categories: selectedData.categories._id,
				fabric: selectedData.fabric._id,
				sub_categories: selectedData.subCategories._id,
				stock: formData.stock,
				color: {
					color_name: formData.color_name,
					color_code: formData.color_code,
				},
				tags: formData.tags,
			}
			await UpdateProduct(payload)

			toast.success('Product Updated Successfully')
			fetchProductData()
			setIsSubmitting(false)
		} catch (error: any) {
			toast.error(error.message)
			setIsSubmitting(false)
			console.error(error)
		}
	}

	const handleUpdateFileButtonClick = (index: any) => {
		setEditingIndex(index)
		addImageInputRef.current?.click()
	}

	const handleAddImage = () => {
		addImageInputRef.current?.click()
	}

	const handleAddImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (file) {
			try {
				const imageUrl: any = await FileUploadToFGGroup([file], {
					directory: 'files',
				})
				const imgUrl = imageUrl.data?.fileURLs[0]

				if (imgUrl) {
					setImageArray((prev) => {
						if (editingIndex !== null) {
							const newArray = [...prev]
							newArray[editingIndex] = imgUrl
							return newArray
						} else {
							return [...prev, imgUrl]
						}
					})
					setEditingIndex(null) // reset after update
					toast.success('Image uploaded successfully')
				} else {
					toast.error('Failed to retrieve uploaded image URL')
				}
			} catch (err) {
				console.error('Image upload failed:', err)
				toast.error('Image upload failed')
			}
		}
	}

	const handleRemoveImage = (indexToRemove: any) => {
		setImageArray((prev) => prev.filter((_, idx) => idx !== indexToRemove))
	}

	return (
		<>
			<PageTitle breadcrumbs={[]}>Product Details</PageTitle>
			<div className='row'>
				<div className='col-12 mt-3'>
					<div className='card py-10'>
						<div className='card-body'>
							<div className='row'>
								<h1 className='mb-4'>Product Images:</h1>
								{imageArray.length > 0 ? (
									imageArray.map((img, index) => (
										<div
											className='col-md-2 mb-5 text-center'
											key={index}>
											<div style={{ position: 'relative' }}>
												<img
													src={`https://files.threestyle.in/${img}`}
													alt={`Uploaded ${index}`}
													style={{ borderRadius: '10px', width: '95%' }}
												/>
												<button
													type='button'
													className='mt-5 px-2 py-1 mb-2 btn btn-success'
													onClick={() => handleUpdateFileButtonClick(index)}>
													Change Image
												</button>
												<button
													type='button'
													className='btn btn-danger btn-sm'
													style={{
														position: 'absolute',
														top: '5px',
														right: '10px',
														padding: '8px',
														fontSize: '12px',
													}}
													onClick={() => handleRemoveImage(index)}>
													<FontAwesomeIcon
														icon={faTrash}
														className='fs-3'
													/>
												</button>
											</div>
										</div>
									))
								) : (
									<div className='col-md-2 mb-5 text-center'>
										<img
											alt='Photos'
											src={formData.display_image || '/media/logos/fwg-logo.png'}
											style={{ borderRadius: '10px', width: '95%' }}
										/>
									</div>
								)}
								<div className='col-md-12 mb-7 ms-8'>
									<TableButton
										action='add'
										onClick={handleAddImage}
										text='Add Image'
										showIcon={false}
									/>

									<input
										type='file'
										accept='image/*'
										ref={addImageInputRef}
										className='d-none'
										onChange={handleAddImageChange}
									/>
								</div>
								<h1 className='mb-4'>Product Details:</h1>
								<div className='col-md-12'>
									<div className='row justify-content-end'>
										<div className='col-12'>
											<div className='row'>
												<div className='col-md-4 fv-row mb-7'>
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
												<div className='col-md-4 fv-row mb-7'>
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
												<div className='col-md-4 fv-row mb-7'>
													<InputField
														placeholder='Enter Original Price'
														type='number'
														className='fv-row'
														name='original_price'
														label='Original Price'
														htmlFor='original_price'
														value={formData.original_price}
														onChange={handleInputChange}
													/>
												</div>
												<div className='col-md-4 fv-row mb-7'>
													<InputField
														placeholder='Enter Discount Percentage'
														type='number'
														className='fv-row'
														name='discount_percentage'
														label='Discount Percentage'
														htmlFor='discount_percentage'
														value={formData.discount_percentage}
														onChange={handleInputChange}
													/>
												</div>
												<div className='col-md-4 fv-row mb-7'>
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
												<div className='col-md-4 fv-row mb-7'>
													<SelectFieldManual
														className='fv-row'
														label='Categories'
														name='categories'
														value={selectedData.categories._id}
														onChange={handleSelectChange}
														htmlFor='categories'
														marginRemove={true}
														options={categoriesData.map((data: any) => ({
															value: data._id,
															name: data.name,
														}))}
													/>
												</div>
												<div className='col-md-4 fv-row mb-7'>
													<SelectFieldManual
														className='fv-row mb-7'
														label='Fabric'
														name='fabric'
														value={selectedData.fabric._id}
														onChange={handleSelectChange}
														htmlFor='fabric'
														marginRemove={true}
														options={fabricData.map((data: any) => ({
															value: data._id,
															name: data.name,
														}))}
													/>
												</div>
												<div className='col-md-4 fv-row mb-7'>
													<SelectFieldManual
														className='fv-row'
														label='Sub Categories'
														name='sub_categories'
														value={selectedData.subCategories._id}
														onChange={handleSelectChange}
														htmlFor='sub_categories'
														marginRemove={true}
														options={subCategoriesData.map((data: any) => ({
															value: data._id,
															name: data.name,
														}))}
													/>
												</div>
												<div className='col-md-4 fv-row mb-7'>
													<InputField
														placeholder='Enter Color Name'
														type='text'
														className='fv-row'
														name='color_name'
														label='Color Name'
														htmlFor='color_name'
														value={formData.color_name}
														onChange={handleInputChange}
													/>
												</div>
												<div className='col-md-4 fv-row mb-7'>
													<InputField
														placeholder='Enter Color Code'
														type='text'
														className='fv-row'
														name='color_code'
														label='Color Code'
														htmlFor='color_code'
														value={formData.color_code}
														onChange={handleInputChange}
													/>
												</div>
												<div className='col-md-4 fv-row mb-7'>
													<label
														htmlFor='tags'
														className={`fw-bold fs-6 mb-md-5 mb-2`}>
														Tags
													</label>
													<TagsInput
														value={formData.tags}
														onChange={(newTags: any) =>
															setFormData((prevData) => ({ ...prevData, tags: newTags }))
														}
														name='tags'
														placeHolder='Enter Tags'
													/>
												</div>
												<div className='col-md-12 fv-row mb-7'>
													<InputField
														placeholder='Enter Short Description'
														type='text'
														className='fv-row'
														name='short_description'
														label='Short Description'
														htmlFor='short_description'
														value={formData.short_description}
														onChange={handleInputChange}
													/>
												</div>
												<div className='col-md-12 fv-row mb-7'>
													<label
														htmlFor='description'
														className='fw-bold fs-6 mb-2'>
														Description
													</label>
													<ReactQuill
														id='description'
														value={formData.description}
														onChange={(value: any) =>
															setFormData((prevData) => ({
																...prevData,
																description: value,
															}))
														}
														placeholder='Enter Description...'
														theme='snow'
														style={{ height: '200px', marginBottom: '20px' }}
													/>
												</div>
											</div>
										</div>
										<div className='d-flex justify-content-end fv-row mb-7'>
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

export { EditGomziNutritionProduct }
