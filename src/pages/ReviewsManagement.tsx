import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Star, Search, Trash2, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  selectFilteredReviews,
  selectFilters,
  setRatingFilter,
  setSearchFilter,
  deleteReview,
} from "@/store/reviewsSlice"
import type { Review } from "@/store/reviewsSlice"

const ReviewsManagement: React.FC = () => {
  const dispatch = useDispatch()
  const reviews = useSelector(selectFilteredReviews)
  const filters = useSelector(selectFilters)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchFilter(e.target.value))
  }

  const handleFilterChange = (value: string) => {
    dispatch(setRatingFilter(value))
  }

  const handleDeleteReview = (id: string) => {
    if (window.confirm("هل أنت متأكد من أنك تريد حذف هذه المراجعة؟")) {
      dispatch(deleteReview(id))
    }
  }

  const handleRowClick = (review: Review) => {
    setSelectedReview(review)
    setIsDetailOpen(true)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-3 w-3 sm:h-4 sm:w-4 ${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const getAvatar = (name: string) => {
    const initials = name.split(" ").map(n => n[0]).join("")
    return (
      <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
        <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=ffffff`} alt={name} />
        <AvatarFallback className="text-xs sm:text-sm">{initials}</AvatarFallback>
      </Avatar>
    )
  }

  // دالة للحصول على لون الحالة
  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      "مقبولة": "bg-green-100 text-green-800",
      "قيد المراجعة": "bg-yellow-100 text-yellow-800",
      "مرفوضة": "bg-red-100 text-red-800"
    }
    return statusColors[status] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* العنوان وأزرار التصفية */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">إدارة المراجعات</h1>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="بحث عن المراجعات..."
                  className="pr-10 w-full"
                  value={filters.search}
                  onChange={handleSearchChange}
                />
              </div>
              
              <div className="flex gap-2">
                {/* زر التصفية للشاشات الصغيرة */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="sm:hidden flex-1">
                      <Filter className="h-4 w-4 ml-2" />
                      تصفية
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => handleFilterChange("all")}>
                      جميع التقييمات
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange("5")}>
                      5 نجوم
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange("4")}>
                      4 نجوم
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange("3")}>
                      3 نجوم
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange("2")}>
                      2 نجوم
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange("1")}>
                      1 نجمة
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* قائمة التصفية للشاشات الكبيرة */}
                <Select value={filters.rating} onValueChange={handleFilterChange}>
                  <SelectTrigger className="hidden sm:flex w-[180px] border-gray-300">
                    <SelectValue placeholder="تصفية حسب التقييم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع التقييمات</SelectItem>
                    <SelectItem value="5">5 نجوم</SelectItem>
                    <SelectItem value="4">4 نجوم</SelectItem>
                    <SelectItem value="3">3 نجوم</SelectItem>
                    <SelectItem value="2">2 نجوم</SelectItem>
                    <SelectItem value="1">1 نجمة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* بطاقات المراجعات للشاشات الصغيرة */}
          <div className="lg:hidden space-y-4">
            {reviews.length === 0 ? (
              <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
                لا توجد مراجعات تطابق معايير البحث
              </div>
            ) : (
              reviews.map((review: Review) => (
                <Card 
                  key={review.id} 
                  className="overflow-hidden cursor-pointer"
                  onClick={() => handleRowClick(review)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {getAvatar(review.author)}
                        <div>
                          <CardTitle className="text-sm">{review.author}</CardTitle>
                          <CardDescription className="text-xs">{review.projectName}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(review.status)}>
                        {review.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">{review.comment}</p>
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteReview(review.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* جدول المراجعات للشاشات الكبيرة */}
          <div className="hidden lg:block bg-white rounded-lg shadow-sm border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">المراجع</TableHead>
                  <TableHead className="text-right">المشروع</TableHead>
                  <TableHead className="text-center">التقييم</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">المراجعة</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review: Review) => (
                  <TableRow 
                    key={review.id} 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRowClick(review)}
                  >
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <span>{review.author}</span>
                        {getAvatar(review.author)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{review.projectName}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        {renderStars(review.rating)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className={getStatusColor(review.status)}>
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm text-gray-700 max-w-xs truncate">
                      {review.comment}
                    </TableCell>
                    <TableCell className="text-right">{review.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteReview(review.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {reviews.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                لا توجد مراجعات تطابق معايير البحث
              </div>
            )}
          </div>
        </div>
      </main>

      {/* تفاصيل المراجعة في عرض الجوال */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedReview && (
            <>
              <DialogHeader>
                <DialogTitle className="flex justify-between items-center">
                  <span>تفاصيل المراجعة</span>
                </DialogTitle>
                <DialogDescription>
                  مراجعة من {selectedReview.author} لمشروع {selectedReview.projectName}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getAvatar(selectedReview.author)}
                    <div>
                      <p className="font-medium">{selectedReview.author}</p>
                      <p className="text-sm text-gray-500">{selectedReview.projectName}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(selectedReview.status)}>
                    {selectedReview.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {renderStars(selectedReview.rating)}
                  </div>
                  <span className="text-sm text-gray-500">{selectedReview.date}</span>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">نص المراجعة:</h4>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {selectedReview.comment}
                  </p>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteReview(selectedReview.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 ml-2 text-red-500" />
                    حذف المراجعة
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ReviewsManagement