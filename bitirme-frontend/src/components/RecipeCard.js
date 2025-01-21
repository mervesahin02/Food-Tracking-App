import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

const RecipeCard = ({ recipe, onEdit, onDelete, onDownloadPdf, isEditable }) => {
    return (
        <Card className="recipe-card shadow-sm">
            <Card.Img variant="top" src={recipe.fotoUrl || 'https://via.placeholder.com/150'} />
            <Card.Body>
                <Card.Title>{recipe.tarifAdi}</Card.Title>
                <Card.Text>
                    <strong>Malzemeler:</strong> {recipe.malzemeler}
                </Card.Text>
                <Card.Text>
                    <strong>Açıklama:</strong> {recipe.tarifAciklama}
                </Card.Text>
                {isEditable && (
                    <>
                        <Button variant="warning" onClick={() => onEdit(recipe)} className="me-2">
                            Düzenle
                        </Button>
                        <Button variant="danger" onClick={() => onDelete(recipe.id)} className="me-2">
                            Sil
                        </Button>
                    </>
                )}
                {/* PDF İndir Butonu */}
                <Button
                    variant="secondary"
                    className="pdf-download-btn"
                    onClick={() => onDownloadPdf(recipe.id)}
                >
                    PDF İndir
                </Button>
            </Card.Body>
        </Card>
    );
};

RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        id: PropTypes.number.isRequired,
        tarifAdi: PropTypes.string.isRequired,
        malzemeler: PropTypes.string.isRequired,
        tarifAciklama: PropTypes.string,
        fotoUrl: PropTypes.string,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDownloadPdf: PropTypes.func.isRequired,
    isEditable: PropTypes.bool.isRequired,
};

export default RecipeCard;
