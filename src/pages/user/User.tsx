import { useState } from 'react'
import { Link } from 'react-router-dom'
import './User.scss'

function User() {
  const [username, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState<any[] | null>(null); // 型をより具体的に
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // rawHtml ステートを削除
  // const [rawHtml, setRawHtml] = useState('');
  
  // 検索クエリを保持するための新しいステート
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSearchResults(null);
    setSubmittedQuery(username); // フォーム送信時の検索クエリを保存
    
    try {
      // Fetch users from the API
      const response = await fetch('/api/users.json');
      if (!response.ok) {
        throw new Error('Failed to fetch users data');
      }
      
      const data = await response.json();
      
      // Filter users based on the input (case insensitive)
      const filteredUsers = data.users.filter((user: any) => 
        user.name.toLowerCase().includes(username.toLowerCase())
      );
      
      setSearchResults(filteredUsers);
      
      // rawHtml の生成ロジックを削除
      
    } catch (err) {
      setError('データの取得中にエラーが発生しました。');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-page">
      <div className="header">
        <h1>ユーザー検索</h1>
      </div>

      <div className="main">
        <section className="demo-section">
          <h2>ユーザー名検索</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">ユーザー名:</label>
              <input 
                type="text" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="ユーザー名を入力" 
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

          {/* dangerouslySetInnerHTML を使わず、安全に検索クエリと結果を表示する */}
          {submittedQuery !== null && !loading && (
            <div className="search-query">
              <h3>検索クエリ: {submittedQuery}</h3>
              {searchResults && <p>検索結果: {searchResults.length}件</p>}
            </div>
          )}
          
          {searchResults && searchResults.length > 0 ? (
            <div className="user-results">
              <h3>ユーザー一覧:</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>名前</th>
                    <th>メール</th>
                    <th>部署</th>
                    <th>役割</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((user: any) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.department}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : submittedQuery !== null && !loading && searchResults?.length === 0 ? (
            <p>該当するユーザーは見つかりませんでした。</p>
          ) : null}
          
        </section>

      </div>
      <div className="back-link">
        <Link to="/">ホームに戻る</Link>
      </div>
    </div>
  );
}

export default User;