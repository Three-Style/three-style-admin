import { getAPIHeaders } from '../../../_metronic/helpers/AuthToken'
import { APIDelete, APIGet, APIPatch, APIPost } from '../../../_metronic/helpers/Utils'
import * as FGGroupEndpoints from '../../constants/fg_group_endpoints'

export function AddCategories(body: {
	name: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.AddCategories, getAPIHeaders('fg_group'), undefined, body)
}

export function UpdateCategories(body: {
	id: string
	name?: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.UpdateCategories, getAPIHeaders('fg_group'), undefined, body)
}

export function GetCategories(
	query?: { id?: string } & FGGroupSearchOptions & FGGroupPaginationOptions & FGGroupSortOptions
): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetCategories, getAPIHeaders('fg_group'), query)
}
