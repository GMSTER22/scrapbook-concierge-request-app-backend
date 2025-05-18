# 🧠 Scrapbook Concierge Request App (Server)
This is the backend service for the Scrapbook Concierge Request App, a platform enabling customers to influence the creation of scrapbooking kits. The backend is built using Express.js with a modular MVC architecture, providing RESTful API endpoints for authentication, kit requests, likes/votes, admin actions, and notifications.

## ✨ Features
- **User Authentication**

  - Register/Login via email & password or Google OAuth.

  - JWT-based session management.

- **Request Management**

  - Submit new kit requests.

  - Update or delete personal requests.

  - View all requests sorted by date or popularity.

- **Voting System**

  - Like/upvote requests submitted by others.

  - Prevent duplicate votes from the same user.

- **Admin Controls**

  - Mark kits as released.

  - Add product URLs to released kits.

  - Email users who voted for released kits.

- **Notifications**

  - Email notifications for kit releases.

  - Users can opt-out from future notifications.

- **Security & Validation**

  - Helmet for security headers.

  - Input sanitization with express-validator.



## 🛠️ Tech Stack
- **Runtime**: Node.js

- **Framework**: Express.js

- **Database**: MongoDB (via Mongoose ODM)

- **Authentication**: Passport.js (local & Google)

- **Authorization**: JWT

- **Email Service**: Nodemailer

- **Validation**: express-validator

- **Security**: Helmet, CORS

- **Process Management**: PM2

- **Development Tools**: Nodemon


## 📂 Project Structure
    src/
    ├── controllers/      # Route logic and business operations
    ├── models/           # Mongoose schemas and models
    ├── routes/           # Express route handlers
    ├── database/         # Database connection
    ├── utils/            # Utility functions (e.g., email logic)
    ├── middleware/       # Custom auth and validation middleware
    ├── services/         # Send emails through nodemailer
    ├── config/           # Passport and DB config
    ├── index.js          # Entry point
    └── .env              # Environment variables (not committed)


## 📬 API Endpoints Overview
| Method | Endpoint                                         | Description                             |
| ------ | -------------------------------------------      | -----------------------------------     |
| GET    | `/api/auth/google`                               | Register/Login Google with OAuth        |
| POST   | `/api/auth/signup/password`                      | Register with email/password            |
| POST   | `/api/auth/login`                                | Login with email/password               |
| GET    | `/api/requests/search`                           | Search requests                         |
| GET    | `/api/requests`                                  | Get all requests                        |
| GET    | `/api/requests/:id`                              | Get a request by id                     |
| POST   | `/api/requests/:id`                               | Create a new kit request (add userId)   |
| PATCH  | `/api/requests/:requestId/users/:userId`         | Update user’s own request               |
| DELETE | `/api/requests/:requestId/users/:userId`         | Delete user’s own request               |
| PATCH  | `/api/users-requests/:requestId/users/:userId`   | Like/upvote a request                   |
| POST   | `/api/notifications/send`                        | Admin: send release emails              |
| PATCH  | `/api/notifications/subscriptions`               | User subscribe/unsubscribe              |
| POST   | `/api/notifications/password-reset`              | User makes a request to reset password  |
| PATCH  | `/api/notifications/password-reset`              | Update the user password                |

## ✉️ Email Notification System
  - Built with Nodemailer (utilizing (Mailtrap)[https://mailtrap.io/])

  - Triggered when admins release kits

  - Includes secure unsubscribe tokens

  - Respects user opt-out settings


##  🧪 Future Enhancements

  - Unit and integration tests


## 📄 License

© 2025 Scrapbook Concierge. All rights reserved.
