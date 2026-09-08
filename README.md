# KindBridge

## Overview
KindBridge is a comprehensive full-stack application designed to connect communities, streamline data management, and foster meaningful engagements. Built with a robust Spring Boot backend and a dynamic React frontend, it provides an intuitive platform for bridging the gap between various services, offering secure authentication, real-time data visualization, and a seamless user experience.

## Why We Created KindBridge
We created KindBridge to address the growing need for a unified, reliable, and scalable platform that can efficiently handle complex interactions while remaining incredibly user-friendly. The core motivations behind KindBridge are:
- **Centralized Connectivity**: To provide a single point of interaction for users and services.
- **Data-Driven Insights**: To offer visually appealing and interactive data representations (using tools like Chart.js) for better decision making.
- **Scalability and Performance**: To ensure high performance and maintainability by leveraging modern, industry-standard technologies like Spring Boot and React with Vite.

## Tech Stack
- **Backend**: Java, Spring Boot, Maven
- **Frontend**: React, Vite, Tailwind CSS, Chart.js, Framer Motion, Axios

## Project Structure
- `Backend/demo/`: Contains the Spring Boot backend application.
- `frontend/frontend/`: Contains the React/Vite frontend application.

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-downloads.html) (Version 17 or higher recommended)
- [Node.js](https://nodejs.org/) (Version 18 or higher recommended)
- npm (comes with Node.js)

### Installation & Running

#### 1. Backend Setup (Spring Boot)
Open your terminal and navigate to the backend directory:
```bash
cd Backend/demo
```

Run the Spring Boot application using the provided Maven Wrapper:
```bash
# For Windows
mvnw.cmd spring-boot:run

# For macOS/Linux
./mvnw spring-boot:run
```
The backend server will start and typically run on `http://localhost:8080`.

#### 2. Frontend Setup (React/Vite)
Open a **new** terminal window and navigate to the frontend directory:
```bash
cd frontend/frontend
```

Install the required npm dependencies:
```bash
npm install
```

Start the Vite development server:
```bash
npm run dev
```
The frontend application will start and typically be accessible at `http://localhost:5173`. Open this URL in your browser to view the application.

## Deployment

### Backend Deployment (Render via Docker)
Since Render's free tier does not natively support Java, we have provided a `Dockerfile` in the backend directory to easily deploy the Spring Boot application using Render's Docker environments.

1. Push your repository to GitHub.
2. In the Render Dashboard, create a new **Web Service**.
3. Connect your GitHub repository.
4. Render will automatically detect the repository. Ensure **Docker** is selected as the runtime environment.
5. In the settings, specify the **Root Directory** as `Backend/demo`.
6. Click **Create Web Service**. Render will build and deploy the Spring Boot application using the provided `Dockerfile`.

### Frontend Deployment (Vercel)
Vercel is highly recommended for hosting Vite/React applications due to its zero-configuration setup for modern frontend frameworks.

1. Create a free account on [Vercel](https://vercel.com/) and log in.
2. Click on **Add New...** -> **Project**.
3. Import your GitHub repository containing the `KindBridge` codebase.
4. In the project configuration, Vercel will automatically detect the Vite setup.
5. Set the **Root Directory** to `frontend/frontend` (click 'Edit' next to Root Directory and select the folder).
6. The Build Command (`npm run build`) and Output Directory (`dist`) will be automatically filled by Vercel.
7. Click **Deploy**. Vercel will build and deploy your frontend, providing you with a live URL.
