import React, { useEffect, useState } from 'react';
import '../styles/WaterConsumption.css';
import {
    fetchWaterConsumptionByUser,
    addWaterConsumption,
    deleteWaterConsumption,
    updateWaterConsumption,
} from '../services/api';
import { useUser } from '../context/UserContext';
import { Line } from 'react-chartjs-2';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    CircularProgress,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Pagination,
    Collapse,
    FormControlLabel,
    Switch,
} from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import dayjs from 'dayjs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function WaterConsumption() {
    const { user } = useUser();
    const [waterData, setWaterData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ id: null, suMiktari: '', tarih: '' });
    const [isEdit, setIsEdit] = useState(false);
    const [timeFilter, setTimeFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedRow, setExpandedRow] = useState(null);
    const [showTable, setShowTable] = useState(true); // Tabloyu aç/kapa kontrolü
    const itemsPerPage = 7;

    useEffect(() => {
        loadWaterData();
    }, [user]);

    useEffect(() => {
        applyFilter();
    }, [waterData, timeFilter]);

    const loadWaterData = async () => {
        try {
            setLoading(true);
            if (user?.id) {
                const data = await fetchWaterConsumptionByUser(user.id);
                setWaterData(data);
            }
        } catch (error) {
            console.error('Hata:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const applyFilter = () => {
        const now = dayjs();
        let data = [...waterData];

        if (timeFilter === 'week') {
            data = data.filter((item) => dayjs(item.tarih).isAfter(now.subtract(1, 'week')));
        } else if (timeFilter === 'month') {
            data = data.filter((item) => dayjs(item.tarih).isAfter(now.subtract(1, 'month')));
        } else if (timeFilter === 'year') {
            data = data.filter((item) => dayjs(item.tarih).isAfter(now.subtract(1, 'year')));
        }

        setFilteredData(data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            if (isEdit) {
                await updateWaterConsumption(formData.id, formData);
            } else {
                const dataToAdd = { ...formData, kullanici: { id: user.id } };
                await addWaterConsumption(dataToAdd);
            }
            loadWaterData();
            handleClose();
        } catch (error) {
            console.error('Hata:', error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bu kaydı silmek istediğinize emin misiniz?')) {
            try {
                await deleteWaterConsumption(id);
                loadWaterData();
            } catch (error) {
                console.error('Hata:', error.message);
            }
        }
    };

    const handleOpen = (data = { suMiktari: '', tarih: '' }) => {
        setFormData(data);
        setIsEdit(!!data.id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ id: null, suMiktari: '', tarih: '' });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const toggleRowExpand = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const chartData = {
        labels: filteredData.map((item) => item.tarih),
        datasets: [
            {
                label: 'Su Tüketimi (Litre)',
                data: filteredData.map((item) => item.suMiktari),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Su Tüketim Grafiği',
            },
        },
    };

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <Container className="container">
            <div className="header">
                <Typography variant="h4" className="header-title">
                    Su Tüketimi Yönetimi
                </Typography>
                <div className="filter">
                    <Button
                        variant="contained"
                        className="button"
                        onClick={() => handleOpen()}
                    >
                        Yeni Su Tüketimi Ekle
                    </Button>
                    <FormControl>
                        <InputLabel style={{ paddingLeft: '18px', lineHeight: '0.9', marginBottom: '5px' }}>Zaman Filtresi</InputLabel>
                        <Select
                            value={timeFilter}
                            onChange={(e) => setTimeFilter(e.target.value)}
                        >
                            <MenuItem value="all">Tüm Zamanlar</MenuItem>
                            <MenuItem value="week">Son 1 Hafta</MenuItem>
                            <MenuItem value="month">Son 1 Ay</MenuItem>
                            <MenuItem value="year">Son 1 Yıl</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={<Switch checked={showTable} onChange={() => setShowTable(!showTable)} />}
                        label="Listeyi Göster"
                        className="switch"
                    />
                </div>
            </div>

            <div className="graph">
                <Line data={chartData} options={chartOptions} />
            </div>

            {loading ? (
                <CircularProgress />
            ) : (
                showTable && (
                    <>
                        <Table className="table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>ID</strong></TableCell>
                                    <TableCell><strong>Su Miktarı (Litre)</strong></TableCell>
                                    <TableCell><strong>Tarih</strong></TableCell>
                                    <TableCell><strong>İşlemler</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedData.map((item) => (
                                    <>
                                        <TableRow key={item.id} onClick={() => toggleRowExpand(item.id)}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>{item.suMiktari}</TableCell>
                                            <TableCell>{item.tarih}</TableCell>
                                            <TableCell className="table-actions">
                                                <Button
                                                    color="primary"
                                                    onClick={() => handleOpen(item)}
                                                >
                                                    Düzenle
                                                </Button>
                                                <Button
                                                    color="secondary"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    Sil
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <Collapse in={expandedRow === item.id}>
                                            <TableRow>
                                                <TableCell colSpan={4}>
                                                    Sağlıklı bir yetişkinin kilo başına her gün yaklaşık 35 ml su içmesi gerekir.
                                                    Lütfen buna göre ihtiyacınız olan su miktarını içmeyi unutmayın. Sağlıklı günler dilerim.
                                                </TableCell>
                                            </TableRow>
                                        </Collapse>
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                        <Pagination
                            count={Math.ceil(filteredData.length / itemsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            sx={{ marginTop: 2 }}
                        />
                    </>
                )
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isEdit ? 'Su Tüketimini Güncelle' : 'Yeni Su Tüketimi Ekle'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Su Miktarı"
                        name="suMiktari"
                        value={formData.suMiktari}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Tarih"
                        name="tarih"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={formData.tarih}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        İptal
                    </Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained">
                        Kaydet
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default WaterConsumption;
