# CanConnect

A comprehensive healthcare platform designed to facilitate communication and coordination between cancer patients, doctors, patient navigators, and caregivers.

## Overview

CanConnect is a web-based application that streamlines the cancer care journey by connecting all stakeholders in the treatment process. It provides specialized interfaces for different user roles and facilitates efficient patient care management.

## Features

### For Doctors
- **Dashboard**: Overview of appointments, patient requests, and feedback
- **Patient Management**: View and manage patient information
- **Appointment Management**: Schedule and track patient appointments
- **Progress Reports**: Create and monitor patient progress reports
- **Resource Center**: Access medical resources and guidelines

### For Patients
- **Treatment Timeline**: Track treatment progress and upcoming appointments
- **Document Management**: Store and access medical records
- **Communication Hub**: Direct communication with doctors and navigators
- **Resource Access**: Educational materials and support resources

### For Patient Navigators
- **Patient Tracking**: Monitor patient progress and needs
- **Resource Coordination**: Connect patients with necessary resources
- **Communication Management**: Facilitate patient-doctor communication
- **Support Services**: Coordinate additional support services

### For Caregivers
- **Patient Monitoring**: Track patient's treatment schedule
- **Communication**: Direct line with healthcare providers
- **Resource Access**: Caregiver support materials

## Technical Stack

- **Backend**: Node.js with Express.js
- **Frontend**: EJS templating engine with Bootstrap 5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js
- **Additional Libraries**:
  - Chart.js for data visualization
  - Font Awesome for icons
  - Bootstrap for responsive design

## Installation

1. **Prerequisites**
   ```bash
   - Node.js (v14 or higher)
   - MongoDB (v4.4 or higher)
   - npm (v6 or higher)
   ```

2. **Clone the Repository**
   ```bash
   git clone [repository-url]
   cd CanConnect
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/cancer_navigation
   SESSION_SECRET=your_session_secret
   ```

5. **Database Setup**
   ```bash
   # Start MongoDB service
   mongod
   ```

6. **Start the Application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## Project Structure

```
CanConnect/
├── models/              # Database models
├── routes/              # Route handlers
├── views/              
│   ├── pages/          # Page templates
│   │   ├── auth/       # Authentication pages
│   │   ├── doctor/     # Doctor interface
│   │   ├── patient/    # Patient interface
│   │   └── navigator/  # Navigator interface
│   └── partials/       # Reusable components
├── public/             # Static files
├── config/             # Configuration files
└── middleware/         # Custom middleware
```

## User Roles and Access

1. **Doctor**
   - Full access to patient medical records
   - Appointment management
   - Progress report creation
   - Resource management

2. **Patient**
   - Personal medical record access
   - Appointment scheduling
   - Communication with care team
   - Resource access

3. **Patient Navigator**
   - Patient coordination
   - Resource management
   - Communication facilitation
   - Support service coordination

4. **Caregiver**
   - Limited patient information access
   - Appointment viewing
   - Communication with care team

## Security Features

- Secure authentication using Passport.js
- Role-based access control
- Session management
- Password encryption
- CSRF protection
- XSS prevention

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact [support email/contact information]

## Acknowledgments

- Healthcare professionals who provided domain expertise
- Open source community for various tools and libraries
- Contributors and testers

## Future Enhancements

- Mobile application development
- Integration with hospital management systems
- Advanced analytics and reporting
- Telemedicine features
- AI-powered recommendations
