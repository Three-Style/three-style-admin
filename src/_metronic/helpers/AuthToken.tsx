export const getPlatformAuthorizationToken = (
	platform: 'fg_group' | 'fwg' | 'gcs'
): string | null => {
	return localStorage.getItem('auth_' + platform)
}

export function getAPIHeaders(
	platform: 'fg_group' | 'fwg' | 'gcs',
	additionalHeaders?: object
): object {
	return {
		'Content-Type': 'application/json',
		Authorization: getPlatformAuthorizationToken(platform),
		...additionalHeaders,
	}
}
