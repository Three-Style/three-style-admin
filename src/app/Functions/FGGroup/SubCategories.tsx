import { getAPIHeaders } from '../../../_metronic/helpers/AuthToken'
import { APIDelete, APIGet, APIPatch, APIPost } from '../../../_metronic/helpers/Utils'
import * as FGGroupEndpoints from '../../constants/fg_group_endpoints'

export function AddSubCategories(body: {
	name: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.AddSubCategories, getAPIHeaders('three_style'), undefined, body)
}

export function UpdateSubCategories(body: {
	id: string
	name?: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.UpdateSubCategories, getAPIHeaders('three_style'), undefined, body)
}

export function GetSubCategories(
	query?: { id?: string } & FGGroupSearchOptions & FGGroupPaginationOptions & FGGroupSortOptions
): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetSubCategories, getAPIHeaders('three_style'), query)
}
