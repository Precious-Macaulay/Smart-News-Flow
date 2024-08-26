import { useState } from 'react';
import { Login, Search, NewsFlow } from './pages';
import './App.css';

function App() {
    const [page, setPage] = useState('login');
    const [data, setData] = useState({});
    const [promptHistoryData, setPromptHistoryData] = useState([]);

    const handleNavigate = (page, newData) => {
        setPage(page);
        setData((prevData) => ({ ...prevData, ...newData }));
    };

    const handlePromptData = (promptData) => {
        setPromptHistoryData((prevPromptHistory) => [...prevPromptHistory, promptData]);
    };

    return (
        <>
            {!data.email && <Login onNavigate={handleNavigate} />}
            {data.email && page === 'search' && (
                <Search onNavigate={handleNavigate} data={data} onPrompt={handlePromptData} promptHistoryData={promptHistoryData} />
            )}
            {data.email && data.prompt && page === 'newsflow' && (
                <NewsFlow onNavigate={handleNavigate} data={data} />
            )}
        </>
    );
}

export default App;
