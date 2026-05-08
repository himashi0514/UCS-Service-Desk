import { useTickets } from '../context/TicketContext';
import { Ticket, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export function Dashboard() {
  // Get the ticket data from the global context
  const context = useTickets();
  const tickets = context.tickets;

  // Calculate the metrics
  const totalTickets = tickets.length;
  
  const openTickets = tickets.filter(function(t) { 
    return t.status === 'Open'; 
  }).length;
  
  const inProgressTickets = tickets.filter(function(t) { 
    return t.status === 'In Progress'; 
  }).length;
  
  const resolvedTickets = tickets.filter(function(t) { 
    return t.status === 'Resolved'; 
  }).length;
  
  const highPriority = tickets.filter(function(t) { 
    return t.priority === 'High' && t.status !== 'Resolved'; 
  }).length;

  // Reusable visual component just for the cards
  function MetricCard(props) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
        <div className={"p-3 rounded-full " + props.colorClass}>
          {props.icon}
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{props.title}</p>
          <p className="text-3xl font-bold">{props.value}</p>
        </div>
      </div>
    );
  }

  // Render the page
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Summary</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Tickets" 
          value={totalTickets} 
          icon={<Ticket size={28} className="text-blue-600" />} 
          colorClass="bg-blue-100" 
        />
        <MetricCard 
          title="Open" 
          value={openTickets} 
          icon={<AlertTriangle size={28} className="text-yellow-600" />} 
          colorClass="bg-yellow-100" 
        />
         <MetricCard 
          title="In Progress" 
          value={inProgressTickets} 
          icon={<Clock size={28} className="text-purple-600" />} 
          colorClass="bg-purple-100" 
        />
        <MetricCard 
          title="Resolved" 
          value={resolvedTickets} 
          icon={<CheckCircle size={28} className="text-green-600" />} 
          colorClass="bg-green-100" 
        />
      </div>

      {/* Only shows if there are high priority tickets */}
      {highPriority > 0 ? (
        <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
            <p className="text-red-700">
              Attention: You have <strong>{highPriority}</strong> unresolved high priority tickets requiring immediate action.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}