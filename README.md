# Mini Link App

This is a web application developed on a MERN stack (MongoDB, Express.js, React.js, Node.js) that provides a platform for managing, sharing, QR code creation and URL shortening. The application features basic authentication, protected routes, authorization, data search and order functionality, and a profile and mini-link management system.

## Key Features

- **Authentication and authorization**: The application includes a simple authentication system that allows users to log in and access protected routes. Authorization is implemented to ensure each user has access only to manage their own mini links and data.

- **Mini Links Dashboard**: The user is shown an intuitive dashboard displaying cards of their registered URLs. The dashboard offers management options that include creation, edition and deletion of mini links, QR code generation and copying the shortened link to the clipboard for easy sharing, redirection to the original link, display of views and sorting and search by different parameters

- **User profile**: The application provides a section for the users to manage their profiles, for now including details such as name, email and password.

- **Dynamic navbar**: Navigation in the app is managed through a context that controls the navigation bar, adapting based on the user's current route.

- **Responsive design with Tailwind CSS**: The user interface is developed using Tailwind CSS, ensuring an attractive and responsive design that adapts to different devices.

## Design

The design of the Mini Link App was crafted using Figma. To explore the first version of the design in detail and gain insights into the user interface, you can access the Figma community project [here](https://www.figma.com/community/file/1344164706048159388/minilink).

## Project Structure

### Server

- **Components**: Entities in the system are handled in this section, structured with Network (endpoint and response), Controller (application logic), and Store (database logic).
- **Config**: Configuration files for the server are stored in this section.
- **Middlewares**: Middleware functions are included for verifying user authentication.
- **Models**: Database models and schemas are defined using Mongoose in this section.
- **Network**: This part is responsible for managing server routes and responses.
- **Utils**: It contains useful functions, such as customizing the Error class.

### Client

- **App.jsx**: It configures public and private routes using React Router.
- **Components**: Application components are organized here, with global components being more generic and module-specific components categorized by section, such as Auth, Users and Addressess.
- **Contexts**: This section manages context providers that facilitate the sharing and management of global state across React components.
- **Helpers**: Contains specific files that are not part of any specific module and facilitate some processes or logic
- **Hooks**: Custom hooks are provided, including the use of the `utils/requests.js` function, an abstract component for making Axios requests, and custom hooks like `useAuth` that simplify and generalize requests.
- **Hooks**: Provides custom hooks, including the use of the `utils/requests.js` function, an abstract component for making Axios requests, and custom hooks like `useAuth`, `useUsers` and `useAddresses` that simplify and generalize requests.
- **Styles**: Global Tailwind styles and specific file styles are located here.

## Environment Variables

Both the client and server utilize `.env` files to manage environment variables. This approach streamlines configuration for various environments.

### Server .env

```bash
NODE_ENV=
PORT=
API_VERSION=
MONGODB_URI=
ORIGIN=
PRODUCTION_ORIGIN=
URL_PRODUCTION=
JWT_SECRET_KEY=
```

### Client .env

```bash
REACT_APP_NODE_ENV=
REACT_APP_PORT=
REACT_APP_API_VERSION=
REACT_APP_AUTH_VERSION=
REACT_APP_API_URL=
REACT_APP_API_URL_PRODUCTION=
REACT_APP_URL=
REACT_APP_URL_PRODUCTION=
```

## How to run the project

### Running the Server

From the root directory of the project, you can launch the server with the following command:

```bash
npm run start-server
```

This command takes you to the "server" directory, installs dependencies if not already done, and starts the server using "nodemon."

### Running the Client

To run the client, navigate to the project's root directory and execute the following command:

```bash
npm run start-client
```

This command installs client dependencies if not already installed and launches the React application using "react-scripts."
Ensure that both the server and client are operational to use the application effectively.

## Production Deployment

The project is currently deployed on [Render.com](https://dashboard.render.com/) for both the front end (client) and back end (server).

### Front End (Client)

The deployed front end is accessible at: [https://mini-link-u60h.onrender.com](https://mini-link-u60h.onrender.com)

### Back End (Server)

The deployed back end is accessible at: [https://mini-link-api.onrender.com](https://mini-link-api.onrender.com)

## Screen Examples

- **Sign In**: [Screenshot of the sign in form].  
  ![Login]()
  ![Responsive Login]()

- **Sign Up**: [Screenshot of the sign up form].  
  ![Register]()
  ![Responsive Register]()

- **Nav bar**: [Screenshot of the navbar].  
  ![NavBar]()
  ![Responsive NavBar]()

- **Empty dashboard**: [Screenshot of the empty user dashboard].  
  ![EmptyDashboard]()
  ![Responsive EmptyDashboard]()

- **Dashboard**: [Screenshot of the user dashboard].  
  ![Dashboard]()
  ![Responsive Dashboard]()

- **Link options**: [Screenshot of the modal of options for the link].  
  ![LinkOptions]()

- **Link QR Code**: [Screenshot of the QR code of the mini link].  
  ![QrCode]()

- **Add/Edit link**: [Screenshot of the form to add or edit a url (mini link)].  
  ![SaveLink]()
  ![Responsive SaveLink]()

- **Filter option**: [Screenshot of the modal for filter option].  
  ![Filter Modal]()

- **Sort option**: [Screenshot of the modal for sort option].  
  ![Sort Modal]()

- **Profile**: [Screenshot of the form for the user profile].  
  ![Profile]()
  ![Responsive Profile]()

- **Success redirect page**: [Screenshot of the page where is fetching the original link to redirect it].  
  ![RedirectPage]()

- **Error redirect page**: [Screenshot of the page where there's an error on fetching the original link to redirect it].  
  ![Error RedirectPage]()

- **Page Not Found**: [Screenshot of the notice indicating that the selected route doesn't exist].  
  ![PageNotFound]()

- **Loader**: [Screenshot of loader].  
  ![Loader]()

- **Alerts**: [Screenshot of alerts].  
  ![Success]()
  ![Warning]()
  ![Error]()
