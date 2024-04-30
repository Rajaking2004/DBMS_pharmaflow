import React, { useState, useEffect } from 'react';
import './medicalInventory.css';

const MedicineInventory = () => {
    const [medicines, setMedicines] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [manufacturer, setManufacturer] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [selectedMedicine, setSelectedMedicine] = useState(null);

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            const response = await fetch('/api/manage/medicines');
            if (!response.ok) {
                throw new Error('Failed to fetch medicines');
            }
            const data = await response.json();
            setMedicines(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddMedicine = async () => {
        try {
            const response = await fetch('/api/manage/medicines', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    price,
                    manufacturer,
                    expiryDate
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to add medicine');
            }
            fetchMedicines();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteMedicine = async (id) => {
        try {
            const response = await fetch(`/api/manage/medicines/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete medicine');
            }
            fetchMedicines();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditMedicine = async () => {
        try {
            const response = await fetch(`/api/manage/medicines/${selectedMedicine._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    price,
                    manufacturer,
                    expiryDate
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update medicine');
            }
            fetchMedicines();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectMedicine = (medicine) => {
        setSelectedMedicine(medicine);
        setName(medicine.name);
        setPrice(medicine.price);
        setManufacturer(medicine.manufacturer);
        setExpiryDate(medicine.expiryDate);
    };

    return (
        <div className="App">
            <div className="input-container">
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
                <input type="text" value={manufacturer} onChange={e => setManufacturer(e.target.value)} placeholder="Manufacturer" />
                <input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} placeholder="Expiry Date" />
                {selectedMedicine ? (
                    <div>
                        <button onClick={handleEditMedicine}>Update</button>
                        <button onClick={() => setSelectedMedicine(null)}>Cancel</button>
                    </div>
                ) : (
                    <button onClick={handleAddMedicine}>Add Medicine</button>
                )}
            </div>
            <div className="medicines-container">
                <h2>Medicine Inventory</h2>
                <ul>
                    {medicines.map(medicine => (
                        <li key={medicine._id}>
                            <span>Name: {medicine.name}</span>
                            <span>Price: {medicine.price}</span>
                            <span>Manufacturer: {medicine.manufacturer}</span>
                            <span>Expiry Date: {medicine.expiryDate}</span>
                            <button onClick={() => handleSelectMedicine(medicine)}>Edit</button>
                            <button onClick={() => handleDeleteMedicine(medicine._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MedicineInventory;
