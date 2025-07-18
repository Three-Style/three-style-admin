export const getPlatformAuthorizationToken = (
	platform: 'three_style'
): string | null => {
	return localStorage.getItem('auth_' + platform)
}

export function getAPIHeaders(
	platform: 'three_style',
	additionalHeaders?: object
): object {
	return {
		'Content-Type': 'application/json',
		Authorization: getPlatformAuthorizationToken(platform),
		...additionalHeaders,
	}
}
