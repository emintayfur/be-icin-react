import "./App.css";
import React from "react";

function App() {
    return (
        <main className="container">
            <div className="todo-box">
                <h3>YapılacaklarListesi</h3>

                <div className="add-todo-input-container">
                    <input
                        className="text-input"
                        placeholder="Bugün neler yapıyoruz :)"
                    />

                    <button className="add-btn">
                        Ekle
                    </button>
                </div>

                <ul className="todo-s">
                   <li className="todo">
                       <div>
                           <span>Perşembe günü 12.00'deki eğitime katıl.</span>
                       </div>

                       <div className="todo-actions">
                           <button className="todo-btn done">
                               <span>Tamam</span>
                           </button>
                           <button className="todo-btn remove">
                               <span>Sil</span>
                           </button>
                       </div>
                   </li>

                    <li className="todo">
                        <div className="ok">
                            <span>Eğitim için makale yaz.</span>
                        </div>

                        <div className="todo-actions">
                            <button className="todo-btn done">
                                <span>Tamam</span>
                            </button>
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
