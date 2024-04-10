// write and add journal entry for a given date, adding or deleting or changing anything from it. It functions as a miniatur text field, similar to miicrosoft word

import React, { useState, useEffect } from 'react';const JournalEntryField = ({ date }) => {

    const [journalEntry, setJournalEntry] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchJournalEntry = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/journalEntry/${date}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });
            if (!response.ok) throw new Error('Failed to fetch journal entry');
            const data = await response.json();
            setJournalEntry(data.content);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateJournalEntry = async () => {
        try {
            const response = await fetch(`/api/journalEntry/${date}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ journalEntry }),
            });
            if (!response.ok) throw new Error('Failed to update journal entry');
            fetchJournalEntry();
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchJournalEntry();
    }, []);

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-lg font-bold mb-2">Journal Entry</h2>
            <textarea
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                className="flex-1 border border-gray-300 p-2 w-full resize-none"
            ></textarea>
            <button 
                onClick={updateJournalEntry} 
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded self-end">
                Save
            </button>
        </div>
    );
}

export default JournalEntryField;