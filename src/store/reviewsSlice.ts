import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// Define Review interface
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
      projectName: "Mobile App Development",
      author: "Sara Khatir",
      rating: 4,
      comment: "Good work, but there were some issues in certain areas. The integration process was smooth",
      date: "2024-01-10",
      status: "Accepted"
    },
    {
      id: "2",
      projectName: "Digital Marketing Campaign",
      author: "Ahmed Mohamed",
      rating: 5,
      comment: "The marketing campaign resulted in increased user base and engagement, based on analysis",
      date: "2024-01-12",
      status: "Accepted"
    },
    {
      id: "3",
      projectName: "Website Delivery Setup",
      author: "Mohamed Ali",
      rating: 3,
      comment: "The project was acceptable but there were some delays that affected the timeline",
      date: "2024-01-14",
      status: "Under Review"
    },
    {
      id: "4",
      projectName: "API Integration Setup",
      author: "Fatima Ibrahim",
      rating: 2,
      comment: "Overall code quality had errors and access issues in the command space, basic functionality was affected",
      date: "2024-01-15",
      status: "Rejected"
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

// Export all actions
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