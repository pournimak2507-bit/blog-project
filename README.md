# 📝 BlogSpace – Full Stack Blogging Platform

A fully functional blogging platform built using **React, Node.js, Express, MySQL** with features like:

---

## 🚀 Features

### 👥 Authentication
- User Registration & Login (JWT Auth)
- Password Encryption (bcrypt)
- Role-based Access (User / Blogger)

### ✍️ Blogging System
- Create Blog
- Edit Blog
- Delete Blog
- View full blog details
- Category-based blogs
- Search (title, author, category)

### ❤️ Favourite System
- Add to favourites
- Remove from favourites
- View My Favourites page

### 🖼️ Image Uploading
- Blog images stored using **Multer**
- Backend serves images from `/uploads`
- Default category images included

### 🌙 Dark Mode
- Light / Dark theme toggle
- Fully responsive UI

### 📱 Fully Responsive UI
- Mobile, Tablet, Desktop support
- Modern Tailwind CSS design

---

## 🏗️ Tech Stack

### Frontend
- React.js  
- React Router  
- Tailwind CSS  
- Axios  

### Backend
- Node.js  
- Express.js  
- JWT Auth  
- Multer (Image Upload)  
- MySQL (Database)

---

## ⚙️ How to Run Locally

### 📌 Backend
```bash
cd backend
npm install
npm start
```

Backend runs on:  
➡ **http://localhost:5000**

---

### 📌 Frontend
```bash
cd frontend
npm install
npm start
```

Frontend runs on:  
➡ **http://localhost:3000**

---

## 🗄️ Environment Variables

Create a `.env` file inside **backend**:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=blogspace
JWT_SECRET=mySuperSecretKey
```

Frontend `.env`:

```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🖼️ Folder Structure

```
blog-space/
 ├── backend/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   ├── middleware/
 │   ├── uploads/
 │   └── server.js
 ├── frontend/
 │   ├── src/
 │   ├── public/
 │   └── tailwind.config.js
 └── README.md
```

---

## 👩‍💻 Developer

**Pournima Kamble**  
Full Stack Developer (MERN + SQL)

---

## ⭐ Feedback

If you like this project, feel free to ⭐ star the repository on GitHub!
