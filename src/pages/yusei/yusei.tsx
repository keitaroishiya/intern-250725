/** * 自分のページのサンプル
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import './yusei.scss';

function Yusei() {
  // --- ToDoリスト用のState ---
  // タスクのリストを管理するstate
  const [todos, setTodos] = useState([
    { id: 1, text: 'Reactの学習', completed: false },
    { id: 2, text: 'SCSSの練習', completed: true },
  ]);
  // 新規タスクの入力値を管理するstate
  const [inputValue, setInputValue] = useState('');

  // --- ToDoリスト用の関数 ---
  // 入力値が変更されたときにstateを更新
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // タスクを追加する関数
  const handleAddTodo = () => {
    // 入力が空の場合は何もしない
    if (inputValue.trim() === '') return;

    const newTodo = {
      id: Date.now(), // ユニークなIDを生成
      text: inputValue,
      completed: false,
    };
    // 既存のリストに新しいタスクを追加
    setTodos([...todos, newTodo]);
    setInputValue(''); // 入力欄をクリア
  };

  // タスクの完了状態を切り替える関数
  const handleToggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // タスクを削除する関数
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };


  return (
    <div className="yusei">
      <div className="yusei-container">
        <h1 className="yusei-title">ゆうせいのページ</h1>
        
        <div className="yusei-content">
          <div className="yusei-profile">
            {/* ... (プロフィール部分は変更なし) ... */}
            <div className="yusei-profile-header">
              <div className="yusei-avatar">Y</div>
              <h2 className="yusei-name">柳田  憂誠</h2>
            </div>
            <div className="yusei-info">
              <div className="yusei-info-item"><span className="label">メール:</span><span className="value">yusei@internet.gmo</span></div>
              <div className="yusei-info-item"><span className="label">部署:</span><span className="value">開発部</span></div>
              <div className="yusei-info-item"><span className="label">役職:</span><span className="value">新米エンジニア</span></div>
              <div className="yusei-info-item"><span className="label">入社日:</span><span className="value">2025/04/01</span></div>
            </div>
          </div>

          {/* ===== ここから追加したToDoリスト機能 ===== */}
          <div className="yusei-todo-feature">
            <h3 className="yusei-feature-title">📝 My ToDo List</h3>
            <div className="yusei-todo-input-area">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="yusei-todo-input"
                placeholder="新しいタスクを入力"
              />
              <button onClick={handleAddTodo} className="yusei-button">追加</button>
            </div>
            <ul className="yusei-todo-list">
              {todos.map(todo => (
                <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                  <span onClick={() => handleToggleTodo(todo.id)} className="todo-text">
                    {todo.text}
                  </span>
                  <button onClick={() => handleDeleteTodo(todo.id)} className="delete-button">削除</button>
                </li>
              ))}
            </ul>
          </div>
          {/* ===== ここまで ===== */}

          <div className="yusei-links">
            <Link to="/" className="yusei-link">ホームに戻る</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Yusei;