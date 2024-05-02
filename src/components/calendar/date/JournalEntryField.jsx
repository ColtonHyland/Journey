import React, { useState, useEffect, useCallback } from 'react';

const JournalEntryField = ({ date }) => {

    const [journalEntry, setJournalEntry] = useState('');
    const [isTyping, setIsTyping] = useState(false);
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
            setIsTyping(false);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const saveEntry = useCallback(async () => {
        if (isTyping) {
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
        }
    }, [journalEntry, date, isTyping]);

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
        <div className="flex flex-col h-full relative">
        <h2 className="text-2xl font-bold text-center">Journal Entry</h2>
        <textarea
            value={journalEntry}
            onChange={(e) => {
                setJournalEntry(e.target.value);
                setIsTyping(true);
            }}
            className="flex-1 border border-gray-300 p-2 w-full resize-none overflow-auto relative"
            style={{ minHeight: '2rem' }}
        />
        {showSavedMessage && (
            <div className="absolute bottom-5 left-0 right-0 mb-2 text-center pointer-events-none">
                <span className="text-gray-500 italic bg-white px-2">Saved!</span>
            </div>
        )}
    </div>
    );
}

export default JournalEntryField;``