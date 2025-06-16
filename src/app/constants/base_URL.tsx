// let fgGroupBaseUrl = 'https://dev-api.fggroup.in',
let fgGroupBaseUrl = 'http://localhost',
	// fwgBaseUrl = 'http://localhost:82',
	fwgBaseUrl = 'https://fg-app-dev-api.fggroup.in',
	gcsBaseUrl = 'https://dev-api.gcsconsultant.com'

if (process.env.REACT_APP_NODE_ENV === 'production') {
	fgGroupBaseUrl = 'https://api.fggroup.in'
	fwgBaseUrl = 'https://app-api.fggroup.in'
	gcsBaseUrl = 'https://api.gcsconsultant.com'
}

export const FG_GROUP_FILE_BASE_URL = 'https://files.fggroup.in'
export const FG_GROUP_BASE_URL = fgGroupBaseUrl
export const FWG_BASE_URL = fwgBaseUrl
export const GCS_BASE_URL = gcsBaseUrl
