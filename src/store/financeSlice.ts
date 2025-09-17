import { createSlice,type PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  id: string;
  user: string;
  type: 'Deposit' | 'Withdrawal';
  amount: number;
  date: string;
  status: 'مكتملة' | 'معلقة' | 'منتهية';
}

interface FinanceState {
  transactions: Transaction[];
  totalRevenue: number;
  pendingTransactions: number;
  monthlyRevenue: number;
}

const initialState: FinanceState = {
  transactions: [
    { id: 'TXN001', user: 'علي سميث', type: 'Deposit', amount: 500, date: '2024-01-15', status: 'مكتملة' },
    { id: 'TXN002', user: 'فاطمة جونز', type: 'Withdrawal', amount: 200, date: '2024-01-16', status: 'معلقة' },
    { id: 'TXN003', user: 'عميل C', type: 'Deposit', amount: 1000, date: '2024-01-17', status: 'مكتملة' },
    { id: 'TXN004', user: 'مستخدم مجهول', type: 'Deposit', amount: 750, date: '2024-01-17', status: 'معلقة' },
    { id: 'TXN005', user: 'احمد خان', type: 'Withdrawal', amount: 150, date: '2024-01-18', status: 'مكتملة' },
    { id: 'TXN006', user: 'ليلى حسين', type: 'Deposit', amount: 1200, date: '2024-01-19', status: 'منتهية' },
    { id: 'TXN007', user: 'سارة محمد', type: 'Deposit', amount: 300, date: '2024-01-20', status: 'مكتملة' },
    { id: 'TXN008', user: 'مستخدم X', type: 'Withdrawal', amount: 400, date: '2024-01-21', status: 'معلقة' },
  ],
  totalRevenue: 150000,
  pendingTransactions: 7500,
  monthlyRevenue: 28000,
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      if (action.payload.type === 'Deposit') {
        state.totalRevenue += action.payload.amount;
        state.monthlyRevenue += action.payload.amount;
      } else {
        state.totalRevenue -= action.payload.amount;
        state.pendingTransactions += action.payload.amount;
      }
    },
    updateTransactionStatus: (state, action: PayloadAction<{ id: string; status: string }>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index].status = action.payload.status;
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      const tx = state.transactions.find(t => t.id === action.payload);
      if (tx) {
        if (tx.type === 'Deposit') {
          state.totalRevenue -= tx.amount;
          state.monthlyRevenue -= tx.amount;
        } else {
          state.totalRevenue += tx.amount;
          state.pendingTransactions -= tx.amount;
        }
      }
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTransaction, updateTransactionStatus, deleteTransaction } = financeSlice.actions;
export default financeSlice.reducer;