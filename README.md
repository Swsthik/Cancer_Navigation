# Cancer Navigation System

A web-based platform that connects patients with patient navigators and caregivers to facilitate cancer care coordination and support.

## Features

- **Multi-User Authentication System**

  - Patient Portal
  - Patient Navigator Dashboard
  - Caregiver Interface

- **Role-Based Access Control**
  - Specific dashboards and features for each user type
  - Secure authentication and session management
  - User type validation during login

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (Node Package Manager)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=2000
ATLASDB_URL=your_mongodb_connection_string
SESSION_SECRET=AKJKHD@65
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/Cancer_Navigation.git
cd Cancer_Navigation
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

- Copy `.env.example` to `.env`
- Update the MongoDB connection string and session secret

## Running the Application

1. Start the server:

```bash
npm start  or node app.js
```

2. Access the application:

- Open your browser and navigate to `http://localhost:3000`
- You will be redirected to the login page

## User Types and Access

1. **Patient**

   - Can view appointments
   - Access medical records
   - Communicate with navigator
   - View personal health information

2. **Patient Navigator**

   - Manage multiple patients
   - Track appointments
   - Monitor patient progress
   - Access resources
   - View recent activities

3. **Caregiver**
   - View assigned patients
   - Manage care schedule
   - Take care notes
   - Communicate with healthcare team

## Project Structure

```
Cancer_Navigation/
├── models/
│   └── user.js
├── views/
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── login.ejs
│   │   │   └── signup.ejs
│   │   ├── patient/
│   │   │   └── dashboard.ejs
│   │   ├── navigator/
│   │   │   └── dashboard.ejs
│   │   └── caregiver/
│   │       └── dashboard.ejs
├── public/
├── app.js
├── package.json
└── .env
```

## Dependencies

- Express.js - Web framework
- MongoDB/Mongoose - Database
- Passport.js - Authentication
- EJS - Templating
- Bootstrap - Frontend styling
- SweetAlert2 - Notifications
- jQuery - AJAX requests

## Security Features

- Password hashing using Passport-Local-Mongoose
- Session-based authentication
- Role-based access control
- User type validation
- Error handling with user-friendly messages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
