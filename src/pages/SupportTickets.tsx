import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Search, Filter, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  selectFilteredTickets, 
  selectFilters, 
  setSearchFilter,
  setPriorityFilter,
  setStatusFilter,
  deleteTicket 
} from "@/store/ticketsSlice"
import type { Ticket } from "@/store/ticketsSlice"

const SupportTickets: React.FC = () => {
  const dispatch = useDispatch()
  const tickets = useSelector(selectFilteredTickets)
  const filters = useSelector(selectFilters)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchFilter(e.target.value))
  }

  const handlePriorityChange = (value: string) => {
    dispatch(setPriorityFilter(value))
  }

  const handleStatusChange = (value: string) => {
    dispatch(setStatusFilter(value))
  }

  const handleDeleteTicket = (id: string) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      dispatch(deleteTicket(id))
    }
  }

  const handleRowClick = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setIsDetailOpen(true)
  }

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      "Closed": "bg-green-100 text-green-800",
      "In Progress": "bg-yellow-100 text-yellow-800",
      "Open": "bg-red-100 text-red-800",
    }
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {status === "Closed" && <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
        {status === "In Progress" && <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" /></svg>}
        {status === "Open" && <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" /></svg>}
        {status}
      </span>
    )
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      High: "text-red-600",
      Medium: "text-yellow-600",
      Low: "text-green-600",
    }
    return colors[priority] || "text-gray-600"
  }

  const getPriorityText = (priority: string) => {
    const texts: Record<string, string> = {
      High: "High",
      Medium: "Medium",
      Low: "Low",
    }
    return texts[priority] || priority
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Support Tickets</h1>
        {/* Removed create new ticket button */}
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search tickets..."
            className="pr-10 text-right"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
        
        {/* Status filter for large screens */}
        <Select value={filters.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="hidden sm:flex w-[180px] border-gray-300">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Priority filter for large screens */}
        <Select value={filters.priority} onValueChange={handlePriorityChange}>
          <SelectTrigger className="hidden sm:flex w-[180px] border-gray-300">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Filter button for small screens */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="sm:hidden flex-1">
              <Filter className="h-4 w-4 ml-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => handleStatusChange("all")}>
              All Statuses
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange("Open")}>
              Open
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange("In Progress")}>
              In Progress
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange("Closed")}>
              Closed
            </DropdownMenuItem>
            <hr className="my-2" />
            <DropdownMenuItem onClick={() => handlePriorityChange("all")}>
              All Priorities
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePriorityChange("High")}>
              High
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePriorityChange("Medium")}>
              Medium
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePriorityChange("Low")}>
              Low
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Ticket cards for small screens */}
      <div className="lg:hidden space-y-4">
        {tickets.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
            No tickets match the search criteria
          </div>
        ) : (
          tickets.map((ticket: Ticket) => (
            <Card 
              key={ticket.id} 
              className="overflow-hidden cursor-pointer"
              onClick={() => handleRowClick(ticket)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(ticket.user)}&background=6366f1&color=ffffff`} alt={ticket.user} />
                      <AvatarFallback>{ticket.user.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-sm">{ticket.user}</CardTitle>
                      <CardDescription className="text-xs">#{ticket.id}</CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(ticket.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-sm">{ticket.subject}</h3>
                  <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {getPriorityText(ticket.priority)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{ticket.date}</span>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTicket(ticket.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Tickets table for large screens */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">Ticket ID</TableHead>
              <TableHead className="text-right">Subject</TableHead>
              <TableHead className="text-right">User</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Priority</TableHead>
              <TableHead className="text-right">Created Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No tickets match the search criteria
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket: Ticket) => (
                <TableRow 
                  key={ticket.id} 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleRowClick(ticket)}
                >
                  <TableCell className="text-right font-medium">#{ticket.id}</TableCell>
                  <TableCell className="text-right">{ticket.subject}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(ticket.user)}&background=6366f1&color=ffffff`} alt={ticket.user} />
                        <AvatarFallback>{ticket.user.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <span>{ticket.user}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {getStatusBadge(ticket.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-medium ${getPriorityColor(ticket.priority)}`}>
                      {getPriorityText(ticket.priority)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{ticket.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTicket(ticket.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Ticket details in mobile view */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedTicket && (
            <>
              <DialogHeader>
                <DialogTitle className="flex justify-between items-center">
                  <span>Ticket Details #{selectedTicket.id}</span>
                </DialogTitle>
                <DialogDescription>
                  Ticket from {selectedTicket.user}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedTicket.user)}&background=6366f1&color=ffffff`} alt={selectedTicket.user} />
                      <AvatarFallback>{selectedTicket.user.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedTicket.user}</p>
                      <p className="text-sm text-gray-500">#{selectedTicket.id}</p>
                    </div>
                  </div>
                  {getStatusBadge(selectedTicket.status)}
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Subject:</h4>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {selectedTicket.subject}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Priority:</h4>
                    <p className={`font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                      {getPriorityText(selectedTicket.priority)}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Created Date:</h4>
                    <p className="text-gray-700">{selectedTicket.date}</p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTicket(selectedTicket.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 ml-2 text-red-500" />
                    Delete Ticket
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

export default SupportTickets