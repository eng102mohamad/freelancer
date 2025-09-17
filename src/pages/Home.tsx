import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">مرحباً بك في نظامنا</h1>
          <p className="text-gray-600 mb-6">منصة متكاملة لإدارة المشاريع والمستخدمين</p>
          
          <div className="space-y-4">
            <Link
              to="/dashboard"
              className="block w-full bg-red-600 text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-red-700 transition duration-200"
            >
              الانتقال إلى لوحة التحكم
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}