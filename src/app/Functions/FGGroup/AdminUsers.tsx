import { getAPIHeaders } from '../../../_metronic/helpers/AuthToken'
import { APIGet, APIPost } from '../../../_metronic/helpers/Utils'
import * as FGGroupEndpoints from '../../constants/fg_group_endpoints'

export function GetAdminUsers(query?: { adminID?: string }): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetAdminUsers, getAPIHeaders('three_style'), query)
}

export function ResetPassword(body: { id: string; password: string }): Promise<FGGroupAPIResponse> {
	return APIPost(
		FGGroupEndpoints.ResetAdminUserPassword,
		getAPIHeaders('three_style'),
		undefined,
		body
	)
}

export function RemoveAdminUser(body: { id: string }): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.RemoveAdminUser, getAPIHeaders('three_style'), undefined, body)
}

export function CreateAdmin(body: {
	full_name: string
	mobile: string
	type: string
	email: string
	password: string
	franchise_id: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.CreateAdminAccount, getAPIHeaders('three_style'), undefined, body)
}

export function UpdateAdmin(body: {
	full_name: string
	email: string
	mobile: string
	id: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.UpdateAdminUsers, getAPIHeaders('three_style'), undefined, body)
}
