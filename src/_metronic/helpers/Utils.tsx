import axios, { HttpStatusCode } from 'axios'
import toast from 'react-hot-toast'


import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import minMax from 'dayjs/plugin/minMax';
import duration from 'dayjs/plugin/duration';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(weekOfYear);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(isBetween);
dayjs.extend(minMax);
dayjs.extend(duration);
dayjs.extend(isToday);

export const DayJS = dayjs;
export function successToast(text: string) {
	toast.success(text || 'Success')
}
export function errorToast(text: string) {
	toast.error(text || 'Something went wrong')
}

export const APIGet = (
	APIEndpoint: string,
	headers?: object,
	queryString?: object,
	body?: object
): Promise<FGGroupAPIResponse | FWG_APIResponse> => {
	return new Promise((resolve, reject) => {
		axios
			.get(APIEndpoint, {
				headers: headers,
				params: queryString,
				data: body,
			})
			.then((responseJson) => {
				resolve(responseJson?.data)
			})
			.catch((error) => {
				if (error?.response?.data?.status === HttpStatusCode.Unauthorized) {
					localStorage.clear()
					window.location.href = '/'
				}
				reject(error?.response?.data || error)
			})
	})
}

export const APIPost = (
	APIEndpoint: string,
	headers?: object,
	queryString?: object,
	body?: object
): Promise<FGGroupAPIResponse | FWG_APIResponse> => {
	return new Promise((resolve, reject) => {
		axios
			.post(APIEndpoint, body, {
				headers: headers,
				params: queryString,
				data: body,
			})
			.then((responseJson) => {
				resolve(responseJson?.data)
			})
			.catch((error) => {
				if (error?.response?.data?.status === HttpStatusCode.Unauthorized) {
					localStorage.clear()
					window.location.href = '/'
				}
				reject(error?.response?.data || error)
			})
	})
}

export const APIPut = (
	APIEndpoint: string,
	headers?: object,
	queryString?: object,
	body?: object
): Promise<FGGroupAPIResponse | FWG_APIResponse> => {
	return new Promise((resolve, reject) => {
		axios
			.put(APIEndpoint, body, {
				headers: headers,
				params: queryString,
				data: body,
			})
			.then((responseJson) => {
				resolve(responseJson?.data)
			})
			.catch((error) => {
				if (error?.response?.data?.status === HttpStatusCode.Unauthorized) {
					localStorage.clear()
					window.location.href = '/'
				}
				reject(error?.response?.data || error)
			})
	})
}

export const APIPatch = (
	APIEndpoint: string,
	headers?: object,
	queryString?: object,
	body?: object
): Promise<FGGroupAPIResponse | FWG_APIResponse> => {
	return new Promise((resolve, reject) => {
		axios
			.patch(APIEndpoint, body, {
				headers: headers,
				params: queryString,
				data: body,
			})
			.then((responseJson) => {
				resolve(responseJson?.data)
			})
			.catch((error) => {
				if (error?.response?.data?.status === HttpStatusCode.Unauthorized) {
					localStorage.clear()
					window.location.href = '/'
				}
				reject(error?.response?.data || error)
			})
	})
}

export const APIDelete = (
	APIEndpoint: string,
	headers?: object,
	queryString?: object,
	body?: object
): Promise<FGGroupAPIResponse | FWG_APIResponse> => {
	return new Promise((resolve, reject) => {
		axios
			.delete(APIEndpoint, {
				headers: headers,
				params: queryString,
				data: body,
			})
			.then((responseJson) => {
				resolve(responseJson?.data)
			})
			.catch((error) => {
				if (error?.response?.data?.status === 401) {
					localStorage.clear()
					window.location.href = '/'
				}
				reject(error?.response?.data || error)
			})
	})
}
