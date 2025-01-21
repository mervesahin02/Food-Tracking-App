// components/RecipeForm.js

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

function RecipeForm({ recipeData, handleInputChange, handleSubmit, handleCancel }) {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Tarif Adı</Form.Label>
                <Form.Control
                    type="text"
                    name="tarifAdi"
                    value={recipeData.tarifAdi}
                    onChange={handleInputChange}
                    placeholder="Tarif adı girin"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Malzemeler</Form.Label>
                <Form.Control
                    as="textarea"
                    name="malzemeler"
                    value={recipeData.malzemeler}
                    onChange={handleInputChange}
                    placeholder="Malzemeleri girin"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Açıklama</Form.Label>
                <Form.Control
                    as="textarea"
                    name="tarifAciklama"
                    value={recipeData.tarifAciklama}
                    onChange={handleInputChange}
                    placeholder="Tarif açıklaması girin"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Fotoğraf URL</Form.Label>
                <Form.Control
                    type="text"
                    name="fotoUrl"
                    value={recipeData.fotoUrl}
                    onChange={handleInputChange}
                    placeholder="Fotoğraf URL'sini girin"
                />
            </Form.Group>
            <div className="d-flex justify-content-end mt-3">
                <Button variant="secondary" className="me-2" onClick={handleCancel}>
                    İptal
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Kaydet
                </Button>
            </div>
        </Form>
    );
}

RecipeForm.propTypes = {
    recipeData: PropTypes.shape({
        tarifAdi: PropTypes.string.isRequired,
        malzemeler: PropTypes.string.isRequired,
        tarifAciklama: PropTypes.string.isRequired,
        fotoUrl: PropTypes.string.isRequired,
    }).isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
};

export default RecipeForm;
