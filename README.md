# MICOS COLOR CODE
```mermaid

flowchart TD
    A[HOME] --> B[PERFIL - Acceso]
    A --> C[Que es Micos Color Code]
    A --> D[Que es el daltonismo]
    A --> E[Materiales para imprimir]
    A --> F[Entrar a jugar]
    A --> G[Zona adultos]
    
    B --> B1[Login Form]
    B --> B2[User Dashboard]
    B --> B3[Profile Settings]
    
    C --> C1[Informacion del proyecto]
    C --> C2[Paso a paso]
    
    D --> D1[Explicacion daltonismo]
    D --> D2[Tipos de daltonismo]
    
    E --> E1[Listado de recursos PDF]
    E1 --> E2[Marcadores universales]
    E1 --> E3[Poster del sistema]
    E1 --> E4[Animalario]
    
    F --> F1[Selector de juego]
    F1 --> F2[Juego 1: Memory cards]
    F2 --> F3[Seleccion de nivel]
    F2 --> F4[Interface de juego]
    F2 --> F5[Pantalla de resultados]
    F2 --> F6[Historial puntuaciones]
    
    G --> G1[Consejos de uso con niños]
    G --> G2[Contacto / Feedback]
    G1 --> G3[Guia pedagogica]
    G1 --> G4[Recomendaciones por edad]
    G2 --> G7[Sistema de feedback]
    
    classDef homeStyle fill:#FFFCFC,stroke:#333,stroke-width:3px
    classDef gameStyle fill:#F5F7FF,stroke:#333,stroke-width:1px
    classDef infoStyle fill:#FFF5CC,stroke:#333,stroke-width:1px
    classDef resourceStyle fill:#FFECEA,stroke:#333,stroke-width:1px
    classDef adultStyle fill:#FFFCFC,stroke:#333,stroke-width:1px
    classDef profileStyle fill:#FFFCFC,stroke:#333,stroke-width:1px
    
    class A homeStyle
    class F,F1,F2,F3,F4,F5,F6 gameStyle
    class D,D1,D2 infoStyle
    class E,E1,E2,E3,E4 resourceStyle
    class G,G1,G2,G3,G4,G7 adultStyle
    class B,B1,B2,B3,C,C1,C2 profileStyle

```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
