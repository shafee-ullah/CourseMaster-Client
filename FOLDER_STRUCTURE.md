# CourseMaster Frontend Structure

## Project Structure

```
client-cm/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, icons, etc.
│   ├── components/     # Reusable UI components
│   ├── context/        # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── AuthProvider.jsx
│   │   └── ThemeContext.jsx
│   ├── firebase/       # Firebase configuration
│   │   └── firebase.init.js
│   ├── layouts/        # Layout components (Header, Footer, etc.)
│   ├── pages/          # Page components
│   ├── router/         # React Router configuration
│   │   └── router.jsx
│   ├── services/       # API service functions
│   ├── utils/          # Helper functions
│   ├── App.jsx         # Main App component (with global wrapper)
│   ├── index.css       # Global styles (Red/Dark theme)
│   └── main.jsx        # Entry point
├── package.json
└── vite.config.js
```

## Key Features

### Global Layout Wrapper
All content is wrapped in a container with class `app-container` (w-11/12 mx-auto) to ensure a professional centered layout.

### Theme
- **Light Theme**: Red (Primary) and White
- **Dark Theme**: Red (Primary) and Dark-Slate
- Theme variables defined in `index.css`

### Styling
- **Tailwind CSS** for utility-first styling
- **DaisyUI** for component library
- **Framer Motion** for lightweight animations (opacity/y-axis shifts)

### State Management
- **Context API** for global state
  - `AuthContext` - Authentication state
  - `ThemeContext` - Theme switching

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Next Steps

- Create Login UI with Framer Motion
- Build Admin Dashboard
- Implement Course browsing pages

