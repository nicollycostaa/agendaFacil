// src/app/page.tsx
"use client"; // Adicione esta linha para marcar como Client Component

import { useState, useEffect } from 'react';

interface Event {
    id: number;
    title: string;
    date: string;
    category: string;
}

export default function Home() {
    const [event, setEvent] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    // Carregar eventos do Local Storage
    useEffect(() => {
        const storedEvents = localStorage.getItem('events');
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
        }
    }, []);

    const handleAddEvent = () => {
        const newEvent: Event = { id: Date.now(), title: event, date, category };
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        setEvent('');
        setDate('');
        setCategory('');
    };

    const handleDeleteEvent = (id: number) => {
        const updatedEvents = events.filter((e) => e.id !== id);
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
    };

    const filteredEvents = events.filter((e) =>
        selectedCategory ? e.category === selectedCategory : true
    );

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-600">Agenda Fácil</h1>
            <input
                type="text"
                placeholder="Título do Evento"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                className="border border-gray-300 rounded-md p-2 m-2"
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-300 rounded-md p-2 m-2"
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 rounded-md p-2 m-2"
            >
                <option value="">Selecione uma categoria</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Pessoal">Pessoal</option>
                <option value="Estudo">Estudo</option>
                <option value="Lazer">Lazer</option>
            </select>
            <button
                onClick={handleAddEvent}
                className="bg-blue-600 text-white rounded-md p-2 m-2"
            >
                Adicionar Evento
            </button>

            <div className="mt-4">
                <label className="mr-2">Filtrar por Categoria:</label>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                >
                    <option value="">Todas</option>
                    <option value="Trabalho">Trabalho</option>
                    <option value="Pessoal">Pessoal</option>
                    <option value="Estudo">Estudo</option>
                    <option value="Lazer">Lazer</option>
                </select>
            </div>

            <ul className="mt-4">
                {filteredEvents.map((e) => (
                    <li
                        key={e.id}
                        className="event-item bg-white p-4 m-2 rounded shadow-md"
                    >
                        <h2 className="font-bold">{e.title}</h2>
                        <p>{e.date}</p>
                        <p>Categoria: {e.category}</p>
                        <button
                            onClick={() => handleDeleteEvent(e.id)}
                            className="text-red-600 mt-2"
                        >
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
