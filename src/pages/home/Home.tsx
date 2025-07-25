/**
 * ホームページ
 */
import { Link } from 'react-router-dom'
import trainImg from '../../assets/train.png'
import './Home.scss'

function Home() {
  return (
    <div className="home">

      {/* トレインとタイトル */}
      <div className="header">
        <div className="header-inner">
          <Link to="/" className="header-logo">
            <img src={trainImg} alt="" />
          </Link>
          <h1 className="header-title">Creative Training</h1>
        </div>
      </div>

      {/* 各自のページへのリンク */}
      <div className="main">
        <section className="section">
          <ul className="link-list">
            <li><Link to="/mypage">マイページ</Link></li>
            <li><Link to="/user">ユーザー検索</Link></li>
            <li><Link to="/ishiya">いしや</Link></li>
<<<<<<< HEAD
            <li><Link to="/yusei">ゆうせい</Link></li>
=======
            <li><Link to="/hideto">ひでと</Link></li>
>>>>>>> 176bbb9ec19877c2345d34fa9d4cb6302a7f8aed
          </ul>
        </section>
      </div>
      
    </div>
  )
}

export default Home
