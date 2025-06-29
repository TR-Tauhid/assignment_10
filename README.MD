Hi I'm Md Tohibur Rahman. Here is my cholo app, which basically Is a data collection of the popular tourist spot in the Southeast Asian countries.Here the user can Add delete Modify and see tourist spot based on countries.short them based on Cost.The main focus of this website was to implement react, vite, Context Apis with firebase authentication and so on... 


Cholo...
https://leafy-bavarois-51136e.netlify.app


GitHub Repository (https://github.com/TR-Tauhid/assignment_10)

Features
Comprehensive Tourism Management: A full-stack application designed to manage and showcase tourist spots across various countries, focusing on a specific geographic category , Southeast Asia is chosen.

Dynamic Tourist Spot Listings: Users can view, add, update, and delete tourist spots, with features like sorting by average cost and detailed view pages.

User Authentication & Authorization: Secure login and registration with email/password, Google, and one other social media provider Facebook, ensuring protected routes for adding, managing, and viewing personal listings.

Responsive & Intuitive Design: Crafted with a creative and unique user interface that adapts seamlessly across mobile, tablet, and desktop devices for an optimal browsing experience.

Interactive User Experience: Incorporates modern React libraries for enhanced UI elements, including a dark/light theme toggle, engaging banner/slider, and loading indicators for a smooth user journey.

Project Description
This tourism management website is built to provide a centralized platform for exploring and managing tourist destinations. It focuses on a specific geographical category, offering detailed information about various countries and their respective tourist spots. Users can register, log in, and contribute to the platform by adding their own tourist spot listings, which can then be viewed, updated, or deleted. The application prioritizes a responsive design, secure authentication, and a rich, interactive user experience.

Technologies Used
Frontend
React.js: A JavaScript library for building user interfaces.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

Firebase Authentication: For secure user registration and login (Email/Password, Google, Facebook.

React Router (or similar for navigation): For client-side routing.

[Chosen UI Library > React-simple-typewriter]: For text effects.

Toast/Sweet Alert Library: For user notifications (success, error messages).

Backend
Node.js: JavaScript runtime for the server.

Express.js: Web application framework for Node.js.

MongoDB: NoSQL database for storing tourist spot and country data.

Mongoose: MongoDB object data modeling (ODM) for Node.js.

Firebase Admin SDK: For integrating Firebase authentication with the backend (if needed for verification).

dotenv: For managing environment variables.

Key Features Implemented
User Management
Registration: User registration with name, email, photo URL, and password validation (minimum 6 characters, at least one uppercase, one lowercase).

Login: Email/password login, Google login, and Facebook login.

Conditional Navbar: Displays "Login" and "Register" when logged out; user photo, display name on hover, and "Logout" button when logged in.

Protected Routes: "Add Tourists Spot," "My List," and "View Details" pages are accessible only to authenticated users.

Authentication Persistence: Users remain logged in after page reload on private routes.

Tourist Spot Management
Add Tourist Spot: A dedicated form for authenticated users to add new tourist spots with details like image URL, name, country, location, description, average cost, seasonality, travel time, total visitors per year, user email, and user name.

All Tourists Spot Page: Displays all tourist spots added by all users, with a sort functionality based on "average_cost" (ascending/descending).

View Details Page: Shows comprehensive details of a selected tourist spot.

My List Page: Authenticated users can view only their own added tourist spots in a tabular format, with options to update or delete.

Update Tourist Spot: A dedicated page (or modal) to modify existing tourist spot details.

Delete Tourist Spot: Functionality to remove a tourist spot with a confirmation prompt.

CRUD Notifications: Relevant toast/sweet alerts for all successful or failed CRUD operations.

Content & Design
Home Page: Features a responsive navbar, a dynamic banner/slider with a minimum of 3 slides, a section showcasing at least 6 tourist spots, a dedicated "Countries" section, and two additional meaningful sections.

Countries Section: Displays information for at least 6 countries within the chosen category (e.g., Southeast Asia), including an image, country name, and short description. Clicking a country card redirects to a page showing all tourist spots for that specific country.

Responsive Design: Optimized for mobile, tablet, and desktop views.

Custom Error/Success Messages: No default browser alerts (alert()) used for notifications.

404 Page: A custom "Not Found" page for invalid routes.

Loading Spinner: A visual loading indicator displayed when data is being fetched.

Footer: A meaningful footer including website name, copyright, contact information, and social media links.

Dark/Light Theme Toggle: Allows users to switch between dark and light modes on the home page.


dependencies, environment, libraries and plugins
NPM
React
ReactRouter,
Firebase,
.env
tailwindcss
daisyui
tostify
mongoDB
nodemon
sweetAlert
react-helmet
react-typewriter


Usage
Home Page: Browse featured tourist spots and countries. Toggle between light and dark themes.

Register: Create a new account to unlock full features.

Login: Access your account using email/password or social logins.

All Tourists Spot: View a comprehensive list of all tourist spots, with sorting options.

Add Tourists Spot: (Protected route) Add new tourist destinations to the database.

My List: (Protected route) Manage your personal list of added tourist spots, with update and delete functionalities.

View Details: Click on "View Details" from any card to see more information about a specific tourist spot.

Contact
For any questions or inquiries, please reach out to:

Your Name: tohibur.tauhid@gmail.com

LinkedIn: https://www.linkedin.com/in/tohibur-rahman/

GitHub: https://github.com/TR-Tauhid


===================     BACKLOGS      ==================

Helmet ================ Couldn't use react-helmet-async as it requires react 16 or 17...
    used react-helmet which doesn't work properly and comes with an error...!!!!!!!!!!!!
    
Theme  ============ I couldn't understand how the UI data thing worksI could have implemented a Use its state hook, on a context api. Didn't do so...  Failed...!!!  =====================...!!!
Create valid tourism spots
Frontend styles and animation =========== Partially done as I could have imagined more awesome animations and styles...     !!!!

