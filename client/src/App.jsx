import { useState } from 'react';
import { Login, Search, NewsFlow } from './pages';
import './App.css';

function App() {
    const [page, setPage] = useState('login');
    const [data, setData] = useState({});
    const [promptHistoryData, setPromptHistoryData] = useState([]);

    const handleNavigate = (page, newData, index) => {
        setPage(page);
        setData(newData);
        index == "back" && setPromptHistoryData((prevPromptHistory) => ([...prevPromptHistory, newData]))
        if (index !== undefined) {
            setPromptHistoryData((prevPromptHistory) => {
                return prevPromptHistory.filter((_, i) => i !== index);
            });
        }
    };

    return (
        <>
            {!data.email && <Login onNavigate={handleNavigate} />}
            {data.email && page === 'search' && (
                <Search onNavigate={handleNavigate} data={data} promptHistoryData={promptHistoryData} />
            )}
            {data.email && data.prompt && page === 'newsflow' && (
                <NewsFlow onNavigate={handleNavigate} data={data} />
            )}
        </>
    );
}

export default App;
