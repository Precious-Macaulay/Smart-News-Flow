import { useState } from 'react'
import { Login, Search, NewsFlow } from './pages'
import './App.css'

function App() {
  const [page, setPage] = useState('login');
  const [data, setData] = useState({});
  const [promptList, setPromptList] = useState([]);

  const handleNavigate = (page, data) => {
    setPage(page);
    setData(data);
  }

  const handlePrompt = (prompt) => {
    setPromptList([...promptList, prompt]);
  }

  return (
    <>
      {!data.email && <Login onNavigate={handleNavigate} />}
      {data.email && page === 'search' && <Search onNavigate={handleNavigate} data={data} onPrompt={handlePrompt} promptList={promptList} />}
      {data.email && data.prompt && page === 'newsflow' && <NewsFlow onNavigate={handleNavigate} data={data} />}
    </>
  )
}

export default App
