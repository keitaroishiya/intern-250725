/** 
 * 自分のページのサンプル
 */
import { Link } from 'react-router-dom';
import './Hideto.scss';

function Hideto() {
  return (
    <div className="mypage">
      <div className="mypage-container">
        <h1 className="mypage-title">マイページ</h1>
        
        <div className="mypage-content">
          <div className="mypage-profile">
            <div className="mypage-profile-header">
              <div className="mypage-avatar">
                G
              </div>
              <h2 className="mypage-name">下家　秀仁</h2>
            </div>
            
            <div className="mypage-info">
              <div className="mypage-info-item">
                <span className="label">メール:</span>
                <span className="value">hideto_shimoie.23@icloud.com</span>
              </div>
              <div className="mypage-info-item">
                <span className="label">部署:</span>
                <span className="value">開発部</span>
              </div>
              <div className="mypage-info-item">
                <span className="label">役職:</span>
                <span className="value">大学生</span>
              </div>
              <div className="mypage-info-item">
                <span className="label">入社日:</span>
                <span className="value">2025/07/25</span>
              </div>
            </div>
          </div>

          {/* トップに戻るリンク */}
          <div className="mypage-links">
            <Link to="/" className="mypage-link">ホームに戻る</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Hideto;