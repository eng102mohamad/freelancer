import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  id: string;
  user: string;
  type: 'Deposit' | 'Withdrawal';
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Expired';
}

interface FinanceState {
  transactions: Transaction[];
  totalRevenue: number;
  pendingTransactions: number;
  monthlyRevenue: number;
}

const initialState: FinanceState = {
  transactions: [
    { id: 'TXN001', user: 'Ali Smith', type: 'Deposit', amount: 500, date: '2024-01-15', status: 'Completed' },
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