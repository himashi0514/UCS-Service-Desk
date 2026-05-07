import { createContext, useState, useEffect, useContext } from 'react';

// Create the Context
const TicketContext = createContext();

// Create a Provider Component using a standard function
export function TicketProvider(props) {
  
  // Load tickets from LocalStorage 
  const [tickets, setTickets] = useState(function() {
    const savedTickets = localStorage.getItem('ucs_tickets');
    
    // Return parsed tickets if they exist, otherwise return an empty array
    return savedTickets !== null ? JSON.parse(savedTickets) : [];
  });

  // Save to LocalStorage whenever 'tickets' state changes
  useEffect(function() {
    localStorage.setItem('ucs_tickets', JSON.stringify(tickets));
  }, [tickets]);

  // Function to add a new ticket
  const addTicket = function(ticketData) {
    // Generate the random ID step-by-step
    const randomNumber = Math.random() * 10000;
    const randomInteger = Math.floor(randomNumber);
    const ticketId = "TKT-" + randomInteger;

    // Build the new ticket object
    const newTicket = {
      title: ticketData.title,
      description: ticketData.description,
      category: ticketData.category,
      priority: ticketData.priority,
      reporter: ticketData.reporter,
      id: ticketId,
      status: 'Open',
      createdAt: new Date().toISOString(),
      notes: [],
    };

    // Add the new ticket to the existing array of tickets
    const updatedTicketsArray = tickets.concat(newTicket);
    
    // Save to state
    setTickets(updatedTicketsArray);
  };

  // Function to update an existing ticket's status
  const updateTicketStatus = function(id, newStatus) {
    const updatedTicketsArray = tickets.map(function(ticket) {
      return ticket.id === id ? Object.assign({}, ticket, { status: newStatus }) : ticket;
    });

    setTickets(updatedTicketsArray);
  };

  // Function to add a note to a ticket
  const addNote = function(id, noteText) {
    const newNote = {
      text: noteText,
      timestamp: new Date().toISOString(),
    };

    const updatedTicketsArray = tickets.map(function(ticket) {
      return ticket.id === id ? Object.assign({}, ticket, { notes: ticket.notes.concat(newNote) }) : ticket;
    });

    setTickets(updatedTicketsArray);
  };

  return (
    <TicketContext.Provider 
      value={{ 
        tickets: tickets, 
        addTicket: addTicket, 
        updateTicketStatus: updateTicketStatus, 
        addNote: addNote 
      }}
    >
      {props.children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  return useContext(TicketContext);
}