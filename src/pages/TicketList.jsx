import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTickets } from '../context/TicketContext';

export function TicketList() {
  const context = useTickets();
  const tickets = context.tickets;

  // State for the search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Filters the tickets based on the three criteria
  const filteredTickets = tickets.filter(function(ticket) {
    // Checks if title or ID matches the search term
    const searchLower = searchTerm.toLowerCase();
    const titleMatch = ticket.title.toLowerCase().includes(searchLower);
    const idMatch = ticket.id.toLowerCase().includes(searchLower);
    const matchesSearch = searchTerm === '' ? true : (titleMatch || idMatch);

    // Checks if status matches or if 'All' is selected
    const matchesStatus = statusFilter === 'All' ? true : ticket.status === statusFilter;

    // Checks if priority matches or if 'All' is selected
    const matchesPriority = priorityFilter === 'All' ? true : ticket.priority === priorityFilter;

    // Only return the ticket if it passes all three tests
    return matchesSearch && matchesStatus && matchesPriority;
  });

  function getStatusColor(status) {
    if (status === 'Open') return 'bg-yellow-100 text-yellow-800';
    if (status === 'In Progress') return 'bg-purple-100 text-purple-800';
    if (status === 'Resolved') return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  }

  function getPriorityColor(priority) {
    if (priority === 'High') return 'bg-red-100 text-red-800';
    if (priority === 'Medium') return 'bg-orange-100 text-orange-800';
    if (priority === 'Low') return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Header and Controls */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Ticket Directory</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div>
            <input 
              type="text" 
              placeholder="Search by Title or ID" 
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={function(e) { setSearchTerm(e.target.value); }}
            />
          </div>

          {/* Status Filter */}
          <div>
            <select 
              className="w-full p-2 border border-gray-300 rounded outline-none bg-white"
              value={statusFilter}
              onChange={function(e) { setStatusFilter(e.target.value); }}
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <select 
              className="w-full p-2 border border-gray-300 rounded outline-none bg-white"
              value={priorityFilter}
              onChange={function(e) { setPriorityFilter(e.target.value); }}
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ticket List Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
              <th className="p-4 font-medium">Ticket ID</th>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Priority</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTickets.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No tickets found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredTickets.map(function(ticket) {
                return (
                  <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-mono text-sm text-gray-500">{ticket.id}</td>
                    <td className="p-4 font-medium text-gray-900">{ticket.title}</td>
                    <td className="p-4">
                      <span className={"px-2 py-1 rounded-full text-xs font-semibold " + getStatusColor(ticket.status)}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={"px-2 py-1 rounded-full text-xs font-semibold " + getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <Link 
                        to={"/ticket/" + ticket.id} 
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        View Details &rarr;
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}