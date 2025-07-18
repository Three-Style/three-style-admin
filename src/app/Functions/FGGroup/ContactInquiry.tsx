import { getAPIHeaders } from '../../../_metronic/helpers/AuthToken'
import { APIGet, APIPost } from '../../../_metronic/helpers/Utils'
import * as FGGroupEndpoints from '../../constants/fg_group_endpoints'

export function GetContactInquiry(
	query?: { inquiry_id?: string; subject?: string; unread_only?: boolean } & FGGroupSearchOptions &
		FGGroupPaginationOptions &
		FGGroupSortOptions
): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetContactInquiry, getAPIHeaders('three_style'), query)
}

export function GetRTPConsultancy(
	query?: { booking_id?: string } & FGGroupPaginationOptions & FGGroupSortOptions
): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetRTPConsultancyInquiry, getAPIHeaders('three_style'), query)
}

export function UpdateReadReceipt(body: {
	inquiry_id: string
	read_receipt: boolean
	additional_note?: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(
		FGGroupEndpoints.UpdateInquiryReadReceipt,
		getAPIHeaders('three_style'),
		undefined,
		body
	)
}
