/** 
 * 自分のページのサンプル
 */

import { useState } from 'react'
import { Link } from 'react-router-dom';
import './yusei.scss';

function yusei() {
  
  const [proname, setproname] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);

  // カスタムツールチップの状態を管理
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: '',
    x: 0,
    y: 0,
  });

  // マウスがセルに乗った時の処理
  const handleMouseEnter = (e: React.MouseEvent, description: string) => {
    setTooltip({
      visible: true,
      content: description,
      x: e.clientX,
      y: e.clientY,
    });
  };

  // マウスがセルから離れた時の処理
  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSubmittedQuery(proname);
    
    try {
      // Fetch products from the API
      const response = await fetch('/api/products.json');
      if (!response.ok) {
        throw new Error('Failed to fetch products data');
      }
      
      const data = await response.json();
      // Filter products based on the input (case insensitive)
      const filteredproducts = data.products.filter((product: any) => 
        product.name.toLowerCase().includes(proname.toLowerCase())
      );
      
      setSearchResults(filteredproducts);
      
      
    } catch (err) {
      setError('データの取得中にエラーが発生しました。');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="yusei">
      {tooltip.visible && (
        <div 
          className="custom-tooltip"
          style={{ top: tooltip.y + 15, left: tooltip.x + 15 }}
        >
          {tooltip.content}
        </div>
      )}
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
                <span className="value">2027/04/01</span>
              </div>
            </div>
          </div>
          <div className="pro-page">

      <div className="main">
        <section className="demo-section">
          <h2>商品検索</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="proname">商品名:</label>
              <input 
                type="text" 
                id="proname" 
                value={proname} 
                onChange={(e) => setproname(e.target.value)} 
                placeholder="商品名を入力" 
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
          
          {submittedQuery !== null && !loading && (
            <div className="search-query">
              <h3>検索クエリ: {submittedQuery}</h3>
              {searchResults && <p>検索結果: {searchResults.length}件</p>}
            </div>
          )}
          
          {searchResults && searchResults.length > 0 ? (
            <div className="pro-results">
              <h3>商品一覧:</h3>
              <table>
                <thead>
                  <tr>
                    <th>名前</th>
                    <th>価格</th>
                    <th>在庫</th>
                    <th>商品紹介</th>
                    <th>商品画像URL</th>
                    <th>評価</th>
                    <th>特徴・機能</th>
                    <th>発売日</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((product: any) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.stock}</td>
                      <td 
                        className="description-cell" 
                        onMouseEnter={(e) => handleMouseEnter(e, product.description)}
                        onMouseLeave={handleMouseLeave}>
                          {product.description}
                        </td>
                      <td>{product.imageUrl}</td>
                      <td>{product.rating}</td>
                      <td>{product.features}</td>
                      <td>{product.releaseDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : searchResults && searchResults.length === 0 ? (
            <p>該当する商品は見つかりませんでした。</p>
          ) : null}
          
        </section>
      </div>
    </div>
          

          <div className="yusei-links">
            <Link to="/" className="yusei-link">ホームに戻る</Link>
          </div>
        </div>
      </div>
      
    </div>
    
  );
}

export default yusei;