let fgGroupBaseUrl = 'https://dev-api.threestyle.in',
// let fgGroupBaseUrl = 'http://localhost',
	// fwgBaseUrl = 'http://localhost:82'
	fwgBaseUrl = 'https://fg-app-dev-api.threestyle.in'

if (process.env.REACT_APP_NODE_ENV === 'production') {
	fgGroupBaseUrl = 'https://api.threestyle.in'
	fwgBaseUrl = 'https://app-api.threestyle.in'
}

export const FG_GROUP_FILE_BASE_URL = 'https://files.threestyle.in'
export const FG_GROUP_BASE_URL = fgGroupBaseUrl
export const FWG_BASE_URL = fwgBaseUrl
