import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    Grid,
    MenuItem,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import '../styles/NutritionDiary.css';
import { fetchAllNutritionDiaryByUser, addOrUpdateNutritionDiary, deleteNutritionDiary } from '../services/api';
import { UserContext } from '../context/UserContext';
import foodManagerImage from '../assets/foodmanager.png';

const NutritionDiary = () => {
    const { user } = useContext(UserContext);
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState({
        tarih: '',
        ogunTipi: '',
        yemekAdi: '',
        kalori: '',
        notlar: '',
    });
    const [refresh, setRefresh] = useState(false);
    const [isListVisible, setIsListVisible] = useState(true);
    const [editEntry, setEditEntry] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const mealTypes = [
        { value: 'KAHVALTI', label: 'Kahvaltı' },
        { value: 'OGLE_YEMEGI', label: 'Öğle Yemeği' },
        { value: 'AKSAM_YEMEGI', label: 'Akşam Yemeği' },
        { value: 'ARA_OGUN', label: 'Ara Öğün' },
    ];

    useEffect(() => {
        const fetchEntries = async () => {
            if (!user || !user.id) return;
            try {
                const response = await fetchAllNutritionDiaryByUser(user.id);
                setEntries(response);
            } catch (error) {
                console.error('Beslenme günlüğü getirilemedi:', error);
            }
        };

        fetchEntries();
    }, [refresh, user]);

    const handleAddEntry = async () => {
        if (!user || !user.id) return;
        try {
            await addOrUpdateNutritionDiary({
                kullaniciId: user.id,
                ...newEntry,
            });
            setRefresh(!refresh);
            setNewEntry({ tarih: '', ogunTipi: '', yemekAdi: '', kalori: '', notlar: '' });
        } catch (error) {
            console.error('Giriş eklenemedi:', error);
        }
    };

    const handleDeleteEntry = async (id) => {
        try {
            await deleteNutritionDiary(id);
            setRefresh(!refresh);
        } catch (error) {
            console.error('Giriş silinemedi:', error);
        }
    };

    const handleEditEntryOpen = (entry) => {
        setEditEntry(entry);
        setIsEditDialogOpen(true);
    };

    const handleEditEntryClose = () => {
        setIsEditDialogOpen(false);
        setEditEntry(null);
    };

    const handleUpdateEntry = async () => {
        if (!editEntry) return;
        try {
            await addOrUpdateNutritionDiary({
                id: editEntry.id,
                kullaniciId: user.id,
                ...editEntry,
            });
            setRefresh(!refresh);
            handleEditEntryClose();
        } catch (error) {
            console.error('Giriş güncellenemedi:', error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'tarih', headerName: 'Tarih', width: 150 },
        { field: 'ogunTipi', headerName: 'Öğün Tipi', width: 150 },
        { field: 'yemekAdi', headerName: 'Yemek Adı', width: 200 },
        { field: 'kalori', headerName: 'Kalori', width: 100 },
        { field: 'notlar', headerName: 'Notlar', width: 300 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditEntryOpen(params.row)}
                        style={{ marginRight: '10px' }}
                    >
                        Güncelle
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteEntry(params.row.id)}
                    >
                        Sil
                    </Button>
                </Box>
            ),
        },
    ];

    return (
        <Box className="nutrition-diary__container">
            <Box className="nutrition-diary__header-container">
                <Typography className="nutrition-diary__title">Beslenme Günlüğü</Typography>
                <img src={foodManagerImage} alt="Beslenme Günlüğü" className="nutrition-diary__header-image" />
                <Typography className="nutrition-diary__subtitle">
                    Günlük yemeklerinizi takip edin ve yönetin.
                </Typography>
            </Box>

            <Card className="nutrition-diary__new-entry-card">
                <CardContent>
                    <Typography className="nutrition-diary__new-entry-form-title">Yeni Giriş Ekle</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                label="Tarih"
                                type="date"
                                value={newEntry.tarih}
                                onChange={(e) => setNewEntry({ ...newEntry, tarih: e.target.value })}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                select
                                label="Öğün Tipi"
                                value={newEntry.ogunTipi}
                                onChange={(e) => setNewEntry({ ...newEntry, ogunTipi: e.target.value })}
                                fullWidth
                            >
                                {mealTypes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                label="Yemek Adı"
                                value={newEntry.yemekAdi}
                                onChange={(e) => setNewEntry({ ...newEntry, yemekAdi: e.target.value })}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                label="Kalori"
                                type="number"
                                value={newEntry.kalori}
                                onChange={(e) => setNewEntry({ ...newEntry, kalori: e.target.value })}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Notlar"
                                value={newEntry.notlar}
                                onChange={(e) => setNewEntry({ ...newEntry, notlar: e.target.value })}
                                fullWidth
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleAddEntry}
                                className="nutrition-diary__add-entry-button"
                            >
                                Ekle
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Button
                variant="contained"
                color="primary"
                onClick={() => setIsListVisible(!isListVisible)}
                className="nutrition-diary__toggle-list-button"
            >
                {isListVisible ? 'Listeyi Gizle' : 'Listeyi Göster'}
            </Button>

            {isListVisible && (
                <Card className="nutrition-diary__entries-list-card">
                    <CardContent>
                        <Typography className="nutrition-diary__entries-list-title">Günlük Liste</Typography>
                        <DataGrid
                            rows={entries}
                            columns={columns}
                            pageSize={4}
                            rowsPerPageOptions={[4]}
                            pagination
                            getRowId={(row) => row.id}
                            sx={{
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: '#1976d2',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                },
                            }}
                        />
                    </CardContent>
                </Card>
            )}

            <Dialog open={isEditDialogOpen} onClose={handleEditEntryClose}>
                <DialogTitle>Giriş Güncelle</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                label="Tarih"
                                type="date"
                                value={editEntry?.tarih || ''}
                                onChange={(e) => setEditEntry({ ...editEntry, tarih: e.target.value })}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                select
                                label="Öğün Tipi"
                                value={editEntry?.ogunTipi || ''}
                                onChange={(e) => setEditEntry({ ...editEntry, ogunTipi: e.target.value })}
                                fullWidth
                            >
                                {mealTypes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                label="Yemek Adı"
                                value={editEntry?.yemekAdi || ''}
                                onChange={(e) => setEditEntry({ ...editEntry, yemekAdi: e.target.value })}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                label="Kalori"
                                type="number"
                                value={editEntry?.kalori || ''}
                                onChange={(e) => setEditEntry({ ...editEntry, kalori: e.target.value })}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Notlar"
                                value={editEntry?.notlar || ''}
                                onChange={(e) => setEditEntry({ ...editEntry, notlar: e.target.value })}
                                fullWidth
                                multiline
                                rows={3}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditEntryClose} color="secondary">
                        İptal
                    </Button>
                    <Button onClick={handleUpdateEntry} color="primary">
                        Güncelle
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default NutritionDiary;
