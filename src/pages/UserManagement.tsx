import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { deleteUser } from '@/store/userSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import AddUserForm from '@/components/AddUserForm';

export default function UserManagement() {
    const [search, setSearch] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { users, loading, error } = useAppSelector((state) => state.users);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleDeleteUser = (id: number) => {
        if (window.confirm('هل أنت متأكد من أنك تريد حذف هذا المستخدم؟')) {
            dispatch(deleteUser(id));
        }
    };

    const handleAddUserSuccess = () => {
        setIsDialogOpen(false);
    };

    if (loading) {
        return <div className="p-6">جاري التحميل...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-500">خطأ: {error}</div>;
    }

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>إدارة المستخدمين</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="البحث عن المستخدمين..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pr-10 text-right"
                            />
                        </div>

                        {/* زر فتح نموذج إضافة مستخدم */}
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="flex items-center gap-2">
                                    <Plus className="h-4 w-4" />
                                    إضافة مستخدم
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>إضافة مستخدم جديد</DialogTitle>
                                </DialogHeader>
                                <AddUserForm onClose={() => setIsDialogOpen(false)} />
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-right">صورة رمزية</TableHead>
                                <TableHead className="text-right">الاسم</TableHead>
                                <TableHead className="text-right">البريد الإلكتروني</TableHead>
                                <TableHead className="text-right">الدور</TableHead>
                                <TableHead className="text-right">الحالة</TableHead>
                                <TableHead className="text-right">الإجراءات</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-600 font-semibold">
                                                {user.name.charAt(0)}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">{user.name}</TableCell>
                                    <TableCell className="text-right">{user.email}</TableCell>
                                    <TableCell className="text-right">{user.role}</TableCell>
                                    <TableCell className="text-right">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                user.status === 'نشط'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}
                                        >   
                                            {user.status === 'نشط' ? (
                                                <CheckCircle className="h-3 w-3 ml-1" />
                                            ) : (
                                                <XCircle className="h-3 w-3 ml-1" />
                                            )}
                                            {user.status}
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
                                                onClick={() => handleDeleteUser(user.id)}
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