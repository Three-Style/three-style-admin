import { HttpStatusCode } from 'axios'
import { getAPIHeaders } from '../../../_metronic/helpers/AuthToken'
import { APIGet, APIPost } from '../../../_metronic/helpers/Utils'
import * as FGGroupEndpoints from '../../constants/fg_group_endpoints'

// FG FG Group
export async function LoginFGGroup(data: {
	email: string
	password: string
	authenticator_token?: string
}): Promise<FGGroupAPIResponse> {
	return await APIPost(FGGroupEndpoints.Login, undefined, undefined, data)
		.then(async (response: any) => {
			if (response.status === HttpStatusCode.Ok) {
				localStorage.setItem('@threestyle+auth', response.data.authorization)
				return await GetUniversalAccessTokens()
			} else {
				return response
			}
		})
		.catch((error) => error)
}

// Login with Email-Password and OTP
export function LoginWithEmailPasswordOTP(data: {
	email: string
	password: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.LoginWithEmailOTP, undefined, undefined, data)
}

export async function VerifyEmailOTP(data: {
	verification_id: string
	otp: string
}): Promise<FGGroupAPIResponse> {
	return await APIPost(FGGroupEndpoints.VerifyEmailOTP, undefined, undefined, data)
		.then(async (response: any) => {
			if (response.status === HttpStatusCode.Ok) {
				localStorage.setItem('@threestyle+auth', response.data.authorization)
				return await GetUniversalAccessTokens()
			} else {
				return response
			}
		})
		.catch((error) => error)
}

export async function GetUniversalAccessTokens(): Promise<FGGroupAPIResponse> {
	return await APIGet(FGGroupEndpoints.GetUniversalAccessToken, {
		Authorization: localStorage.getItem('@threestyle+auth'),
	})
		.then((response: any) => {
			if (response.status !== 200) throw response
			if (response?.data?.length) {
				const currentUrl = window.location.pathname
				response?.data.forEach((item: { platform: string; access: string }) => {
					if (item.platform && item.access) {
						localStorage.setItem('auth_' + item.platform, item.access)
						if (currentUrl === '/employee/login') {
							localStorage.setItem('admin', 'Employee')
						} else if (currentUrl === '/master/login') {
							localStorage.setItem('admin', 'Master')
						} else if (currentUrl === '/nutrition/login') {
							localStorage.setItem('admin', 'Store')
						} else if (currentUrl === '/fwg-master/login') {
							localStorage.setItem('admin', 'Vesu-Master')
						} else if (currentUrl === '/portal/login') {
							localStorage.setItem('admin', 'FWG')
						} else if (currentUrl === '/trainer/login') {
							localStorage.setItem('admin', 'Trainer')
						} else {
							localStorage.setItem('admin', 'THREE-STYLE')
						}
					}
				})
				// window.location.href = '/'
			}
			return response
		})
		.catch((error) => error)
		.finally(() => {
			localStorage.removeItem('@threestyle+auth')
		})
}

export function getProfile(): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetProfile, getAPIHeaders('three_style'))
}

export function UpdateProfile(data: {
	first_name?: string
	last_name?: string
	birth_date?: string
	email?: string
	phone?: string
	address_line_1?: string
	address_line_2?: string
	city?: string
	state?: string
	pin_code?: string
	country?: string
	fcm_token?: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.UpdateProfile, getAPIHeaders('three_style'), undefined, data)
}

/**
 * Change the password for the user.
 * @param data - An object containing the new password and the old password.
 * @returns A Promise that resolves to the result of the API call.
 */
export function ChangePassword(data: {
	password: string
	old_password: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.ChangePassword, getAPIHeaders('three_style'), undefined, data)
}

export function AddAuthenticatorSecret(body: {
	secret: string
	remark: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(
		FGGroupEndpoints.AddAuthenticatorSecret,
		getAPIHeaders('three_style'),
		undefined,
		body
	)
}

export function RemoveAuthenticatorSecret(body: {
	secret_id: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(
		FGGroupEndpoints.RemoveAuthenticatorSecret,
		getAPIHeaders('three_style'),
		undefined,
		body
	)
}

export function FileUploadToFGGroup(
	files: any,
	body: { directory: string } = { directory: 'files' }
): Promise<FGGroupAPIResponse> | null {
	if (!files) {
		return null
	}

	const formData = new FormData()

	formData.append('directory', body.directory)

	if (!Array.isArray(files)) {
		files = [files]
	}

	files.forEach((file: any) => {
		file.fileURL = URL.createObjectURL(file)
		formData.append('files', file)
	})

	return APIPost(
		FGGroupEndpoints.FileUpload,
		getAPIHeaders('three_style', { 'Content-Type': 'multipart/form-data' }),
		undefined,
		formData
	)
}
