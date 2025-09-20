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
      
      // Reset form
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

  // Check if form is complete
  const isGatewayFormValid = newGateway.name.trim() !== "" && 
                            newGateway.credentials.apiKey.trim() !== "" && 
                            newGateway.credentials.secret.trim() !== ""

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">General Settings</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-1 sm:grid-cols-2 bg-gray-100 rounded-lg p-1 mb-6 gap-2 h-full w-full">
          <TabsTrigger 
            value="general" 
            className="px-3 py-2 data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-md text-sm sm:text-base"
          >
            <Settings className="h-4 w-4 ml-2" />
            General Settings
          </TabsTrigger>
          <TabsTrigger 
            value="payments" 
            className="px-3 py-2 data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-md text-sm sm:text-base"
          >
            <CreditCard className="h-4 w-4 ml-2" />
            Payment Gateways
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">General Site Information</CardTitle>
              <CardDescription>Set the general website name and contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGeneralSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="siteName" className="text-right block mb-2 text-sm sm:text-base">Site Name</Label>
                      <Input
                        id="siteName"
                        name="siteName"
                        value={generalForm.siteName}
                        onChange={handleGeneralChange}
                        placeholder="Site Name"
                        className="w-full text-right text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="siteUrl" className="text-right block mb-2 text-sm sm:text-base">Site URL</Label>
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
                      <Label htmlFor="email" className="text-right block mb-2 text-sm sm:text-base">Contact Email</Label>
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
                      <Label htmlFor="address" className="text-right block mb-2 text-sm sm:text-base">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={generalForm.address}
                        onChange={handleGeneralChange}
                        placeholder="Full Address"
                        className="w-full text-right text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-right block mb-2 text-sm sm:text-base">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={generalForm.phone}
                        onChange={handleGeneralChange}
                        placeholder="+1234567890"
                        className="w-full text-right text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="submit" className="bg-red-600 hover:bg-red-700 flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Gateways */}
        <TabsContent value="payments">
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl">Add New Payment Gateway</CardTitle>
                <CardDescription>Add and configure available payment gateways in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="gatewayName" className="block mb-2 text-sm sm:text-base">Gateway Name</Label>
                    <Input
                      id="gatewayName"
                      value={newGateway.name}
                      onChange={(e) => setNewGateway({...newGateway, name: e.target.value})}
                      placeholder="Payment Gateway Name"
                      className="w-full text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gatewayType" className="block mb-2 text-sm sm:text-base">Gateway Type</Label>
                    <Select 
                      value={newGateway.type} 
                      onValueChange={(value: "test" | "live") => setNewGateway({...newGateway, type: value})}
                    >
                      <SelectTrigger className="w-full text-sm sm:text-base">
                        <SelectValue placeholder="Select gateway type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="test">Test</SelectItem>
                        <SelectItem value="live">Live</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="apiKey" className="block mb-2 text-sm sm:text-base">API Key</Label>
                    <Input
                      id="apiKey"
                      value={newGateway.credentials.apiKey}
                      onChange={(e) => setNewGateway({
                        ...newGateway, 
                        credentials: {...newGateway.credentials, apiKey: e.target.value}
                      })}
                      placeholder="Enter API Key"
                      className="w-full text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="apiSecret" className="block mb-2 text-sm sm:text-base">Secret Key</Label>
                    <div className="relative">
                      <Input
                        id="apiSecret"
                        type={showApiSecret ? "text" : "password"}
                        value={newGateway.credentials.secret}
                        onChange={(e) => setNewGateway({
                          ...newGateway, 
                          credentials: {...newGateway.credentials, secret: e.target.value}
                        })}
                        placeholder="Enter Secret Key"
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
                    {newGateway.status ? "Enabled" : "Disabled"}
                  </Label>
                </div>
                <Button 
                  onClick={handleAddGateway} 
                  disabled={!isGatewayFormValid}
                  className="bg-red-600 hover:bg-red-700 flex items-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                  Add Gateway
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl">Available Payment Gateways</CardTitle>
                <CardDescription>List of all configured payment gateways in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-sm sm:text-base">Gateway Name</TableHead>
                        <TableHead className="text-sm sm:text-base">Type</TableHead>
                        <TableHead className="text-sm sm:text-base">Status</TableHead>
                        <TableHead className="text-sm sm:text-base">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentGateways && paymentGateways.length > 0 ? (
                        paymentGateways.map((gateway) => (
                          <TableRow key={gateway.id}>
                            <TableCell className="text-sm sm:text-base">{gateway.name}</TableCell>
                            <TableCell>
                              <Badge variant={gateway.type === 'live' ? 'default' : 'secondary'} className="text-xs sm:text-sm">
                                {gateway.type === 'live' ? 'Live' : 'Test'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Switch 
                                  checked={gateway.status} 
                                  onCheckedChange={(checked) => handleToggleGatewayStatus(gateway, checked)}
                                />
                                <Label className="text-sm sm:text-base">{gateway.status ? 'Enabled' : 'Disabled'}</Label>
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
                            No payment gateways added yet
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