# React Code Editor - Online React IDE

A browser-based React IDE that allows users to create, edit, and preview React applications directly in the browser. Built with React, Node.js, Express, and MongoDB.

## 🚀 Features

### Core Features

- **File Management**: Create, delete, rename, and organize project files
- **Code Editor**: Rich code editor with syntax highlighting (Monaco Editor)
- **Live Preview**: Real-time preview of React applications
- **Project Management**: Create, save, and load multiple projects
- **User Authentication**: Secure login and registration system
- **Theme Support**: Dark and light mode switching

### Additional Features

- **Auto-save**: Automatically saves file changes
- **File Explorer**: Organized file and folder view
- **Responsive Design**: Works on desktop and tablet
- **Error Handling**: Clear user feedback and alerts
- **Modern UI**: Sleek, minimal design

## 🧠 Tech Stack

### Frontend

- React 19
- React Router DOM
- Monaco Editor
- Lucide React (icons)
- Axios
- Vite

### Backend

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs for hashing
- CORS

## 📁 Project Structure

```
CipherStudio/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── db/
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   ├── index.html
│   └── package.json
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd CipherStudio

# Backend setup
cd backend
npm install

# Frontend setup
cd ../frontend
npm install
```

### Environment Setup

Create a `.env` file inside the backend folder:

```env
NODE_ENV=development
PORT=5000
DEV_MONGODB_URI=mongodb://localhost:27017/cipherstudio
JWT_SECRET_KEY=your-secret-key
```

### Run the App

```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm run dev
```

Then open `http://localhost:5173` in your browser.

## 🧩 Usage Guide

### Authentication

- Register and login to create projects.
- Session is stored using JWT in local storage.

### Projects

- Create and edit multiple projects.
- Files auto-save as you type.

### File Management

- Create: Click the "+" button.
- Rename/Delete: Use the 3-dot menu next to a file.
- Organize: Use "/" in file names for folder structure.

### Preview

- View React components live in the preview window.
- Automatic reload on save.

## 🛠️ API Endpoints

### Authentication

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

### Projects

- `POST /api/v1/project`
- `GET /api/v1/project/user/:userId`
- `GET /api/v1/project/:id`
- `PUT /api/v1/project/:id`
- `DELETE /api/v1/project/:id`

### Files

- `POST /api/v1/file`
- `GET /api/v1/file/:id`
- `PUT /api/v1/file/:id`
- `DELETE /api/v1/file/:id`

## 🎨 Customization

### Themes

- Toggle between dark/light using the theme switcher.
- Persistent theme via localStorage.

### Supported File Types

- `.js`, `.jsx`, `.ts`, `.tsx`, `.css`, `.html`, `.json`, `.md`

## ☁️ Deployment

### Frontend (Vercel)

```bash
cd frontend
npm run build
npx vercel
```

### Backend (Render / Railway)

- Add environment variables
- Deploy server
- Update API URL in frontend

## 🤝 Contributing

1. Fork this repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Add new feature"`)
4. Push (`git push origin feature-name`)
5. Open a Pull Request

## ⚠️ Known Issues

- Monaco Editor may delay on initial load
- Large file preview may lag
- Some React runtime limitations in browser sandbox
