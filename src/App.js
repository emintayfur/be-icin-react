// App.js

import "./App.css";
import React from "react";

function App() {
    const [inputValue, setInputValue] = React.useState('');
    const [list, setList] = React.useState([]);

    const onInputValueChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    }

    const onAddBtnClick = () => {
        alert(inputValue);
    }

    return (
        <main className="container">
            <div className="todo-box">
                <h3>YapılacaklarListesi</h3>

                <div className="add-todo-input-container">
                    <input
                        className="text-input"
                        placeholder="Bugün neler yapıyoruz :)"
                        onChange={onInputValueChange}
                    />

                    <button className="add-btn" onClick={onAddBtnClick}>
                        Ekle
                    </button>
                </div>

                <ul className="todo-s">
                    <li className="todo">
                        <div>
                            <span>Perşembe günü 12.00'deki eğitime katıl.</span>
                        </div>

                        <div className="todo-actions">
                            <button className="todo-btn remove">
                                <span>Sil</span>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </main>
    );
}

export default App;
