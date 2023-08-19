# ZIMO Backend Tasks

This repository contains the codebase for a User Management System, implementing various tasks related to user registration, login, data visualization, and management.

## Tasks Completed

### Task: User Registration and Login

- Implemented a user registration form with fields including name, email, password, phone, and country.
- Created an API for user registration, generating a login token upon successful registration.
- Developed a user login mechanism for web pages using the generated login token.
- Configured email templates to be sent upon user registration and login.
- Displayed registered users in a table with a "View" button to show detailed user information on a separate page.

### Tas: User Registration Graph by Country

- Utilized Canvas JS to create a graph representing user registration distribution by country.
- Implemented an interactive feature: clicking on a country on the graph redirects the user to a page displaying data specific to that country's users.

### Task : User Data Filtering and Management

- Added date filtering functionality to registered users, allowing users to filter by registration date.
- Implemented a country filter to enable users to filter registered users by country.
- Introduced a toggle button within the user table to change user statuses between "active" and "blocked".
- Provided an option to download user data in an Excel file format.

## Installation and Usage

1. Clone the repository to your local machine.
2. Configure your environment settings, database connection, and email configuration in the necessary files.
3. Install required dependencies using npm and run migrations to set up the database schema.
4. Run the application using npm start

## Credits

This project was developed by Muhammad Irfan.
