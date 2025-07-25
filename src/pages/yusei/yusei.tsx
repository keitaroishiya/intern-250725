/** 
 * 自分のページのサンプル
 */

import { Link } from 'react-router-dom';
import './yusei.scss';

function yusei() {
  return (
    <div className="yusei">
      <div className="yusei-container">
        <h1 className="yusei-title">ゆうせいのページ</h1>
        
        <div className="yusei-content">
          <div className="yusei-profile">
            <div className="yusei-profile-header">
              <div className="yusei-avatar">
                Y
              </div>
              <h2 className="yusei-name">柳田  憂誠</h2>
            </div>
            
            <div className="yusei-info">
              <div className="yusei-info-item">
                <span className="label">メール:</span>
                <span className="value">yusei@internet.gmo</span>
              </div>
              <div className="yusei-info-item">
                <span className="label">部署:</span>
                <span className="value">開発部</span>
              </div>
              <div className="yusei-info-item">
                <span className="label">役職:</span>
                <span className="value">新米エンジニア</span>
              </div>
              <div className="yusei-info-item">
                <span className="label">入社日:</span>
                <span className="value">2025/04/01</span>
              </div>
            </div>
          </div>

          {/* トップに戻るリンク */}
          <div className="yusei-links">
            <Link to="/" className="yusei-link">ホームに戻る</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default yusei;
