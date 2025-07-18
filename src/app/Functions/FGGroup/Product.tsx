import { getAPIHeaders } from '../../../_metronic/helpers/AuthToken'
import { APIGet, APIPost } from '../../../_metronic/helpers/Utils'
import * as FGGroupEndpoints from '../../constants/fg_group_endpoints'

export function AddProduct(body: {
	display_image: [string]
	name: string
	price: number
	discount_price: number
	discount_percentage: number
	description: string
	categories: string
	fabric: string
	sub_categories: string
	stock: number
	color: {
		color_name: string
		color_code: string
	}
	tags: [string]
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.AddProduct, getAPIHeaders('three_style'), undefined, body)
}

export function UpdateProduct(body: {
	id: string
	display_image?: [string]
	name: string
	price?: number
	discount_price?: number
	discount_percentage?: number
	description?: string
	categories?: string
	fabric?: string
	sub_categories?: string
	stock?: number
	color?: {
		color_name?: string
		color_code?: string
	}
	tags?: [string]
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.UpdateProduct, getAPIHeaders('three_style'), undefined, body)
}

export function GetProduct(
	query?: { id?: string } & FGGroupSearchOptions & FGGroupPaginationOptions & FGGroupSortOptions
): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetProduct, getAPIHeaders('three_style'), query)
}

export function SetProductTrackingStatus(body: {
	user_product_id: string
	status: boolean
	shipment_status: ShipmentStatusValue
}): Promise<FGGroupAPIResponse> {
	return APIPost(
		FGGroupEndpoints.SetProductTrackingStatus,
		getAPIHeaders('three_style'),
		undefined,
		body
	)
}

/**
 *
 * @deprecated
 * @see GetProductFeedback
 */
export function GetProductReviews(
	query?: FGGroupPaginationOptions & FGGroupSortOptions
): Promise<FGGroupAPIResponse> {
	console.warn('[DEPRECATED] Use GetProductFeedback() instead of GetProductReviews()')
	return APIGet(FGGroupEndpoints.GetProductReviews, getAPIHeaders('three_style'), query)
}

/**
 * @deprecated The method should not be used
 * @see UpdateProductFeedback
 */
export function UpdateProductReview(body: {
	id: string
	status: boolean
}): Promise<FGGroupAPIResponse> {
	console.warn('[DEPRECATED] Use UpdateProductFeedback() instead of UpdateProductReview()')
	return APIPost(FGGroupEndpoints.UpdateProductReview, getAPIHeaders('three_style'), undefined, body)
}

export function GetProductFeedback(
	query?: { feedback_id?: string } & FGGroupPaginationOptions & FGGroupSortOptions
): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetProductFeedback, getAPIHeaders('three_style'), query)
}

export function UpdateProductFeedback(body: {
	feedback_id: string
	status: FeedbackStatusValue
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.GetProductFeedback, getAPIHeaders('three_style'), undefined, body)
}

/**
 *
 * @deprecated The method must not be used
 */
export function GetProductCart(): Promise<FGGroupAPIResponse> {
	console.error('[DEPRECATED] Use GetOrderCart() instead of GetProductCart()')
	return APIGet(FGGroupEndpoints.GetProductCart, getAPIHeaders('three_style'))
}

export function GetProductStock(
	query?: { id?: string } & FGGroupSearchOptions & FGGroupPaginationOptions & FGGroupSortOptions
): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetStockManagement, getAPIHeaders('three_style'), query)
}

export function CreateProductStock(body: {
	item_id: string
	stock: number
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.CreateStockManagement, getAPIHeaders('three_style'), undefined, body)
}

export function UpdateProductStock(body: {
	stock_id: string
	item_id: string
	stock: number
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.UpdateStockManagement, getAPIHeaders('three_style'), undefined, body)
}

export function RemoveProductStock(body: { stock_id: string }): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.RemoveStockManagement, getAPIHeaders('three_style'), undefined, body)
}
