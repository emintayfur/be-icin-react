// App.js

import "./App.css";
import React from "react";

function App() {
    const [inputValue, setInputValue] = React.useState("");
    const [list, setList] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const onInputValueChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    };

    const handleFormSubmit = (e) => {
        e?.preventDefault?.();

        const newList = [...list, inputValue];

        // talebi göndermeden önce loading'i true yapalım.
        setIsLoading(true);

        const requestPayload = { str: inputValue };
        fetch("http://localhost:3001/todo", {
            method: "POST", //
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestPayload), // payload'ı obje olarak gönderemeyiz bu yüzden bunu string'e çevirmemiz gerekiyor.
        })
            .then((res) => res.json())
            .then((responseData) => {
                if (responseData?.status) {
                    // eğer işlemler tamamlandıysa ve body içerisindeki status field'ının değeri true'ysa
                    setList(newList);
                    setInputValue("");
                } else {
                    // Bu ve bunun gibi hatalar uygulamanın kullanımını etkilemeyeceği için
                    // uygulamayı tamamen kullanıma kapatıp hatayı göstermek yerine hata,
                    // popup içerisinde kullanıcıya gösterilir
                    alert(responseData.message);
                }
            })
            .finally(() => {
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const deleteListItem = (todoIndex) => {
        const newList = list.filter(
            (listItem, listItemIdx) => listItemIdx !== todoIndex
        );

        // talebi göndermeden önce loading'i true yapalım.
        setIsLoading(true);

        const requestPayload = { index: todoIndex };
        fetch("http://localhost:3001/todo", {
            method: "DELETE", //
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestPayload), // payload'ı obje olarak gönderemeyiz bu yüzden bunu string'e çevirmemiz gerekiyor.
        })
            .then((res) => res.json())
            .then((responseData) => {
                if (responseData?.status) {
                    // eğer işlemler tamamlandıysa ve body içerisindeki status field'ının değeri true'ysa
                    setList(newList);
                } else {
                    // Bu ve bunun gibi hatalar uygulamanın kullanımını etkilemeyeceği için
                    // uygulamayı tamamen kullanıma kapatıp hatayı göstermek yerine hata,
                    // popup içerisinde kullanıcıya gösterilir
                    alert(responseData.message);
                }
            })
            .finally(() => {
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    React.useEffect(function () {
        // App ilk render edildiğinde (bağımlılık listesi = [])

        // listeyi çekmeden önce taleple ilgili olan durumları güncelle
        setIsLoading(true); // yükleniyor, henüz talep tamamlanmadı

        // listeyi sunucudan çek.
        fetch("http://localhost:3001/todos")
            .then((res) => {
                if (res.status === 200) {
                    // eğer status 200 ise dönen response'daki json text'ini objeye çevir
                    return res.json();
                }

                // eğer status 200 dışında bir değer ise Promise.reject ile hata dön
                return Promise.reject("Sunucu 200 dönmedi.");
            })
            .then((responseBody) => {
                // Yukarıdaki işlemler tamamsa (Sunucu 200 döndüyse ve response text objeye çevrildiyse.)

                // Eğer sunucudan dönen status field'ının değeri true ise ve data field'ı bir array (liste) ise
                if (responseBody?.status && Array.isArray(responseBody.data)) {
                    // liste state'ini api'dan gelen array değiştir.
                    setList(responseBody.data);

                    // debug için listeyi güncellediğine dair console'a mesaj yaz.
                    console.log("Liste güncellendi, yeni değer: ", responseBody.data);
                }
            })
            .catch((err) => {
                // hata alındığı zaman,
                setError(err.message);
                // Yukarıdaki işlemler sırasında bir hata olursa console.error ile console'a hata yaz.
                console.error(
                    `Liste alınırken bir hata ile karşılaşıldı. [${err.message}]`
                );
            })
            .finally(() => {
                // Talep başarılı da olsa başarısız da olsa loading'i false yapmamız gerekiyor.
                // Çünkü talep sonuçlandı.
                setIsLoading(false);
            });
    }, []);

    if (error) {
        return (
            <main className="container">
                <div>
                    {typeof error === "string"
                        ? error
                        : "Bilinmeyen bir hatayla karşılaşıldı."}
                </div>
            </main>
        );
    }
    return (
        <main className="container">
            <div className="todo-box">
                <h3>{isLoading ? "İşleniyor..." : "YapılacaklarListesi"}</h3>

                <form className="add-todo-input-container" onSubmit={handleFormSubmit}>
                    <input
                        className="text-input"
                        placeholder="Bugün neler yapıyoruz :)"
                        onChange={onInputValueChange}
                        value={inputValue}
                        disabled={isLoading}
                    />

                    <button
                        className="add-btn"
                        type="submit"
                        disabled={isLoading || !inputValue?.length}
                    >
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
                                            deleteListItem(todoIndex);
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
