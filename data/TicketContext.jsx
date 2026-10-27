import React, { createContext, useContext, useState } from "react";

const TicketContext = createContext(null);

const initialTickets = [
  {
    id: "1",
    title: "E-posta erişim sorunu",
    description: "Kurumsal e-posta hesabına giriş yapılamıyor.",
    category: "Yazılım",
    status: "Bekliyor",
    location: "İnsan Kaynakları",
    date: "27.10.2026",
  },
  {
    id: "2",
    title: "Bilgisayar açılmıyor",
    description: "Bilgisayar güç düğmesine basıldığında açılmıyor.",
    category: "Donanım",
    status: "İşlemde",
    location: "Muhasebe",
    date: "26.10.2026",
  },
  {
    id: "3",
    title: "İnternet bağlantısı kesildi",
    description: "Ofisteki bilgisayarlar internete bağlanamıyor.",
    category: "Ağ / İnternet",
    status: "Tamamlandı",
    location: "Bilgi İşlem",
    date: "25.10.2026",
  },
];

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState(initialTickets);

  const addTicket = (ticket) => {
    setTickets((previous) => [ticket, ...previous]);
  };

  const updateTicketStatus = (id, status) => {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === id ? { ...ticket, status } : ticket,
      ),
    );
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket, updateTicketStatus }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketContext);

  if (!context) {
    throw new Error("useTickets, TicketProvider içerisinde kullanılmalıdır.");
  }

  return context;
}
