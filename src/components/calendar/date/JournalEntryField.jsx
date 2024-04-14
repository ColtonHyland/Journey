import React, { useState, useEffect, useCallback } from 'react';

const JournalEntryField = ({ date }) => {

    const [journalEntry, setJournalEntry] = useState('');
    const [showSavedMessage, setShowSavedMessage] = useState(false);
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

    const saveEntry = useCallback(async () => {
        try {
            const response = await fetch(`/api/journalEntry/${date}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ journalEntry }),
            });
            if (!response.ok) throw new Error('Failed to update journal entry');
            
            setShowSavedMessage(true);
            setTimeout(() => setShowSavedMessage(false), 2500);
        } catch (error) {
            setError(error.message);
        }
    }, [journalEntry, date]);

    useEffect(() => {
        const handler = setTimeout(() => {
            saveEntry();
        }, 1500);

        return () => clearTimeout(handler);
    }, [journalEntry, saveEntry]);

    useEffect(() => {
        fetchJournalEntry();
    }, [date]);

    return (
        // <div>
        <div className="flex flex-col h-full p-4">
            <h2 className="text-2xl font-bold text-center">Journal Entry</h2>
            <textarea
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                className="flex-1 border border-gray-300 p-2 w-full resize-none overflow-auto"
                style={{ minHeight: '2rem' }}
            />
            <div className="h-4">
                {showSavedMessage && <p className="text-gray-500 italic text-center">Saved!</p>}
            </div>
        </div>
        
    );
}

export default JournalEntryField;