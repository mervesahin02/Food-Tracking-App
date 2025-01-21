import React, { useState } from 'react';
import { Typography } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'; // Dashboard'a özgü stil
import NutritionImage from '../assets/nutrition.png'; // Sağdaki daire için görsel
import ExerciseImage from '../assets/extended.png'; // Soldaki daire için görsel

function Dashboard() {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('');

    const cards = [
        {
            title: 'Beslenme Günlüğü',
            description: 'Yemeklerinizi takip edin ve günlük beslenmenizi yönetin.',
            icon: <BookIcon sx={{ fontSize: 40, color: '#388e3c' }} />,
            path: '/nutrition-diary',
        },
        {
            title: 'Tarifler',
            description: 'Favori tariflerinizi ekleyin ve düzenleyin.',
            icon: <RestaurantIcon sx={{ fontSize: 40, color: '#0288d1' }} />,
            path: '/recipes',
        },
        {
            title: 'Egzersizler',
            description: 'Egzersiz planlarınızı oluşturun ve takip edin.',
            icon: <FitnessCenterIcon sx={{ fontSize: 40, color: '#7b1fa2' }} />,
            path: '/exercises',
        },
        {
            title: 'Su Tüketimi',
            description: 'Günlük su tüketiminizi yönetin.',
            icon: <WaterDropIcon sx={{ fontSize: 40, color: '#f57c00' }} />,
            path: '/water-consumption',
        },
    ];

    const handleNext = () => {
        setAnimationClass('dashboard-animate-left');
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
            setAnimationClass('');
        }, 500);
    };

    const handlePrev = () => {
        setAnimationClass('dashboard-animate-right');
        setTimeout(() => {
            setCurrentIndex(
                (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
            );
            setAnimationClass('');
        }, 500);
    };

    const visibleCards = [
        cards[(currentIndex - 1 + cards.length) % cards.length],
        cards[currentIndex],
        cards[(currentIndex + 1) % cards.length],
    ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-animated-background">
                <div className="dashboard-circle dashboard-circle-1">
                    <img
                        src={ExerciseImage} // Soldaki daireye ait görsel
                        alt="Egzersiz İkonu"
                        className="dashboard-circle-image"
                    />
                </div>
                <div className="dashboard-circle dashboard-circle-2">
                    <img
                        src={NutritionImage} // Sağdaki daireye ait görsel
                        alt="Beslenme İkonu"
                        className="dashboard-circle-image"
                    />
                </div>
            </div>

            <div className="dashboard-welcome-banner">
                <Typography variant="h4">Tekrardan, Hoşgeldiniz!</Typography>
            </div>

            <div className="dashboard-carousel">
                <button className="dashboard-arrow dashboard-left-arrow" onClick={handlePrev}>
                    &lt;
                </button>
                <div className={`dashboard-cards ${animationClass}`}>
                    {visibleCards.map((card, index) => (
                        <div
                            key={index}
                            className={`dashboard-card ${index === 1 ? 'dashboard-large-card' : 'dashboard-small-card'
                                }`}
                            onClick={() => navigate(card.path)}
                        >
                            {card.icon}
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </div>
                    ))}
                </div>
                <button className="dashboard-arrow dashboard-right-arrow" onClick={handleNext}>
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
