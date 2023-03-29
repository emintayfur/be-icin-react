// App.js

import "./App.css";
import React from "react";

function App() {
    const [inputValue, setInputValue] = React.useState("");
    const [list, setList] = React.useState([]);

    const onInputValueChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    };

    const handleFormSubmit = (e) => {
        e?.preventDefault?.();

        const newList = [...list, inputValue];

        setList(newList);
        setInputValue('');
    };

    const deleteListItem = (todoIndex) => {
        const newList = list.filter((listItem, listItemIdx) => listItemIdx !== todoIndex);
        setList(newList);
    }

    return (
        <main className="container">
            <div className="todo-box">
                <h3>YapılacaklarListesi</h3>

                <form className="add-todo-input-container" onSubmit={handleFormSubmit}>
                        <input
                            className="text-input"
                            placeholder="Bugün neler yapıyoruz :)"
                            onChange={onInputValueChange}
                        />

                        <button className="add-btn" type="submit">
                            Ekle
                        </button>
                </form>

                {list.length > 0 ? (
                    <ul className="todo-s">
                        {list.map((todo, todoIndex) => (
                            <li className="todo" key={todoIndex}>
                                <div>
                                    <span>{todo}</span>
                                </div>

                                <div className="todo-actions">
                                    <button
                                        className="todo-btn remove"
                                        onClick={() => {
                                            deleteListItem(todoIndex)
                                        }}
                                    >
                                        <span>Sil</span>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        </main>
    );
}

export default App;
