# BookEvent - Guía de Instalación y Uso

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- MongoDB Atlas (ya configurado en `.env`)
- Navegador web moderno

## 🚀 Instalación del Backend

### Paso 1: Instalar Dependencias

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
cd backend
npm install
```

Este comando instalará todas las dependencias necesarias:
- Express (servidor web)
- Mongoose (conexión a MongoDB)
- CORS (permitir peticiones del frontend)
- bcryptjs (encriptación de contraseñas)
- dotenv (variables de entorno)

### Paso 2: Iniciar el Servidor

Después de instalar las dependencias, inicia el servidor:

```bash
npm start
```

Deberías ver estos mensajes:
```
🚀 Server is running on port 5000
✅ MongoDB connected successfully
```

**IMPORTANTE:** Deja esta terminal abierta mientras uses la aplicación.

## 🌐 Uso del Frontend

### Actualizar los Archivos HTML

Necesitas agregar los scripts de JavaScript a los archivos HTML:

#### 1. Actualizar `etapatrescliente.html`

Reemplaza la línea del script (cerca de la línea 294) con:
```html
<script src="client-form.js"></script>
```

#### 2. Actualizar `etapatres.html`

Reemplaza la línea del script con:
```html
<script src="publisher-form.js"></script>
```

### Abrir la Aplicación

1. Asegúrate de que el backend esté ejecutándose (paso 2 anterior)
2. Abre `frontend/index.html` en tu navegador web
3. ¡Listo! Ya puedes usar la aplicación

## 📝 Flujo de Registro

### Para Clientes (Quiero Reservar):

1. Abre `index.html`
2. Haz clic en "Crear cuenta"
3. Llena el formulario de registro (nombre, email, contraseña)
4. Haz clic en "Crear Cuenta"
5. Selecciona "Quiero Reservar"
6. Completa tus datos personales (nombre completo, teléfono, ciudad)
7. ¡Cuenta creada! Los datos se guardan en MongoDB

### Para Publicadores (Quiero Publicar):

1. Abre `index.html`
2. Haz clic en "Crear cuenta"
3. Llena el formulario de registro (nombre, email, contraseña)
4. Haz clic en "Crear Cuenta"
5. Selecciona "Quiero Publicar"
6. Completa tus datos (nombre del responsable, teléfono, ciudad)
7. ¡Cuenta creada! Los datos se guardan en MongoDB

## 🔐 Login

Una vez registrado, puedes iniciar sesión:
1. En `index.html`, ingresa tu email y contraseña
2. Haz clic en "Iniciar Sesión"
3. El sistema te dará la bienvenida

## 🗄️ Base de Datos

Los datos se guardan en MongoDB Atlas en dos colecciones:
- **clients**: Usuarios que quieren reservar
- **publishers**: Usuarios que quieren publicar salones

Puedes ver los datos en MongoDB Atlas o usando MongoDB Compass con la URL de conexión del archivo `.env`.

## ⚠️ Solución de Problemas

### Error: "Error de conexión con el servidor"
- Verifica que el backend esté ejecutándose (`npm start` en la carpeta `backend`)
- Asegúrate de que el servidor muestre "MongoDB connected successfully"

### Error: "Este email ya está registrado"
- El email ya existe en la base de datos
- Usa otro email o inicia sesión con el existente

### El formulario no envía datos
- Abre la consola del navegador (F12) y revisa los errores
- Verifica que los archivos `client-form.js` y `publisher-form.js` estén correctamente enlazados

## 📁 Estructura del Proyecto

```
BookEvent/
├── backend/
│   ├── models/
│   │   ├── Client.js          # Modelo de clientes
│   │   └── Publisher.js       # Modelo de publicadores
│   ├── routes/
│   │   └── auth.js            # Rutas de autenticación
│   ├── .env                   # Configuración de MongoDB
│   ├── package.json           # Dependencias
│   └── server.js              # Servidor Express
└── frontend/
    ├── index.html             # Login y registro
    ├── etapados.html          # Selección de tipo de cuenta
    ├── etapatrescliente.html  # Formulario de cliente
    ├── etapatres.html         # Formulario de publicador
    ├── scrip.js               # Lógica de login/registro
    ├── client-form.js         # Lógica de formulario cliente
    ├── publisher-form.js      # Lógica de formulario publicador
    └── style.css              # Estilos
```

## 🎯 Próximos Pasos

- Crear dashboards para clientes y publicadores
- Implementar búsqueda de salones
- Agregar sistema de reservas
- Implementar autenticación con JWT tokens
