import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/home'
import MyPage from './pages/mypage'
import NotFound from './pages/not-found'
import Api from './pages/api'
import User from './pages/user'
import Ishiya from './pages/ishiya'
<<<<<<< HEAD
import Yusei from './pages/yusei'
=======
import Hideto from './pages/hideto'
>>>>>>> 176bbb9ec19877c2345d34fa9d4cb6302a7f8aed

import './App.scss'

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/api" element={<Api />} />
        <Route path="/user" element={<User />} />
        <Route path="/ishiya" element={<Ishiya />} />
<<<<<<< HEAD
        <Route path="/yusei" element={<Yusei />} />

=======
        <Route path="/Hideto" element={<Hideto />} />
>>>>>>> 176bbb9ec19877c2345d34fa9d4cb6302a7f8aed
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <footer className="footer">
        <div className="footer-link">
          <Link to="/">ホーム</Link>
          <span> | </span>
          <Link to="/mypage">マイページ</Link>
          <span> | </span>
          <Link to="/api">API</Link>
          <span> | </span>
          <Link to="/user">ユーザー検索</Link>
        </div>
        <div className="footer-inner">
          Copyright (c) 2025 GMO Internet, Inc. All Rights Reserved.
        </div>
      </footer>

    </Router>
  )
}

export default App
