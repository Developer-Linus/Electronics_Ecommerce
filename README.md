# Electronics_Ecommerce Project

1. [Project Overview](#Project-overview)
2. [Project Structure](#Project-structure)

# Project Overview

- This project is a full-stack e-commerce application for an online electronics store, built with Node.js, Express, MySQL, and Vue 3. It provides the backend and frontend to support user authentication, product listings, order processing, and secure routing in a fully integrated e-commerce platform.

The backend is structured to handle the business logic, API routing, and data management, while the frontend provides a dynamic and interactive user interface for customers to browse products, place orders, and manage their accounts. Both parts of the application follow best software engineering principles to ensure scalability, security, and performance.

# Project Structure

This project follows a modular folder structure designed for **clarity**, **scalability**, and **testability**, adhering to best software engineering practices.

```bash
ecommerce-backend/
├── config/
│   └── db.js
├── controllers/
│   └── auth.controller.js
├── middlewares/
│   └── auth.middleware.js
├── models/
│   └── user.model.js
├── routes/
│   └── auth.routes.js
├── utils/
│   └── hash.js
├── tests/
│   └── auth.test.js
├── .env
├── app.js
├── server.js
├── package.json
```

### `config/`

- **Purpose:** Contains environment-based configuration files.
- **`db.js`**: Manages the MySQL database connection using `mysql2/promise`, based on `.env` variables.

---

### `controllers/`

- **Purpose:** Contains the business logic that handles request/response cycles.
- **`auth.controller.js`**: Defines the logic for user registration, login, and other authentication-related actions.

---

### `middlewares/`

- **Purpose:** Stores reusable middleware functions for route protection and request processing.
- **`auth.middleware.js`**: JWT authentication middleware that verifies access tokens for protected routes.

---

### `models/`

- **Purpose:** Encapsulates the database access logic and structure for specific resources.
- **`user.model.js`**: Handles SQL queries related to users (e.g., find, create, update users).

---

### `routes/`

- **Purpose:** Defines the HTTP route endpoints and maps them to the corresponding controller functions.
- **`auth.routes.js`**: Routes for authentication-related actions like `/register`, `/login`.

---

### `utils/`

- **Purpose:** Stores helper functions and utilities used across the application.
- **`hash.js`**: Provides password hashing and verification logic using bcrypt.

---

### `tests/`

- **Purpose:** Contains unit and integration tests for the backend logic.
- **`auth.test.js`**: Automated tests for the authentication module (routes, controllers, etc.) using Jest and Supertest.

---

### `.env`

- **Purpose:** Holds sensitive environment variables (e.g., DB credentials, JWT secret).
- **Note:** Never commit this file to version control.

---

### `app.js`

- **Purpose:** Initializes the Express app, applies middlewares, and sets up routes.
- **Exported** so it can be used by both the server and testing files.

---

### `server.js`

- **Purpose:** Starts the application by running the Express app on the configured port.

---

### `package.json`

- **Purpose:** Project manifest file containing metadata, dependencies, and scripts.

---
