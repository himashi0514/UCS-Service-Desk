import { Link } from 'react-router-dom';
import { LayoutDashboard, Ticket, PlusCircle } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-blue-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-wider">
          UCS Service Desk
        </Link>
        
        <div className="flex space-x-6">
          <Link to="/" className="flex items-center hover:text-blue-300 transition-colors">
            <LayoutDashboard className="mr-1" size={18} /> Dashboard
          </Link>
          <Link to="/tickets" className="flex items-center hover:text-blue-300 transition-colors">
            <Ticket className="mr-1" size={18} /> Tickets
          </Link>
          <Link to="/create" className="flex items-center hover:text-blue-300 transition-colors">
            <PlusCircle className="mr-1" size={18} /> New Ticket
          </Link>
        </div>
      </div>
    </nav>
  );
}