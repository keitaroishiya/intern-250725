/** 
 * 自分のページのサンプル
 */
import { Link } from 'react-router-dom';
import './Hideto.scss';
import { useState } from 'react'

function Hideto() {
     const [eventName, setEventName] = useState('');
      const [searchResults, setSearchResults] = useState<any>(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');
      const [rawHtml, setRawHtml] = useState('');
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
          const response = await fetch('/api/events.json');
          if (!response.ok) {
            throw new Error('Failed to fetch events data');
          }
          
          const data = await response.json();
          
          const filteredEvents = data.events.filter((event: any) => 
            event.title.toLowerCase().includes(eventName.toLowerCase())
          );
          
          setSearchResults(filteredEvents);
          
          setRawHtml(`
            <div class="search-query">
              <h3>検索クエリ: ${eventName}</h3>
              <p>検索結果: ${filteredEvents.length}件</p>
            </div>
          `);
        } catch (err) {
          setError('データの取得中にエラーが発生しました。');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

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

          {/* 検索 */}
           <div className="event-page">
            <div className="header">
                <h1>イベント検索</h1>
            </div>

            <div className="main">
                <section className="demo-section">
                <h2>イベント名検索</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <label htmlFor="eventname">イベント名:</label>
                    <input 
                        type="text" 
                        id="eventname" 
                        value={eventName} 
                        onChange={(e) => setEventName(e.target.value)} 
                        placeholder="イベント名を入力" 
                    />
                    </div>
                    <button type="submit" disabled={loading}>
                    {loading ? '検索中...' : '検索'}
                    </button>
                </form>
                </section>

                <section className="output-section">
                <h2>検索結果</h2>
                
                {error && <p className="error">{error}</p>}
                
                {/* output raw html through dangerouslySetInnerHTML */}
                {rawHtml && (
                    <div className="raw-output">
                    <div 
                        className="vulnerable-container"
                        dangerouslySetInnerHTML={{ __html: rawHtml }}
                    />
                    </div>
                )}
                
                {searchResults && searchResults.length > 0 ? (
                    <div className="event-results">
                    <h3>イベント一覧:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>タイトル</th>
                                <th>開始日</th>
                                <th>終了日</th>
                                <th>場所</th>
                                <th>主催</th>
                            </tr>
                        </thead>
                        <tbody>
                        {searchResults.map((event: any) => (
                            <tr key={event.id}>
                                <td>{event.title}</td>
                                <td>{new Date(event.startDate).toLocaleString('ja-JP', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                            }
                                        )
                                    }
                                </td>
                                 <td>{new Date(event.endDate).toLocaleString('ja-JP', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                            }
                                        )
                                    }
                                </td>
                                <td>{event.location}</td>
                                <td>{event.organizer}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                ) : searchResults && searchResults.length === 0 ? (
                    <p>該当するイベントは見つかりませんでした。</p>
                ) : null}
                
                </section>

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