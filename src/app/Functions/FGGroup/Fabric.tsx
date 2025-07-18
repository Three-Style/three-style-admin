import { getAPIHeaders } from '../../../_metronic/helpers/AuthToken'
import { APIDelete, APIGet, APIPatch, APIPost } from '../../../_metronic/helpers/Utils'
import * as FGGroupEndpoints from '../../constants/fg_group_endpoints'

export function AddFabric(body: {
	name: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.AddFabric, getAPIHeaders('three_style'), undefined, body)
}

export function UpdateFabric(body: {
	id: string
	name?: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.UpdateFabric, getAPIHeaders('three_style'), undefined, body)
}

export function GetFabric(
	query?: { id?: string } & FGGroupSearchOptions & FGGroupPaginationOptions & FGGroupSortOptions
): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetFabric, getAPIHeaders('three_style'), query)
}
