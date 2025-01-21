import React from 'react';
import '../styles/Home.css';

function Home() {
    return (
        <div className="home-container">
            {/* Hoş Geldiniz Banner */}
            <div className="home-welcome-banner">
                <h1 className="home-welcome-title">Hoş Geldiniz!</h1>
                <p className="home-welcome-text">
                    Sağlıklı bir yaşam için bizimle başlayın. Şimdi keşfedin ve yeni bir yaşam tarzına adım atın.
                </p>
            </div>

            {/* Kartlar */}
            <div className="home-card-container">
                <div className="home-card home-exercise-card">
                    <img
                        src="https://www.skechers.com.tr/blog/wp-content/uploads/2023/03/fitnes.jpg"
                        alt="Egzersiz"
                        className="home-card-image"
                    />
                    <h3>Egzersiz</h3>
                    <p>Egzersiz planlarıyla sağlıklı yaşayın. Kendi fitness hedeflerinizi oluşturun.</p>
                </div>
                <div className="home-card home-recipe-card">
                    <img
                        src="https://t1.pixers.pics/img-c676e9e9/posterler-tarif-kart-tasarim.jpg?H4sIAAAAAAAAA42PQW6EMAxFr8NIAZskThwOMNs5AoIkM6UdGJTQFvX0DW3VXaXKC39b_s_68Lrk4RrBx2WLCeYphHuE63QvU-5SzNNHrLQ2Ak9d2d4rxKIebzH59FirukUjamUEkRZG6lP3PhTnPKSX6mnb1twBZNWs015wpfkMfs4gsbWADOTYBaKoPdvYr3XehiUMKdRS7wqbdbkJPOr_WIYWgcbQjmbkgHrkXkrcCetfwhdWKSXI0IH-CWkRhT3CbWmaq5L2Ua636nm9neCPn98aigvOF9AGtAN0wPZY9eeLNtqhY9vLMergWm5ZuujJ0dUqa5VHYibJvilfPgGU7sVZigEAAA=="
                        alt="Tarifler"
                        className="home-card-image"
                    />
                    <h3>Tarifler</h3>
                    <p>Sağlıklı tariflerle mutfakta değişiklik yapın. Lezzetli ve sağlıklı yemek tarifleri.</p>
                </div>
                <div className="home-card home-water-card">
                    <img
                        src="https://diyetisyengizemakbulut.com/images/uploads/yazilar/188856129719151403.jpg"
                        alt="Su Tüketimi"
                        className="home-card-image"
                    />
                    <h3>Su Tüketimi</h3>
                    <p>Günlük su tüketiminizi takip edin ve sağlığınızı koruyun.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
