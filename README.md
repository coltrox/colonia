<div align="center">
  <h1><b>Aurora Colony Command Center</b></h1>
  <p>A futuristic sci-fi HUD dashboard with a dedicated Node.js back-end and a dynamic React front-end, designed to simulate the monitoring of a remote space colony.</p>

  <div>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js Badge"/>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge"/>
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite Badge"/>
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase Badge"/>
  </div>
  <br>
  <a href="#-about-the-project">About</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="https://coltrox.github.io/colonia">Live Demo</a>

</div>

## 🚀 Live Demo & Source Code

  - **Check out the live version:** **[Live Project Demo Link](https://coltrox.github.io/colonia)**
  - **Explore the code:** **[GitHub Repository Link](https://www.google.com/search?q=https://github.com/coltrox/colonia)**

-----

## 📖 About The Project

The **Aurora Colony Command Center** is an immersive web application designed to simulate the monitoring interface of a human colony on Mars. The inspiration comes from sci-fi user interfaces seen in movies and games, focusing on a clean, retro, and functional aesthetic.

This project demonstrates a full-stack application with a modern, decoupled architecture. The **React + Vite** front-end provides a fast, responsive user experience, while the custom **Node.js** back-end serves data and handles logic, using **Supabase** as a powerful database service.

-----

## ✨ Key Features

  - 🌌 **Dynamic Starfield Background**: An HTML5 canvas renders a moving starfield for an immersive deep-space atmosphere.
  - 📟 **Retro HUD Interface**: A layout designed with CSS Grid and Flexbox for a classic computer terminal look and feel.
  - 📡 **Full-Stack Decoupled Architecture**: A robust Node.js API serves data to a completely independent React front-end, ensuring scalability and separation of concerns.
  - 📊 **Real-time Data Panels**: The UI fetches and displays live data from the back-end, including system logs, environmental alerts, and colony status.
  - ⚡ **Fast Development Experience**: The front-end is built with Vite, providing near-instant hot module replacement and an optimized build process.

-----

## 🛠️ Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Front-End** | **React**, **Vite**, **Axios**, **CSS3** | A modern, fast, and component-based user interface with a superior development environment. |
| **Back-End** | **Node.js**, **Express.js** (or similar) | A custom server-side application to manage business logic and expose a dedicated REST API. |
| **Database** | **Supabase** (PostgreSQL) | Used as a cloud-based Database as a Service (DBaaS) for reliable and scalable data persistence. |
| **Architecture** | **Monorepo** | The front-end and back-end codebases are managed within a single repository for cohesive development. |

-----

## 📁 Project Structure

This project is organized as a monorepo, containing the two main packages (`back-end` and `front-end`) in the root directory. This structure helps in managing the full-stack application within a single repository.

```
/
├── 📁 back-end/
│   ├── 📁 src/
│   ├── .env
│   ├── package.json
│   └── ...
│
├── 📁 front-end/
│   ├── 📁 public/
│   ├── 📁 src/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
└── README.md
```

  - **`back-end/`**: Contains the Node.js server application. This is responsible for all API endpoints, business logic, and communication with the database.
  - **`front-end/`**: Contains the Vite + React client-side application. This is what the user sees and interacts with in the browser.

-----

## 🗺️ Roadmap

  - [ ] **User Authentication**: Implement JWT-based authentication in the Node.js back-end.
  - [ ] **WebSocket Integration**: Use WebSockets for true real-time communication instead of HTTP polling.
  - [ ] **Interactive Map**: Turn the colony plan into an interactive SVG component that fetches data per module.
  - [ ] **Containerization**: Add Dockerfiles for both front-end and back-end for easier deployment.

-----

## 📄 License

Distributed under the MIT License. See the `LICENSE` file for more information.

-----

Made with by Pedro Coltro | Miguel Carriscar | Letícia Zanata | Jefferson

