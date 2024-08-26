import React, { useState } from 'react';
import '../App.css';

const Search = ({ onNavigate, data, onPrompt, promptList }) => {
    const { email } = data;
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = async () => {
        if (prompt.trim() !== '') {
            setIsLoading(true);
            try {
                // Send request to the server
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/search`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, prompt }),
                });

                console.log('Response:', response);

                if (response.ok) {
                    onPrompt(prompt);
                    onNavigate('newsflow', { email, prompt });
                } else {
                    console.error('Server responded with an error');
                }
            } catch (error) {
                console.error('Error occurred while sending the request', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    if (!email) {
        onNavigate('login');
        return null;
    }

    return (
        <>
            <h1>Smart News Flow</h1>

            <p className="read-the-docs">
                Welcome to Smart News Flow, {email}!
            </p>
            <div className="card">
                <input
                    type="search"
                    placeholder="Enter your search query..."
                    value={prompt}
                    onChange={handleChange}
                    autoComplete='on'
                    onKeyDown={handleKeyPress}
                />
                {prompt.trim() === '' && <p className="error">Prompt cannot be empty</p>}
                <button onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Start Searching'}
                </button>
                <p>Enter your search query to get relevant news articles</p>
            </div>
            <div>
                <h2>Recent Prompts</h2>
                {promptList.map((prompt, index) => (
                    <div key={index} className="prompt">
                        {prompt}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Search;