Descripción del desafío
Desarrollar una aplicación web para gestionar un catálogo de autopartes con CRUD
completo, importación y exportación de datos.

Requisitos
Gestión de Artículos
Cada artículo debe tener:
• Código de pieza (único)
• Nombre/Descripción
• Marca
• Categoría (Frenos, Motor, Suspensión, etc.)
• Stock actual
• Stock mínimo
• Precio unitario
• Ubicación en depósito
• Proveedor

Funcionalidades:
• Listado con paginación y búsqueda
• Filtros por categoría y stock crítico (stock < stock mínimo)
• Crear, editar y eliminar artículos
• *Importar artículos desde archivo CSV*
• *Exportar a Excel (.xlsx)* con todos los campos
• Indicador visual de stock crítico
Importación CSV - Especificaciones

Formato esperado del CSV:
csv
codigo_pieza,nombre,marca,categoria,stock_actual,stock_minimo,precio_unitario,ubicacion,pr
oveedor
FRE-001,Pastillas de freno delanteras,Bosch,Frenos,50,10,1500.00,A-12-3,AutoPartes SA
MOT-045,Filtro de aceite,Mann,Motor,120,20,850.50,B-05-1,Repuestos del Sur

Funcionalidades:
• Validar formato y campos obligatorios
• Detectar y reportar errores (códigos duplicados, datos inválidos)
• Mostrar resumen de importación (exitosos, fallidos)
• No importar ningún registro si hay errores críticos (transaccional)

Stack Tecnológico
• *Frontend:* React + Material UI
• *Backend:* Django + DRF
• *Base de datos:* MySQL
• *Containerización:* Docker + Docker Compose
Testing Requerido

Backend (obligatorio):
• Tests de API endpoints (GET, POST, PUT, DELETE)
• Validaciones de modelo (unicidad, campos obligatorios)
• Tests de importación CSV (casos válidos e inválidos)
• Tests de exportación a Excel
• Cobertura mínima: 70%

Frontend (recomendado):
• Tests de componentes principales
• Tests de formularios y validaciones
• Usar Jest + React Testing Library

Entregables
1. Repositorio Git con código fuente
2. README con:
- Instrucciones de instalación y ejecución
- Comandos para correr tests
- Documentación de endpoints
- Formato del CSV para importación
3. Docker Compose funcional
4. Datos de ejemplo precargados
5. Tests ejecutándose correctamente
6. Archivo CSV de ejemplo para testing

Instrucciones para el envío del desafío.
- Enviar en link del repositorio de la aplicación.
- El repositorio de preferencia debe ser privado con permisos compartidos a los
siguientes usuarios enzovillarrea@aitsolutions.com.ar,
vanesagarnica@aitsolutions.com.ar y gustavomenacba@gmail.com