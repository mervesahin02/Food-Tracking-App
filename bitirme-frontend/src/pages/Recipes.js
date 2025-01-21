import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import RecipeCard from '../components/RecipeCard';
import { fetchAllRecipesWithOwnership, addRecipe, updateRecipe, deleteRecipe, downloadRecipePdf } from '../services/api';
import { useUser } from '../context/UserContext';
import '../styles/Recipes.css';
import RecipeManagerIcon from '../assets/recipemanager.png';

function Recipes() {
    const { user } = useUser();
    const [allRecipes, setAllRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [recipeData, setRecipeData] = useState({
        tarifAdi: '',
        malzemeler: '',
        tarifAciklama: '',
        fotoUrl: '',
    });
    const [editingRecipe, setEditingRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const recipes = await fetchAllRecipesWithOwnership(user.id);
                setAllRecipes(recipes);
                setError(null);
            } catch (err) {
                setError('Tarif verileri yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [user.id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRecipeData({ ...recipeData, [name]: value });
    };

    const handleSaveRecipe = async () => {
        try {
            if (editingRecipe) {
                await updateRecipe(recipeData, editingRecipe.id, user.id);
                setSuccess('Tarif başarıyla güncellendi.');
            } else {
                await addRecipe(recipeData, user.id);
                setSuccess('Tarif başarıyla eklendi.');
            }
            setShowModal(false);
            setEditingRecipe(null);
            setRecipeData({
                tarifAdi: '',
                malzemeler: '',
                tarifAciklama: '',
                fotoUrl: '',
            });

            const updatedRecipes = await fetchAllRecipesWithOwnership(user.id);
            setAllRecipes(updatedRecipes);
        } catch (err) {
            setError('Tarif kaydedilirken bir hata oluştu.');
        }
    };

    const handleEditRecipe = (recipe) => {
        setEditingRecipe(recipe);
        setRecipeData(recipe);
        setShowModal(true);
    };

    const handleDeleteRecipe = async (id) => {
        try {
            await deleteRecipe(id, user.id);
            const updatedRecipes = await fetchAllRecipesWithOwnership(user.id);
            setAllRecipes(updatedRecipes);
            setSuccess('Tarif başarıyla silindi.');
        } catch (err) {
            setError('Tarif silinirken bir hata oluştu.');
        }
    };

    const handleDownloadPdf = async (id) => {
        try {
            await downloadRecipePdf(id);
            setSuccess('PDF başarıyla indirildi.');
        } catch (err) {
            setError('PDF indirilirken bir hata oluştu.');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingRecipe(null);
        setRecipeData({
            tarifAdi: '',
            malzemeler: '',
            tarifAciklama: '',
            fotoUrl: '',
        });
    };

    if (loading) {
        return <Spinner animation="border" />;
    }

    return (
        <Container>
            <div className="recipe__header-container">
                <h1 className="recipe__page-title">Tarif Yönetimi</h1>
                <img
                    src={RecipeManagerIcon}
                    alt="Tarif Yönetimi İkonu"
                    className="recipe__jumping-icon"
                />
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Button
                variant="primary"
                className="mb-3"
                onClick={() => setShowModal(true)}
            >
                Yeni Tarif Ekle
            </Button>

            <h2 className="recipe__recipe-header">Hazır Tarifler</h2>
            <div className="recipe__container">
                {allRecipes.filter(recipe => !recipe.kullanici).map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onEdit={handleEditRecipe}
                        onDelete={handleDeleteRecipe}
                        onDownloadPdf={handleDownloadPdf}
                        isEditable={false}
                    />
                ))}
            </div>

            <h2 className="recipe__recipe-header">Kullanıcı Tarifleri</h2>
            <div className="recipe__container">
                {allRecipes.filter(recipe => recipe.kullanici).map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onEdit={handleEditRecipe}
                        onDelete={handleDeleteRecipe}
                        onDownloadPdf={handleDownloadPdf}
                        isEditable={recipe.kullanici?.id === user.id}
                    />
                ))}
            </div>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <div className="modern-form-section">
                    <Modal.Header closeButton>
                        <Modal.Title>{editingRecipe ? 'Tarifi Düzenle' : 'Yeni Tarif Ekle'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="form-group-modern">
                                <Form.Label>Tarif Adı</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tarifAdi"
                                    value={recipeData.tarifAdi}
                                    onChange={handleInputChange}
                                    placeholder="Tarif adını girin"
                                />
                            </Form.Group>
                            <Form.Group className="form-group-modern">
                                <Form.Label>Malzemeler</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="malzemeler"
                                    value={recipeData.malzemeler}
                                    onChange={handleInputChange}
                                    placeholder="Malzemeleri girin"
                                />
                            </Form.Group>
                            <Form.Group className="form-group-modern">
                                <Form.Label>Açıklama</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="tarifAciklama"
                                    value={recipeData.tarifAciklama}
                                    onChange={handleInputChange}
                                    placeholder="Tarif açıklamasını girin"
                                />
                            </Form.Group>
                            <Form.Group className="form-group-modern">
                                <Form.Label>Fotoğraf URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fotoUrl"
                                    value={recipeData.fotoUrl}
                                    onChange={handleInputChange}
                                    placeholder="Fotoğraf URL'si girin"
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Vazgeç
                        </Button>
                        <Button variant="primary" onClick={handleSaveRecipe}>
                            Kaydet
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </Container>
    );
}

export default Recipes;
