import { getAPIHeaders } from '../../../_metronic/helpers/AuthToken'
import { APIDelete, APIGet, APIPatch, APIPost } from '../../../_metronic/helpers/Utils'
import * as FGGroupEndpoints from '../../constants/fg_group_endpoints'

export function AddFabric(body: {
	name: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.AddFabric, getAPIHeaders('fg_group'), undefined, body)
}

export function UpdateFabric(body: {
	id: string
	name?: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.UpdateFabric, getAPIHeaders('fg_group'), undefined, body)
}

export function GetFabric(
	query?: { id?: string } & FGGroupSearchOptions & FGGroupPaginationOptions & FGGroupSortOptions
): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetFabric, getAPIHeaders('fg_group'), query)
}
