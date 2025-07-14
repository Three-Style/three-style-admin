import { FG_GROUP_BASE_URL } from './base_URL'

// 🌟----------------- FG Group -----------------🌟
export const BASE_URL = FG_GROUP_BASE_URL
const AdminV1Route = `${BASE_URL}/admin/v1`
const PublicV1Route = `${BASE_URL}/public/v1`

// Account
export const Login = `${AdminV1Route}/login`
export const LoginWithEmailOTP = `${AdminV1Route}/login-with-otp`
export const VerifyEmailOTP = `${AdminV1Route}/login-with-otp/verify`
export const CreateAdminAccount = `${AdminV1Route}/create-admin`
export const GetProfile = `${AdminV1Route}/get-profile`
export const UpdateProfile = `${AdminV1Route}/update-profile`
export const ChangePassword = `${AdminV1Route}/change-password`
export const GetUniversalAccessToken = `${AdminV1Route}/get-universal-token`
export const FileUpload = `${AdminV1Route}/file-upload`

// Account/Authenticator [MFA]
const AccountAuthenticatorRoute = `${AdminV1Route}/mfa`

export const AddAuthenticatorSecret = `${AccountAuthenticatorRoute}/authenticator/add-secret`
export const RemoveAuthenticatorSecret = `${AccountAuthenticatorRoute}/authenticator/remove-secret`

// Admin User
const AdminUserRoute = `${AdminV1Route}/admin-user`

export const GetAdminUsers = `${AdminUserRoute}/get-admin`
export const UpdateAdminUsers = `${AdminUserRoute}/update-profile`
export const ResetAdminUserPassword = `${AdminUserRoute}/reset-password`
export const RemoveAdminUser = `${AdminUserRoute}/remove-admin`

// Books
const BookRoute = `${AdminV1Route}/book`

export const CreateBook = `${BookRoute}/create`
export const UpdateBook = `${BookRoute}/update`
export const RemoveBook = `${BookRoute}/remove`
export const GetBooks = `${BookRoute}/get`

// Books Feedback
export const GetBooksFeedback = `${AdminV1Route}/feedback/books` // GET
export const updateBooksFeedback = `${AdminV1Route}/feedback/book` // POST

// Contact Inquiry
const ContactInquiryRoute = AdminV1Route + '/contact-inquiry'

export const GetContactInquiry = `${ContactInquiryRoute}/get`
export const GetRTPConsultancyInquiry = `${ContactInquiryRoute}/get-rtp-consultancy`
export const UpdateInquiryReadReceipt = `${ContactInquiryRoute}/read-receipt`

// Dashboard
const DashboardRoute = `${AdminV1Route}/dashboard`

export const GeneralDashboardStats = `${DashboardRoute}/get-dashboard`
export const StudentDashboardStats = `${DashboardRoute}/get-student-stats`

// Fitness Course
const FitnessCourseRoute = `${AdminV1Route}/fitness-course`

export const CreateFitnessCourse = `${FitnessCourseRoute}/create`
export const UpdateFitnessCourse = `${FitnessCourseRoute}/update`
export const RemoveFitnessCourse = `${FitnessCourseRoute}/remove`
export const GetFitnessCourse = `${FitnessCourseRoute}/get`

// Fitness Course Lectures
const CourseLectureRoute = `${AdminV1Route}/fitness-course-lecture`

export const AddFitnessCourseLecture = `${CourseLectureRoute}/create`
export const UpdateFitnessCourseLecture = `${CourseLectureRoute}/update`
export const RemoveFitnessCourseLecture = `${CourseLectureRoute}/delete`
export const GetFitnessCourseLectures = `${CourseLectureRoute}/get`

// Fitness Course Exam [FCE]
const FitnessCourseExamRoute = `${AdminV1Route}/fitness-course-exam`

export const CreateFitnessCourseExam = `${FitnessCourseExamRoute}/create`
export const UpdateFitnessCourseExam = `${FitnessCourseExamRoute}/update`
export const RemoveFitnessCourseExam = `${FitnessCourseExamRoute}/remove`
export const GetFitnessCourseExam = `${FitnessCourseExamRoute}/get`
export const GetFitnessCourseResultExam = `${FitnessCourseExamRoute}/result/get`
export const UpdateFCEQuestion = `${FitnessCourseExamRoute}/question/update`
export const DeleteFCEQuestion = `${FitnessCourseExamRoute}/question/delete`

// Fitness Course Exam/Allocate
const FCEAllocationRoute = `${FitnessCourseExamRoute}/allocate`

export const FCEAllocate = `${FCEAllocationRoute}/assign`
export const UpdateFCEAllocation = `${FCEAllocationRoute}/update`
export const GetFCEAllocations = `${FCEAllocationRoute}/get`
export const RemoveFCEAllocation = `${FCEAllocationRoute}/remove`

// Fitness Course Exam/Result
const FCEResultRoute = `${FitnessCourseExamRoute}/result`

export const GetFCEResults = `${FCEResultRoute}/get`

// Fitness Course Feedback
export const GetFitnessCourseFeedback = `${AdminV1Route}/feedback/course` // GET
export const UpdateFitnessCourseFeedback = `${AdminV1Route}/feedback/course` // POST

// Order
const OrderRoute = `${AdminV1Route}/orders`

export const GetOrders = `${OrderRoute}/get`
export const FetchPaymentDetails = `${OrderRoute}/get-payment`
export const UpdateOrder = `${OrderRoute}/update-order`
export const SetBookTrackingStatus = `${BookRoute}/set-tracking-status`

// Product
const ProductRoute = `${AdminV1Route}/product`

export const AddProduct = `${ProductRoute}/add`
export const UpdateProduct = `${ProductRoute}/update`
export const GetProduct = `${ProductRoute}/get`
export const SetProductTrackingStatus = `${ProductRoute}/set-tracking-status`

// Categories
const CategoriesRoute = `${AdminV1Route}/categories`

export const AddCategories = `${CategoriesRoute}/add`
export const UpdateCategories = `${CategoriesRoute}/update`
export const GetCategories = `${CategoriesRoute}/get`

// Fabric
const FabricRoute = `${AdminV1Route}/fabric`

export const AddFabric = `${FabricRoute}/add`
export const UpdateFabric = `${FabricRoute}/update`
export const GetFabric = `${FabricRoute}/get`

// Sub Categories
const SubCategoriesRoute = `${AdminV1Route}/sub-categories`

export const AddSubCategories = `${SubCategoriesRoute}/add`
export const UpdateSubCategories = `${SubCategoriesRoute}/update`
export const GetSubCategories = `${SubCategoriesRoute}/get`

// Product/Product Review
const ProductReviewRoute = `${ProductRoute}/product-review`

export const GetProductReviews = `${ProductReviewRoute}/get`
export const UpdateProductReview = `${ProductReviewRoute}/update`

// Product/Project Feedback
const ProductFeedbackRoute = `${ProductRoute}/feedback`

export const GetProductFeedback = `${AdminV1Route}/feedback/products`
export const UpdateProductFeedback = `${ProductFeedbackRoute}/update`

// Referral Coupon
const ReferralCouponRoute = `${AdminV1Route}/referral-coupon`

export const CreateReferralCoupon = `${ReferralCouponRoute}/create`
export const UpdateReferralCoupon = `${ReferralCouponRoute}/update`
export const GetReferralCoupons = `${ReferralCouponRoute}/get`
export const GetCouponUsage = `${ReferralCouponRoute}/get-usage`

// Server Cache
const CacheManagerRoute = `${AdminV1Route}/cache-manager`

export const CleanGeneralCache = `${CacheManagerRoute}/general-cache`

// Users
const UserRoutes = `${AdminV1Route}/user`

export const GetUsers = `${UserRoutes}/get`
export const GetStudentUsers = `${UserRoutes}/get-student-user`
export const UpdateUser = `${UserRoutes}/update`
export const LockUnlockUser = `${UserRoutes}/lock`
export const RemoveUser = `${UserRoutes}/remove`
export const CreateUser = `${UserRoutes}/create`
export const SendFCMNotification = `${UserRoutes}/send-fcm-notification`
export const GetUserDietPreference = `${AdminV1Route}/diet-preference/get`

// Users > Fitness Plan
const UserFitnessPlanRoute = `${AdminV1Route}/user-fitness-plan`

export const GetUserFitnessPlan = `${UserFitnessPlanRoute}/get`

// Users > Fitness Course
const UserFitnessCourseRoute = `${AdminV1Route}/user-fitness-course`

export const GetUserFitnessCourse = `${UserFitnessCourseRoute}/get`
export const AssignFitnessCourseToUser = `${UserFitnessCourseRoute}/assign`
export const DeactivateFitnessCourse = `${UserFitnessCourseRoute}/deactivate`
export const ExtendFitnessCourseValidity = `${UserFitnessCourseRoute}/extend-validity`
export const GetFitnessCourseStudentReview = `${UserFitnessCourseRoute}/get-review`
export const FitnessCourseLectureComments = `${UserFitnessCourseRoute}/comment`
export const CreateFitnessCourseCertificate = `${UserFitnessCourseRoute}/create-certificate`
export const UpdateFitnessCourseCertificate = `${UserFitnessCourseRoute}/update-certificate`
export const GenerateFitnessCourseCertificate = `${UserFitnessCourseRoute}/generate-certificate`
export const GenerateFitnessCourseQRCertificate = `${UserFitnessCourseRoute}/generate-qr-certificate`
export const DeleteFitnessCourseCertificate = `${UserFitnessCourseRoute}/delete-certificate`
export const VerifyCertificate = `${PublicV1Route}/verify-certificate`

// Users > Fitness Course Exam
const UserDigitalPlanRoute = `${AdminV1Route}/user-digital-plan`

export const GetUserDigitalPlans = `${UserDigitalPlanRoute}/get`

//Product Cart
export const GetProductCart = `${AdminV1Route}/product-cart/get`

// Invoice
const InvoiceRoute = `${AdminV1Route}/invoice`

export const GetInvoices = `${InvoiceRoute}/get`
export const CreateInvoice = `${InvoiceRoute}/create`
export const UpdateInvoice = `${InvoiceRoute}/update`
export const DeleteInvoice = `${InvoiceRoute}/delete`
export const GetNextInvoiceSequence = `${InvoiceRoute}/get-next-invoice`
export const GetInvoiceStats = `${InvoiceRoute}/stats`

// Chat
const ChatRoute = `${AdminV1Route}/employee-chat`

export const GetEmployeeChatHistory = `${ChatRoute}`
export const GetChatEmployees = `${ChatRoute}/employee-list`

// Expense
const ExpenseRoute = `${AdminV1Route}/expense`

export const GetExpense = `${ExpenseRoute}/get`
export const CreateExpense = `${ExpenseRoute}/create`
export const UpdateExpense = `${ExpenseRoute}/update`
export const DeleteExpense = `${ExpenseRoute}/delete`
export const GetNextExpenseSequence = `${ExpenseRoute}/get-next-expense`

// Order Cart
const OrderCartRoute = `${AdminV1Route}/order-cart`

export const GetOrderCart = `${OrderCartRoute}/get`

// Stock management
const StockManagementRoute = `${AdminV1Route}/stock-management`

export const CreateStockManagement = `${StockManagementRoute}/create`
export const RemoveStockManagement = `${StockManagementRoute}/remove`
export const GetStockManagement = `${StockManagementRoute}/get`
export const UpdateStockManagement = `${StockManagementRoute}/update`

// Wishlist
const WishlistRoute = `${AdminV1Route}/wishlist`

export const GetWishlist = `${WishlistRoute}/get`
