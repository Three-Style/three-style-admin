import { getAPIHeaders } from '../../../_metronic/helpers/AuthToken'
import { APIDelete, APIGet, APIPatch, APIPost } from '../../../_metronic/helpers/Utils'
import { StudentBatchTimeTableType, TimeUnit } from '../../constants/fg_group.constants'
import * as FGGroupEndpoints from '../../constants/fg_group_endpoints'

export function CreateFitnessCourse(body: {
	course_name: string
	amount: number
	currency: string
	coaching_mode: 'VIRTUAL' | 'PHYSICAL'
	duration: number
	course_category: FitnessCourseType
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.CreateFitnessCourse, getAPIHeaders('three_style'), undefined, body)
}

export function UpdateFitnessCourse(body: {
	id: string
	amount?: number
	currency?: string
	course_name?: string
	course_category?: FitnessCourseType
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.UpdateFitnessCourse, getAPIHeaders('three_style'), undefined, body)
}

export function RemoveFitnessCourse(body: { id: string }): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.RemoveFitnessCourse, getAPIHeaders('three_style'), undefined, body)
}

export function GetFitnessCourse(
	query?: { id?: string } & FGGroupSearchOptions & FGGroupPaginationOptions & FGGroupSortOptions
): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetFitnessCourse, getAPIHeaders('three_style'), query)
}

// --- Fitness Course Lectures ---

export function AddLecture(body: {
	related_courses: string[]
	title: string
	video_url?: string
	pdf_files?: string
	description?: string
	lecture_index: number
	thumbnail_image?: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(
		FGGroupEndpoints.AddFitnessCourseLecture,
		getAPIHeaders('three_style'),
		undefined,
		body
	)
}

export function UpdateLecture(body: {
	lecture_id: string
	related_courses?: string[]
	title?: string
	video_url?: string
	pdf_files?: string
	description?: string
	thumbnail_image?: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(
		FGGroupEndpoints.UpdateFitnessCourseLecture,
		getAPIHeaders('three_style'),
		undefined,
		body
	)
}

export function DeleteLecture(body: { lecture_id: string }): Promise<FGGroupAPIResponse> {
	return APIPost(
		FGGroupEndpoints.RemoveFitnessCourseLecture,
		getAPIHeaders('three_style'),
		undefined,
		body
	)
}

export function GetLecture(
	query?: {
		lecture_id?: string
		course_id?: string
	} & FGGroupSearchOptions &
		FGGroupPaginationOptions &
		FGGroupSortOptions
): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetFitnessCourseLectures, getAPIHeaders('three_style'), query)
}

// --- Fitness Course Exam ---

export function CreateExam(body: {
	title: string
	description?: string
	exam_language: 'English' | 'Hindi'
	exam_course?: string[]
	duration?: number
	delay_allowed?: number
	shuffle_questions?: boolean
	shuffle_options?: boolean
	can_start_anytime?: boolean
}): Promise<FGGroupAPIResponse> {
	return APIPost(
		FGGroupEndpoints.CreateFitnessCourseExam,
		getAPIHeaders('three_style'),
		undefined,
		body
	)
}

export function UpdateExam(body: {
	exam_id: string
	title?: string
	description?: string
	exam_language?: 'English' | 'Hindi'
	exam_course?: string[]
	duration?: number
	delay_allowed?: number
	shuffle_questions?: boolean
	shuffle_options?: boolean
	can_start_anytime?: boolean
}): Promise<FGGroupAPIResponse> {
	return APIPost(
		FGGroupEndpoints.UpdateFitnessCourseExam,
		getAPIHeaders('three_style'),
		undefined,
		body
	)
}

export function GetExam(
	query?: { exam_id?: string } & FGGroupSearchOptions &
		FGGroupPaginationOptions &
		FGGroupSortOptions
): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetFitnessCourseExam, getAPIHeaders('three_style'), query)
}

export function GetResultExam(
	query?: {
		user_id?: string
		exam_id?: string
		allocation_id?: string
	} & FGGroupSearchOptions &
		FGGroupPaginationOptions &
		FGGroupSortOptions
): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetFitnessCourseResultExam, getAPIHeaders('three_style'), query)
}

export function DeleteExam(body: { exam_id: string }): Promise<FGGroupAPIResponse> {
	return APIPost(
		FGGroupEndpoints.RemoveFitnessCourseExam,
		getAPIHeaders('three_style'),
		undefined,
		body
	)
}

export function UpdateQuestion(body: {
	exam_id: string
	questions: {
		_id?: string
		question_index: number
		type: string
		question: string
		options: [{ _id?: string; option: string; is_correct: boolean }]
	}[]
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.UpdateFCEQuestion, getAPIHeaders('three_style'), undefined, body)
}

export function DeleteQuestion(body: {
	exam_id: string
	question_id: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.UpdateFCEQuestion, getAPIHeaders('three_style'), undefined, body)
}

export function AllocateExam(body: {
	exam_id: string
	attendees: { user_id: string; start_time: Date }[]
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.FCEAllocate, getAPIHeaders('three_style'), undefined, body)
}

export function UpdateAllocation(body: {
	exam_id: string
	attendees: { _id: string; start_time: Date }
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.UpdateFCEAllocation, getAPIHeaders('three_style'), undefined, body)
}

export function RemoveAllocation(body: {
	exam_id: string
	allocation_id: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(FGGroupEndpoints.RemoveFCEAllocation, getAPIHeaders('three_style'), undefined, body)
}

export function GetAllocation(
	query?: { exam_id?: string; search_user?: string } & FGGroupPaginationOptions & FGGroupSortOptions
): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetFCEAllocations, getAPIHeaders('three_style'), query)
}

export function GetResult(
	query?: {
		exam_id?: string
		user_id?: string
		allocation_id?: string
	} & FGGroupPaginationOptions &
		FGGroupSortOptions
): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetFCEResults, getAPIHeaders('three_style'), query)
}

// --- Fitness Course Feedback ---
export function GetFeedback(
	query?: { feedback_id?: string } & FGGroupSearchOptions &
		FGGroupPaginationOptions &
		FGGroupSortOptions
): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetFitnessCourseFeedback, getAPIHeaders('three_style'), query)
}

export function UpdateFeedback(body: {
	feedback_id: string
	status: FeedbackStatusValue
}): Promise<FGGroupAPIResponse> {
	return APIPost(
		FGGroupEndpoints.UpdateFitnessCourseFeedback,
		getAPIHeaders('three_style'),
		undefined,
		body
	)
}

// --- Fitness Course Lecture Comment ---
/**
 *
 * @param query
 * @param query.lecture_id
 * @param query.page This will fetch lectures wise pagination, so limit will be the number of lectures per page.
 * @param query.limit
 * @param query.comment_wise If true, will return comments in a thread wise format. Use comment_wise_* options to control the thread wise comments
 * @param query.comment_wise_sort
 * @param query.comment_wise_sortOrder
 * @param query.comment_wise_page
 * @param query.comment_wise_limit
 * @param query.comment_wise_skip
 * @param query.comment_wise_is_replied_by_admin
 */
export function GetLectureComments(query?: {
	lecture_id?: string
	page?: number
	limit?: number
	comment_wise?: boolean
	comment_wise_sort?: string
	comment_wise_sortOrder?: 'asc' | 'desc'
	comment_wise_page?: number
	comment_wise_limit?: number
	comment_wise_skip?: number
	comment_wise_is_replied_by_admin?: boolean
}): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.FitnessCourseLectureComments, getAPIHeaders('three_style'), query)
}

export function UpdateComment(body: {
	lecture_id: string
	comment_id: string
	reply_id?: string // replying to a comment thread
	comment: string
}): Promise<FGGroupAPIResponse> {
	return APIPatch(
		FGGroupEndpoints.FitnessCourseLectureComments,
		getAPIHeaders('three_style'),
		undefined,
		body
	)
}

export function CreateComment(body: {
	lecture_id: string
	comment_id?: string // Parent Comment ID if replying to a comment
	comment: string
}): Promise<FGGroupAPIResponse> {
	return APIPost(
		FGGroupEndpoints.FitnessCourseLectureComments,
		getAPIHeaders('three_style'),
		undefined,
		body
	)
}

export function DeleteComment(query: {
	lecture_id: string
	comment_id?: string
	reply_id?: string
}): Promise<FGGroupAPIResponse> {
	return APIDelete(
		FGGroupEndpoints.FitnessCourseLectureComments,
		getAPIHeaders('three_style'),
		query,
		undefined
	)
}

// --- User Fitness Course ---
export function GetUserFitnessCourses(
	query?: {
		user_id?: string
		user_fitness_course_id?: string
	} & FGGroupPaginationOptions &
		FGGroupSortOptions
): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetUserFitnessCourse, getAPIHeaders('three_style'), query)
}

export function AssignFitnessCourse(body: {
	user_id: string
	course_id: string
	amount?: number
	paid_amount?: number
	currency?: 'USD' | 'INR'
}): Promise<FGGroupAPIResponse> {
	return APIPost(
		FGGroupEndpoints.AssignFitnessCourseToUser,
		getAPIHeaders('three_style'),
		undefined,
		body
	)
}

export function DeactivateAssignedFitnessCourse(query: {
	user_fitness_course_id: string
}): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.DeactivateFitnessCourse, getAPIHeaders('three_style'), query)
}

export function ExtendFitnessCourseValidity(body: {
	user_fitness_course_id: string
	duration: string
	time_unit: TimeUnit
}): Promise<FGGroupAPIResponse> {
	return APIPost(
		FGGroupEndpoints.ExtendFitnessCourseValidity,
		getAPIHeaders('three_style'),
		undefined,
		body
	)
}

export function RemoveExtendedValidity(body: {
	user_fitness_course_extend_validity_id: string
}): Promise<FGGroupAPIResponse> {
	return APIDelete(
		FGGroupEndpoints.ExtendFitnessCourseValidity,
		getAPIHeaders('three_style'),
		undefined,
		body
	)
}

export function GetStudentCourseReviews(query?: {
	user_id?: string
	course_id?: string
}): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GetFitnessCourseStudentReview, getAPIHeaders('three_style'), query)
}

// --- User Fitness Course Certificate ---
export function CreateCertificate(
	body: FitnessCourseCertificateOptions
): Promise<FGGroupAPIResponse> {
	return APIPost(
		FGGroupEndpoints.CreateFitnessCourseCertificate,
		getAPIHeaders('three_style'),
		undefined,
		body
	)
}

export function UpdateFitnessCourseCertificate(body: {
	certificate_id: string
	file_url?: string
	certificate_data?: FitnessCourseCertificateOptions['certificate_data']
}): Promise<FGGroupAPIResponse> {
	return APIPost(
		FGGroupEndpoints.UpdateFitnessCourseCertificate,
		getAPIHeaders('three_style'),
		undefined,
		body
	)
}

export function DeleteCertificate(query?: { certificate_id: string }): Promise<FGGroupAPIResponse> {
	return APIDelete(
		FGGroupEndpoints.DeleteFitnessCourseCertificate,
		getAPIHeaders('three_style'),
		query
	)
}

export function GenerateCertificate(query: {
	certificate_id?: string
}): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.GenerateFitnessCourseCertificate, getAPIHeaders('three_style'), query)
}

export function GenerateQRCertificate(query: {
	certificate_id?: string
}): Promise<FGGroupAPIResponse> {
	return APIGet(
		FGGroupEndpoints.GenerateFitnessCourseQRCertificate,
		getAPIHeaders('three_style'),
		query
	)
}

export function verifyCertificate(query: { certificate_id: string }): Promise<FGGroupAPIResponse> {
	return APIGet(FGGroupEndpoints.VerifyCertificate, getAPIHeaders('three_style'), query)
}
