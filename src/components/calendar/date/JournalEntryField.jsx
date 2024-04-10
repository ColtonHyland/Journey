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

    const debounce = (func, delay) => {
        let inDebounce;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(inDebounce);
            inDebounce = setTimeout(() => func.apply(context, args), delay);
        };
    };

    const saveEntry = useCallback(async () => {
        try {
            const response = await fetch(`/api/journalEntry/${date}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ journalEntry }),
            });
            if (!response.ok) throw new Error('Failed to update journal entry');
            
            // Show "Saved!" message only after successful save
            setShowSavedMessage(true);
            setTimeout(() => setShowSavedMessage(false), 2500); // Keep "Saved!" visible for 2.5 seconds
        } catch (error) {
            setError(error.message);
        }
    }, [journalEntry, date]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (journalEntry) {
                saveEntry();
            }
        }, 1500); // Wait for 1.5s of inactivity before saving

        return () => {
            clearTimeout(handler); // Clear timeout if journalEntry changes before the time elapses
        };
    }, [journalEntry, saveEntry]);

    useEffect(() => {
        fetchJournalEntry();
    }, [date]);

    return (
        <div className="flex flex-col h-full p-4">
            <h2 className="text-2xl font-bold text-center">Journal Entry</h2>
            <textarea
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                className="flex-1 border border-gray-300 p-2 w-full resize-none overflow-auto"
                style={{ minHeight: '2rem' }}
            />
            {showSavedMessage && <p className="text-gray-500 italic mt-2">Saved!</p>}
        </div>
    );
}

export default JournalEntryField;