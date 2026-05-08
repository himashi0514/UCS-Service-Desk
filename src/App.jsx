import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';

function TicketList() { 
  return <h1 className="text-2xl font-bold">Ticket List</h1>; 
}
function CreateTicket() { 
  return <h1 className="text-2xl font-bold">Create Ticket</h1>; 
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/create" element={<CreateTicket />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}