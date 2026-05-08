import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTickets } from '../context/TicketContext';

export function CreateTicket() {
  const context = useTickets();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technical');
  const [priority, setPriority] = useState('Low');
  const [reporter, setReporter] = useState('');

  // Handles the form submission
  const handleSubmit = function(event) {
    event.preventDefault();

    const newTicketData = {
      title: title,
      description: description,
      category: category,
      priority: priority,
      reporter: reporter
    };

    // Sends it to the global context to be saved
    context.addTicket(newTicketData);

    // Redirect the user back to the Dashboard page
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Ticket</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Title</label>
          <input 
            type="text" 
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="e.g., Cannot access email"
            value={title}
            onChange={function(e) { setTitle(e.target.value); }}
          />
        </div>

        {/* Category and Priority Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              value={category}
              onChange={function(e) { setCategory(e.target.value); }}
            >
              <option value="Technical">Technical</option>
              <option value="Billing">Billing</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Feature Request">Feature Request</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              value={priority}
              onChange={function(e) { setPriority(e.target.value); }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Reporter Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reporter Name</label>
          <input 
            type="text" 
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="John Doe"
            value={reporter}
            onChange={function(e) { setReporter(e.target.value); }}
          />
        </div>

        {/* Description Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            required
            rows="4"
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Please describe the issue in detail..."
            value={description}
            onChange={function(e) { setDescription(e.target.value); }}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors"
          >
            Submit Ticket
          </button>
        </div>

      </form>
    </div>
  );
}