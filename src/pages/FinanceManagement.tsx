import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { deleteTransaction } from '@/store/financeSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, RefreshCw, XCircle, Clock, CheckCircle, Trash2, Edit, Filter, DollarSign } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AddTransactionForm from '@/components/AddTransactionForm';
import BarChart from '@/components/BarChart';

export default function FinanceManagement() {
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  
  const { transactions, totalRevenue, pendingTransactions, monthlyRevenue } = useAppSelector((state) => state.finance);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.user.toLowerCase().includes(search.toLowerCase()) ||
    transaction.id.includes(search)
  );

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm('هل أنت متأكد من أنك تريد حذف هذه المعاملة؟')) {
      dispatch(deleteTransaction(id));
    }
  };

  const monthlyRevenueData = [
    { month: 'يناير', revenue: 14000 },
    { month: 'فبراير', revenue: 16000 },
    { month: 'مارس', revenue: 21000 },
    { month: 'أبريل', revenue: 19000 },
    { month: 'مايو', revenue: 23000 },
    { month: 'يونيو', revenue: monthlyRevenue },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">إجمالي الإيرادات</CardTitle>
            <RefreshCw className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">زيادة %15 عن الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">السحوبات المعلقة</CardTitle>
            <Search className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${pendingTransactions.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">مراجعة 5 طلبات</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">معاملات متأخرة</CardTitle>
            <XCircle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">8</div>
            <p className="text-sm text-gray-500 mt-1">تحتاج إلى تحقيق عاجل</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">إيرادات الشهر الحالي</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${monthlyRevenue.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">وأفق للترقيات</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>الإيرادات الشهرية</CardTitle>
          <p className="text-sm text-gray-500">الإيرادات الإجمالية خلال الأشهر الستة الماضية.</p>
        </CardHeader>
        <CardContent>
          <BarChart data={monthlyRevenueData} />
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>سجل المعاملات</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              تصنيف
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-1" />
                  معاملة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>إضافة معاملة جديدة</DialogTitle>
                </DialogHeader>
                <AddTransactionForm onClose={() => setIsDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث عن المعاملات..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-10 text-right"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">معرف المعاملة</TableHead>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">المستخدم</TableHead>
                <TableHead className="text-right">النوع</TableHead>
                <TableHead className="text-right">المبلغ</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow key={tx.id} className={tx.status === 'معلقة' ? 'bg-red-50' : ''}>
                  <TableCell className="text-right">{tx.id}</TableCell>
                  <TableCell className="text-right">{tx.date}</TableCell>
                  <TableCell className="text-right">{tx.user}</TableCell>
                  <TableCell className="text-right">{tx.type}</TableCell>
                  <TableCell className={`text-right ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.amount > 0 ? '+' : ''}${tx.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        tx.status === 'مكتملة'
                          ? 'bg-green-100 text-green-800'
                          : tx.status === 'معلقة'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {tx.status === 'مكتملة' && <CheckCircle className="h-3 w-3 ml-1" />}
                      {tx.status === 'معلقة' && <Clock className="h-3 w-3 ml-1" />}
                      {tx.status === 'منتهية' && <XCircle className="h-3 w-3 ml-1" />}
                      {tx.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteTransaction(tx.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}