const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Client = require('../models/Client');
const Publisher = require('../models/Publisher');

// Register new user (initial signup from index.html)
router.post('/register', async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Validate input
        if (!fullname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Por favor completa todos los campos'
            });
        }

        // Check if user already exists in either collection
        const existingClient = await Client.findOne({ email });
        const existingPublisher = await Publisher.findOne({ email });

        if (existingClient || existingPublisher) {
            return res.status(400).json({
                success: false,
                message: 'Este email ya está registrado'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Store temporary user data (will be completed later)
        // For now, we'll return the data to be stored in sessionStorage
        res.status(200).json({
            success: true,
            message: 'Registro inicial exitoso',
            userData: {
                fullname,
                email,
                password: hashedPassword
            }
        });

    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor'
        });
    }
});

// Complete client profile
router.post('/complete-client', async (req, res) => {
    try {
        const { fullName, email, password, phone, city } = req.body;

        // Validate input
        if (!fullName || !email || !password || !phone || !city) {
            return res.status(400).json({
                success: false,
                message: 'Por favor completa todos los campos'
            });
        }

        // Create new client
        const newClient = new Client({
            fullName,
            email,
            password,
            phone,
            city
        });

        console.log('📝 Datos a guardar del Cliente:', newClient);

        await newClient.save();

        console.log('✅ Cliente guardado exitosamente en BD:', newClient);

        res.status(201).json({
            success: true,
            message: 'Cliente registrado exitosamente',
            user: {
                id: newClient._id,
                fullName: newClient.fullName,
                email: newClient.email,
                userType: 'client'
            }
        });

    } catch (error) {
        console.error('Error in complete-client:', error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Este email ya está registrado'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error al registrar cliente'
        });
    }
});

// Complete publisher profile
router.post('/complete-publisher', async (req, res) => {
    try {
        const { responsibleName, email, password, phone, city } = req.body;

        // Validate input
        if (!responsibleName || !email || !password || !phone || !city) {
            return res.status(400).json({
                success: false,
                message: 'Por favor completa todos los campos'
            });
        }

        // Create new publisher
        const newPublisher = new Publisher({
            responsibleName,
            email,
            password,
            phone,
            city
        });

        console.log('📝 Datos a guardar del Publicador:', newPublisher);

        await newPublisher.save();

        console.log('✅ Publicador guardado exitosamente en BD:', newPublisher);

        res.status(201).json({
            success: true,
            message: 'Publicador registrado exitosamente',
            user: {
                id: newPublisher._id,
                responsibleName: newPublisher.responsibleName,
                email: newPublisher.email,
                userType: 'publisher'
            }
        });

    } catch (error) {
        console.error('Error in complete-publisher:', error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Este email ya está registrado'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error al registrar publicador'
        });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Por favor completa todos los campos'
            });
        }

        // Check in both collections
        let user = await Client.findOne({ email: username });
        let userType = 'client';

        if (!user) {
            user = await Publisher.findOne({ email: username });
            userType = 'publisher';
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Usuario o contraseña incorrectos'
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Usuario o contraseña incorrectos'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Login exitoso',
            user: {
                id: user._id,
                email: user.email,
                name: userType === 'client' ? user.fullName : user.responsibleName,
                userType
            }
        });

    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor'
        });
    }
});

module.exports = router;
