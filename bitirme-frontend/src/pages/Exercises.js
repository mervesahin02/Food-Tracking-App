import React, { useEffect, useState } from 'react';
import { fetchAllExercises, downloadExercisePdf } from '../services/api';
import '../styles/Exercise.css';

function Exercises() {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadExercises = async () => {
            try {
                const data = await fetchAllExercises();
                setExercises(data);
            } catch (err) {
                setError('Egzersizleri yüklerken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };
        loadExercises();
    }, []);

    const handleDownloadPdf = (id) => {
        downloadExercisePdf(id).catch((err) => alert('PDF indirirken hata oluştu.'));
    };

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="exercises-container">
            <h1>Egzersizler</h1>
            <div className="exercises-grid">
                {exercises.map((exercise) => (
                    <div className="exercise-card" key={exercise.id}>
                        <img src={exercise.gorselUrl} alt={exercise.egzersizAdi} className="exercise-image" />
                        <h2>{exercise.egzersizAdi}</h2>
                        <p>{exercise.aciklama}</p>
                        <p><strong>Zorluk Seviyesi:</strong> {exercise.zorlukSeviyesi}</p>
                        <button onClick={() => handleDownloadPdf(exercise.id)} className="download-button">
                            PDF İndir
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Exercises;
