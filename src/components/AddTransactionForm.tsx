import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppDispatch } from '@/hooks/redux';
import { addTransaction } from '@/store/financeSlice';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  id: z.string().min(1, "معرف المعاملة مطلوب"),
  user: z.string().min(1, "اسم المستخدم مطلوب"),
  type: z.enum(['Deposit', 'Withdrawal']),
  amount: z.number().min(0.01, "المبلغ يجب أن يكون أكبر من صفر"),
  status: z.enum(['مكتملة', 'معلقة', 'منتهية']),
});

interface AddTransactionFormProps {
  onClose: () => void;
}

export default function AddTransactionForm({ onClose }: AddTransactionFormProps) {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      user: '',
      type: 'Deposit',
      amount: 0,
      status: 'مكتملة',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const newTransaction = {
      ...values,
      date: new Date().toISOString().split('T')[0],
    };
    dispatch(addTransaction(newTransaction));
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>معرف المعاملة</FormLabel>
              <FormControl>
                <Input placeholder="TXN001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem>
              <FormLabel>المستخدم</FormLabel>
              <FormControl>
                <Input placeholder="علي سميث" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>النوع</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع المعاملة" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Deposit">Deposit</SelectItem>
                  <SelectItem value="Withdrawal">Withdrawal</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>المبلغ</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="100.00"
                  {...field}
                  onChange={e => field.onChange(parseFloat(e.target.value))}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الحالة</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="مكتملة">مكتملة</SelectItem>
                  <SelectItem value="معلقة">معلقة</SelectItem>
                  <SelectItem value="منتهية">منتهية</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جاري الإضافة..." : "إضافة المعاملة"}
        </Button>
      </form>
    </Form>
  );
}