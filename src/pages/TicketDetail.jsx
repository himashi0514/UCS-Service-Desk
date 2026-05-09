import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTickets } from '../context/TicketContext';

export function TicketDetail() {
  // Grabs the ID from the URL
  const params = useParams();
  const id = params.id;
  
  const context = useTickets();

  // Find the specific ticket that matches the ID from the URL
  const ticket = context.tickets.find(function(t) {
    return t.id === id;
  });

  const [statusInput, setStatusInput] = useState(ticket ? ticket.status : 'Open');
  const [noteInput, setNoteInput] = useState('');

  // Handles cases where someone types a random ID that doesn't exist
  if (!ticket) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Ticket Not Found</h2>
        <p className="text-gray-500 mt-2 mb-6">We could not find a ticket with the ID: {id}</p>
        <Link to="/tickets" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Back to Directory
        </Link>
      </div>
    );
  }

  // Action Handlers
  const handleStatusUpdate = function() {
    context.updateTicketStatus(id, statusInput);
    // Visual feedback for the user
    alert("Ticket status successfully updated to: " + statusInput);
  };

  const handleAddNote = function(event) {
    event.preventDefault();
    if (noteInput.trim() !== '') {
      context.addNote(id, noteInput);
      setNoteInput(''); 
    }
  };

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
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Back Link */}
      <Link to="/tickets" className="text-blue-600 hover:text-blue-800 font-medium inline-block">
        &larr; Back to Ticket List
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Core Ticket Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{ticket.title}</h1>
                <p className="text-sm text-gray-500 font-mono mt-1">ID: {ticket.id}</p>
              </div>
              <div className="flex space-x-2">
                <span className={"px-3 py-1 rounded-full text-sm font-semibold " + getPriorityColor(ticket.priority)}>
                  {ticket.priority} Priority
                </span>
                <span className={"px-3 py-1 rounded-full text-sm font-semibold " + getStatusColor(ticket.status)}>
                  {ticket.status}
                </span>
              </div>
            </div>

            <div className="py-4 border-t border-b border-gray-100 my-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Reporter</p>
                <p className="text-gray-900">{ticket.reporter}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Category</p>
                <p className="text-gray-900">{ticket.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Created At</p>
                <p className="text-gray-900">{new Date(ticket.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
              <div className="bg-gray-50 p-4 rounded text-gray-800 whitespace-pre-wrap">
                {ticket.description}
              </div>
            </div>
          </div>

          {/* Activity/Notes Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Ticket Activity</h2>
            
            <div className="space-y-4 mb-6">
              {ticket.notes.length === 0 ? (
                <p className="text-gray-500 italic text-center py-4">No notes have been added to this ticket yet.</p>
              ) : (
                ticket.notes.map(function(note, index) {
                  return (
                    <div key={index} className="bg-blue-50 p-4 rounded border border-blue-100">
                      <p className="text-gray-800">{note.text}</p>
                      <p className="text-xs text-gray-500 mt-2 text-right">
                        {new Date(note.timestamp).toLocaleString()}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            {/* Form to add a new note */}
            <form onSubmit={handleAddNote} className="border-t border-gray-200 pt-4 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Add a Note</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 outline-none mb-3"
                rows="3"
                placeholder="Type your update here..."
                value={noteInput}
                onChange={function(e) { setNoteInput(e.target.value); }}
              ></textarea>
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors"
                >
                  Post Note
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Update Status */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Manage Ticket</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded outline-none bg-white mb-3"
                  value={statusInput}
                  onChange={function(e) { setStatusInput(e.target.value); }}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <button 
                  onClick={handleStatusUpdate}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  Save Status
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}