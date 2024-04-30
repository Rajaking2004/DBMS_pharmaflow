const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Hospital = require('../models/Hospital');
const Pharmacy = require('../models/Pharmacy');
const Medicine = require('../models/Medicine');

// Controller for managing different entities
exports.manageEntity = async (req, res) => {
    const { entity } = req.params;
    let Model;

    switch (entity) {
        case 'patients':
            Model = Patient;
            break;
        case 'doctors':
            Model = Doctor;
            break;
        case 'hospitals':
            Model = Hospital;
            break;
        case 'pharmacies':
            Model = Pharmacy;
            break;
        case 'medicines':
            Model = Medicine;
            break;
        default:
            return res.status(400).json({ message: 'Invalid entity' });
    }

    const { operation } = req.query;

    switch (operation) {
        case 'getAll':
            try {
                const entities = await Model.find();
                res.status(200).json(entities);
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
            break;
        case 'getById':
            try {
                const entity = await Model.findById(req.params.id);
                if (!entity) {
                    return res.status(404).json({ message: `${entity} not found` });
                }
                res.status(200).json(entity);
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
            break;
        case 'create':
            try {
                const newEntity = await Model.create(req.body);
                res.status(201).json(newEntity);
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
            break;
        case 'update':
            try {
                const updatedEntity = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
                res.status(200).json(updatedEntity);
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
            break;
        case 'delete':
            try {
                await Model.findByIdAndDelete(req.params.id);
                res.status(200).json({ message: `${entity} deleted successfully` });
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
            break;
        default:
            res.status(400).json({ message: 'Invalid operation' });
    }
};
