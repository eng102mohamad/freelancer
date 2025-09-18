
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// تعريف واجهة Review
export interface Review {
  id: string
  projectName: string
  author: string
  rating: number
  comment: string
  date: string
  status: string
}

interface ReviewsState {
  reviews: Review[]
  filters: {
    rating: string
    search: string
  }
}

const initialState: ReviewsState = {
  reviews: [
    {
      id: "1",
      projectName: "تطوير تطبيق جوال",
      author: "سارة خاطر",
      rating: 4,
      comment: "عمل جيد، وإخبارنا الرقمات في بعض العوامل. كانت عملية التكامل سلسة",
      date: "2024-01-10",
      status: "مقبولة"
    },
    {
      id: "2",
      projectName: "حملة تسويقية رقمية",
      author: "أحمد محمد",
      rating: 5,
      comment: "تلتوي لذلك من الحملة التسويقية زيادة أعضاء في القاعدة والتفاعلات، بناءً على التحليل",
      date: "2024-01-12",
      status: "مقبولة"
    },
    {
      id: "3",
      projectName: "إعداد تسليم الموقع الإلكتروني",
      author: "محمد علي",
      rating: 3,
      comment: "كان المشروع مقبولا لكن كانت هناك بعض التأخيرات هي الشباب ما أقر على الجدول الزمني",
      date: "2024-01-14",
      status: "قيد المراجعة"
    },
    {
      id: "4",
      projectName: "API إعداد واجهة برمجة التطبيقات",
      author: "فاطمة إبراهيم",
      rating: 2,
      comment: "جودة برمجية عامة في الخطأ والوصول بين مساحة القيادة في يتم إشارة من المناسبات الأساسية",
      date: "2024-01-15",
      status: "مرفوضة"
    }
  ],
  filters: {
    rating: "all",
    search: ""
  }
}

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    deleteReview: (state, action: PayloadAction<string>) => {
      state.reviews = state.reviews.filter(review => review.id !== action.payload)
    },
    setRatingFilter: (state, action: PayloadAction<string>) => {
      state.filters.rating = action.payload
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
    }
  }
})

// تصدير جميع الـ actions
export const { 
  deleteReview, 
  setRatingFilter, 
  setSearchFilter 
} = reviewsSlice.actions

export default reviewsSlice.reducer

// Selector functions
export const selectAllReviews = (state: { reviews: ReviewsState }) => state.reviews.reviews
export const selectFilters = (state: { reviews: ReviewsState }) => state.reviews.filters
export const selectFilteredReviews = (state: { reviews: ReviewsState }) => {
  const { reviews, filters } = state.reviews
  return reviews.filter(review => {
    const matchesRating = filters.rating === "all" || review.rating.toString() === filters.rating
    const matchesSearch = review.projectName.includes(filters.search) || 
                          review.comment.includes(filters.search) ||
                          review.author.includes(filters.search)
    return matchesRating && matchesSearch
  })
}