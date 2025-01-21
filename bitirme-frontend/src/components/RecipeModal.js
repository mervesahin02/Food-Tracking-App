import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

const RecipeModal = ({
    show,
    handleClose,
    handleSave,
    recipeData,
    handleInputChange,
    isEditing,
}) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Tarifi Düzenle' : 'Yeni Tarif Ekle'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Tarif Adı</Form.Label>
                        <Form.Control
                            type="text"
                            name="tarifAdi"
                            value={recipeData.tarifAdi}
                            onChange={handleInputChange}
                            placeholder="Tarif adını girin"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Malzemeler</Form.Label>
                        <Form.Control
                            type="text"
                            name="malzemeler"
                            value={recipeData.malzemeler}
                            onChange={handleInputChange}
                            placeholder="Malzemeleri girin"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Açıklama</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="tarifAciklama"
                            value={recipeData.tarifAciklama}
                            onChange={handleInputChange}
                            placeholder="Tarif açıklamasını girin"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fotoğraf URL</Form.Label>
                        <Form.Control
                            type="text"
                            name="fotoUrl"
                            value={recipeData.fotoUrl}
                            onChange={handleInputChange}
                            placeholder="Fotoğraf URL'sini girin"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Kapat
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    {isEditing ? 'Güncelle' : 'Kaydet'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

RecipeModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    recipeData: PropTypes.shape({
        tarifAdi: PropTypes.string.isRequired,
        malzemeler: PropTypes.string.isRequired,
        tarifAciklama: PropTypes.string,
        fotoUrl: PropTypes.string,
    }).isRequired,
    handleInputChange: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
};

export default RecipeModal;
