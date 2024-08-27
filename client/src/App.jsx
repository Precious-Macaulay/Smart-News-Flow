import { useState } from 'react';
import { Login, Search, NewsFlow } from './pages';
import './App.css';

function App() {
    const [page, setPage] = useState('login');
    const [data, setData] = useState({});
    const [promptHistoryData, setPromptHistoryData] = useState([]);

    const handleNavigate = (page, newData, index) => {
        setPage(page);
        setData((prevData) => ({ ...prevData, ...newData }));
        setPromptHistoryData((prevPromptHistory) => [...prevPromptHistory, promptData]);
    };

    const handlePromptData = (promptData) => {
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
