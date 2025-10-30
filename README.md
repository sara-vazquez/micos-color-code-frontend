# MICOS COLOR CODE
## 🧩 Descripción
MICOS es una web (mobile-first) dirigida a niños y niñas de entre 3 y 8 años con daltonismo dicromático. Surge tras la creación del sistema visual "Micos color code", pensado para facilitar la identificación de los colores por parte de los peques con esta alteración visual. 

Con la web se pretende que mediante una forma **lúdica, visual y sencilla**, continúen con el aprendizaje también a través de las pantallas. 
<p align="left">
  <img src="src/assets/preview_admin.png" alt="admin preview" height="35%" />
  <img src="src/assets/preview_user.png" alt="user home preview" height="35%" />
</p>

## 🧠 Proceso de diseño y documentación
- [Ver proceso de diseño en Figma ↗︎](https://www.figma.com/design/YueEJOk6QapJxU4PCOoqim/micos?node-id=0-1&t=ewvxFKvqEnRvRAFa-1)

- [Ver documentación del proyecto en Notion ↗︎](https://www.notion.so/sara-vazquez/MICOS-PROYECTO-FINAL-23fd5565c5b68048a775fc74e9a9f749)

## User flow
```mermaid
flowchart TD
    A[Inicio - Landing Page] --> B{Usuario autenticado?}
    
    B -->|No| C[Página de Log in/Sign in]
    B -->|Sí| D[Dashboard Principal]
    
    C --> C1[Formulario Login]
    C1 --> C2{Credenciales válidas?}
    C2 -->|No| C3[Mostrar error]
    C3 --> C1
    C2 -->|Sí| D
    
    D --> E[¿Qué es Micos Color Code?]
    D --> F[¿Qué es el daltonismo?]
    D --> G[Materiales para imprimir 🖨️]
    D --> H[Entrar a jugar 🎮]
    D --> I[Zona adultos - Botón flotante]
    
    E --> E1[Página informativa]
    E1 --> D
    
    F --> F1[Página educativa sobre daltonismo]
    F1 --> D
    
    G --> G1[Lista de recursos PDF]
    G1 --> G2{Seleccionar PDF}
    G2 --> G3[Descargar/Ver PDF]
    G3 --> G1
    G1 --> D
    
    H --> H1[Selector de juego]
    H1 --> H2[Memory Cards]
    H2 --> H3[Pantalla de juego]
    H3 --> H4{Juego terminado?}
    H4 -->|No| H3
    H4 -->|Sí| H5[Pantalla de resultados]
    H5 --> H6{Jugar de nuevo?}
    H6 -->|Sí| H3
    H6 -->|No| H1
    H1 --> D
    
    I --> I1{Seleccionar opción}
    I1 --> I2[Consejos de uso con niños]
    I1 --> I3[Contacto/Feedback]
    
    I2 --> I4[Modal de consejos]
    I4 --> D
    
    style A fill:#244790,stroke:#FFFFFF,stroke-width:2px,color:#FFFFFF
    style D fill:#244790,stroke:#FFFFFF,stroke-width:2px,color:#FFFFFF
    style C fill:#244790,stroke:#FFFFFF,stroke-width:2px,color:#FFFFFF
    style C1 fill:#244790,stroke:#FFFFFF,stroke-width:2px,color:#FFFFFF
    style C3 fill:#244790,stroke:#FFFFFF,stroke-width:2px,color:#FFFFFF
    style E1 fill:#244790,stroke:#FFFFFF,stroke-width:2px,color:#FFFFFF
    style F1 fill:#244790,stroke:#FFFFFF,stroke-width:2px,color:#FFFFFF
    style G1 fill:#244790,stroke:#FFFFFF,stroke-width:2px,color:#FFFFFF
    style G3 fill:#244790,stroke:#FFFFFF,stroke-width:2px,color:#FFFFFF
    style H1 fill:#244790,stroke:#FFFFFF,stroke-width:2px,color:#FFFFFF
    style H2 fill:#244790,stroke:#FFFFFF,stroke-width:2px,color:#FFFFFF
    style H3 fill:#244790,stroke:#FFFFFF,stroke-width:2px,color:#FFFFFF
    style H5 fill:#244790,stroke:#FFFFFF,stroke-width:2px,color:#FFFFFF
    style I4 fill:#244790,stroke:#FFFFFF,stroke-width:2px,color:#FFFFFF
    
    style B fill:#FFECEA,stroke:#EB5200,stroke-width:2px,color:#EB5200
    style C2 fill:#FFECEA,stroke:#EB5200,stroke-width:2px,color:#EB5200
    style G2 fill:#FFECEA,stroke:#EB5200,stroke-width:2px,color:#EB5200
    style H4 fill:#FFECEA,stroke:#EB5200,stroke-width:2px,color:#EB5200
    style H6 fill:#FFECEA,stroke:#EB5200,stroke-width:2px,color:#EB5200
    style I1 fill:#FFECEA,stroke:#EB5200,stroke-width:2px,color:#EB5200
    
    style E fill:#99B2E6,stroke:#142852,stroke-width:2px,color:#142852
    style F fill:#99B2E6,stroke:#142852,stroke-width:2px,color:#142852
    style G fill:#99B2E6,stroke:#142852,stroke-width:2px,color:#142852
    style H fill:#99B2E6,stroke:#142852,stroke-width:2px,color:#142852
    style I fill:#99B2E6,stroke:#142852,stroke-width:2px,color:#142852
    style I2 fill:#99B2E6,stroke:#142852,stroke-width:2px,color:#142852
    style I3 fill:#99B2E6,stroke:#142852,stroke-width:2px,color:#142852

```

## 🛠️ Tecnologías

- React
- CSS Modules
- Fetch API para consumir el backend
- React Router para navegación

## 📦 Requisitos previos

```
- Node.js >= 22.15
- npm >= 10.9.2
- Acceso al backend del proyecto [aquí](https://github.com/sara-vazquez/micos-color-code-backend)
```

## 🚀 Instalación y ejecución

1. **Hacer un fork del repositorio**

2. **Crea una rama para tu feature/fix**
    ```
    git checkout -b feature/nueva-funcionalidad
    ````

3. **Instalar dependencias**
    [Consulta la guía de instalaciones ↗︎](https://www.notion.so/sara-vazquez/Instalaciones-front-281d5565c5b680d28ff8d736e262e840)
    ```
    npm install
    ````

4. **Haz tus cambios y crea un pull request**
    ```
    git commit -m "Descripción breve del cambio"
    git push origin feature/nueva-funcionalidad
    ````
5. **Levantar el servidor**
    ```
    npm run dev
    ```

6. **Abrir en el navegador**
    ```
    http://localhost:5173
    ```


## 📋 Funcionalidades principales del ADMIN

- **Gestión de recursos:**
  - Listar 📄
  - Añadir ➕
  - Editar ✏️
  - Eliminar 🗑
 
## 🧭 Recorridos admin y user
[![admin flow ↗︎](https://i.vimeocdn.com/video/2075148736-bdd7a3e1caa2e91e0eaee74867a0ad777029fa3bdecd1111e74bb60b31511ca3-d_640x360?&region=us)](https://vimeo.com/1131261688)[![user flow ↗︎](https://i.vimeocdn.com/video/2075148817-7c65448b05d2442369ff45dc126c7c0f58252e9c874804a18fe9b180a1636e3b-d_640x360?&region=us)](https://vimeo.com/1131261736)


## 🧪 Cobertura de tests
!["covertura provisional de los tests"](src/assets/coverageFront.png)

### Autora
Sara Vázquez
