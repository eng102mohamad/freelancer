import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Ticket {
  id: string
  subject: string
  user: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'Open' | 'In Progress' | 'Closed'
  date: string
}

interface TicketsState {
  tickets: Ticket[]
  filters: {
    search: string
    status: string
    priority: string
  }
}

const initialState: TicketsState = {
  tickets: [
    {
      id: "TKT001",
      subject: "Login Authentication Failure",
      user: "Fatima Zahra",
      priority: "High",
      status: "Open",
      date: "2024-03-22"
    },
    {
      id: "TKT002",
      subject: "Billing Discrepancy on Invoice #453",
      user: "Ahmed Ali",
      priority: "Medium",
      status: "In Progress",
      date: "2024-03-21"
    }
  ],
  filters: {
    search: "",
    status: "all",
    priority: "all"
  }
}

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    deleteTicket: (state, action: PayloadAction<string>) => {
      state.tickets = state.tickets.filter(t => t.id !== action.payload)
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload
    },
    setPriorityFilter: (state, action: PayloadAction<string>) => {
      state.filters.priority = action.payload
    }
  }
})

export const { 
  deleteTicket, 
  setSearchFilter, 
  setStatusFilter, 
  setPriorityFilter 
} = ticketsSlice.actions

export default ticketsSlice.reducer

// Selectors
export const selectAllTickets = (state: { tickets: TicketsState }) => state.tickets.tickets
export const selectFilters = (state: { tickets: TicketsState }) => state.tickets.filters
export const selectFilteredTickets = (state: { tickets: TicketsState }) => {
  const { tickets, filters } = state.tickets
  return tickets.filter(ticket => {
    const matchesSearch = ticket.subject.includes(filters.search) || 
                          ticket.user.includes(filters.search)
    const matchesStatus = filters.status === "all" || ticket.status === filters.status
    const matchesPriority = filters.priority === "all" || ticket.priority === filters.priority
    return matchesSearch && matchesStatus && matchesPriority
  })
}