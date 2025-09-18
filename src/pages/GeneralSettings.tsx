import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Settings,
  CreditCard,
  Save,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  selectGeneralSettings,
  selectPaymentGateways,
  updateGeneralSettings,
  addPaymentGateway,
  updatePaymentGateway,
  deletePaymentGateway,
} from "@/store/settingsSlice"
import type { AppDispatch, RootState } from "@/store"

const GeneralSettings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const generalSettings = useSelector(selectGeneralSettings)
  const paymentGateways = useSelector(selectPaymentGateways)
  const [showApiSecret, setShowApiSecret] = useState(false)

  const [generalForm, setGeneralForm] = useState({
    siteName: generalSettings?.siteName || "",
    siteUrl: generalSettings?.siteUrl || "",
    email: generalSettings?.email || "",
    address: generalSettings?.address || "",
    phone: generalSettings?.phone || "",
  })

  const [newGateway, setNewGateway] = useState({
    name: "",
    type: "test" as "test" | "live",
    status: false,
    credentials: { apiKey: "", secret: "" }
  })

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setGeneralForm(prev => ({ ...prev, [name]: value }))
  }

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(updateGeneralSettings(generalForm))
  }

  const handleAddGateway = () => {
    if (newGateway.name && newGateway.credentials.apiKey && newGateway.credentials.secret) {
      dispatch(addPaymentGateway({
        ...newGateway,
        id: Date.now().toString(),
      }))
      
      // إعادة تعيين النموذج
      setNewGateway({
        name: "",
        type: "test",
        status: false,
        credentials: { apiKey: "", secret: "" }
      })
    }
  }

  const handleToggleGatewayStatus = (gateway: any, checked: boolean) => {
    dispatch(updatePaymentGateway({ 
      ...gateway, 
      status: checked,
    }))
  }

  // التحقق من أن النموذج مكتمل
  const isGatewayFormValid = newGateway.name.trim() !== "" && 
                            newGateway.credentials.apiKey.trim() !== "" && 
                            newGateway.credentials.secret.trim() !== ""

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">الإعدادات العامة</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-1 sm:grid-cols-2 bg-gray-100 rounded-lg p-1 mb-6 gap-2 h-full w-full">
          <TabsTrigger 
            value="general" 
            className="px-3 py-2 data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-md text-sm sm:text-base"
          >
            <Settings className="h-4 w-4 ml-2" />
            الإعدادات العامة
          </TabsTrigger>
          <TabsTrigger 
            value="payments" 
            className="px-3 py-2 data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-md text-sm sm:text-base"
          >
            <CreditCard className="h-4 w-4 ml-2" />
            بوابات الدفع
          </TabsTrigger>
        </TabsList>

        {/* الإعدادات العامة */}
        <TabsContent value="general" dir="rtl">
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">معلومات الموقع العامة</CardTitle>
              <CardDescription>تحديد الاسم العام لموقع الويب وتفاصيل الاتصال</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGeneralSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="siteName" className="text-right block mb-2 text-sm sm:text-base">اسم الموقع</Label>
                      <Input
                        id="siteName"
                        name="siteName"
                        value={generalForm.siteName}
                        onChange={handleGeneralChange}
                        placeholder="اسم الموقع"
                        className="w-full text-right text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="siteUrl" className="text-right block mb-2 text-sm sm:text-base">عنوان URL للموقع</Label>
                      <Input
                        id="siteUrl"
                        name="siteUrl"
                        value={generalForm.siteUrl}
                        onChange={handleGeneralChange}
                        placeholder="https://www.example.com"
                        className="w-full text-right text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-right block mb-2 text-sm sm:text-base">البريد الإلكتروني للاتصال</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={generalForm.email}
                        onChange={handleGeneralChange}
                        placeholder="contact@example.com"
                        className="w-full text-right text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address" className="text-right block mb-2 text-sm sm:text-base">العنوان</Label>
                      <Input
                        id="address"
                        name="address"
                        value={generalForm.address}
                        onChange={handleGeneralChange}
                        placeholder="العنوان الكامل"
                        className="w-full text-right text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-right block mb-2 text-sm sm:text-base">رقم الهاتف</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={generalForm.phone}
                        onChange={handleGeneralChange}
                        placeholder="963xxxxxxxxx+"
                        className="w-full text-right text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="submit" className="bg-red-600 hover:bg-red-700 flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
                    <Save className="h-4 w-4" />
                    حفظ التغييرات
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* بوابات الدفع */}
        <TabsContent value="payments">
          <div className="space-y-6">
            <Card dir="rtl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl">إضافة بوابة دفع جديدة</CardTitle>
                <CardDescription>قم بإضافة وتكوين بوابات الدفع المتاحة في النظام</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="gatewayName" className="block mb-2 text-sm sm:text-base">اسم البوابة</Label>
                    <Input
                      id="gatewayName"
                      value={newGateway.name}
                      onChange={(e) => setNewGateway({...newGateway, name: e.target.value})}
                      placeholder="اسم بوابة الدفع"
                      className="w-full text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gatewayType" className="block mb-2 text-sm sm:text-base">نوع البوابة</Label>
                    <Select 
                      value={newGateway.type} 
                      onValueChange={(value: "test" | "live") => setNewGateway({...newGateway, type: value})}
                    >
                      <SelectTrigger className="w-full text-sm sm:text-base">
                        <SelectValue placeholder="اختر نوع البوابة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="test">تجريبي</SelectItem>
                        <SelectItem value="live">فعلي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="apiKey" className="block mb-2 text-sm sm:text-base">مفتاح API</Label>
                    <Input
                      id="apiKey"
                      value={newGateway.credentials.apiKey}
                      onChange={(e) => setNewGateway({
                        ...newGateway, 
                        credentials: {...newGateway.credentials, apiKey: e.target.value}
                      })}
                      placeholder="أدخل مفتاح API"
                      className="w-full text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="apiSecret" className="block mb-2 text-sm sm:text-base">الرمز السري</Label>
                    <div className="relative">
                      <Input
                        id="apiSecret"
                        type={showApiSecret ? "text" : "password"}
                        value={newGateway.credentials.secret}
                        onChange={(e) => setNewGateway({
                          ...newGateway, 
                          credentials: {...newGateway.credentials, secret: e.target.value}
                        })}
                        placeholder="أدخل الرمز السري"
                        className="w-full text-sm sm:text-base pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowApiSecret(!showApiSecret)}
                      >
                        {showApiSecret ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Switch 
                    id="gatewayStatus"
                    checked={newGateway.status}
                    onCheckedChange={(checked) => setNewGateway({...newGateway, status: checked})}
                  />
                  <Label htmlFor="gatewayStatus" className="text-sm sm:text-base">
                    {newGateway.status ? "مفعل" : "معطل"}
                  </Label>
                </div>
                <Button 
                  onClick={handleAddGateway} 
                  disabled={!isGatewayFormValid}
                  className="bg-red-600 hover:bg-red-700 flex items-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                  إضافة بوابة
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl">بوابات الدفع المتاحة</CardTitle>
                <CardDescription>قائمة بجميع بوابات الدفع المكونة في النظام</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-sm sm:text-base">اسم البوابة</TableHead>
                        <TableHead className="text-sm sm:text-base">النوع</TableHead>
                        <TableHead className="text-sm sm:text-base">الحالة</TableHead>
                        <TableHead className="text-sm sm:text-base">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentGateways && paymentGateways.length > 0 ? (
                        paymentGateways.map((gateway) => (
                          <TableRow key={gateway.id}>
                            <TableCell className="text-sm sm:text-base">{gateway.name}</TableCell>
                            <TableCell>
                              <Badge variant={gateway.type === 'live' ? 'default' : 'secondary'} className="text-xs sm:text-sm">
                                {gateway.type === 'live' ? 'فعلي' : 'تجريبي'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Switch 
                                  checked={gateway.status} 
                                  onCheckedChange={(checked) => handleToggleGatewayStatus(gateway, checked)}
                                />
                                <Label className="text-sm sm:text-base">{gateway.status ? 'مفعل' : 'معطل'}</Label>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => dispatch(deletePaymentGateway(gateway.id))}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                            لا توجد بوابات دفع مضافة حتى الآن
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default GeneralSettings