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
  ![Login](https://github.com/OwenLobato/mini-link/assets/74989360/864f58d3-4429-42b1-abdc-d13adf70db60)
  ![Responsive Login](https://github.com/OwenLobato/mini-link/assets/74989360/c1479528-553c-4cb3-bdcd-9dd799178aec)

- **Sign Up**: [Screenshot of the sign up form].  
  ![Register](https://github.com/OwenLobato/mini-link/assets/74989360/c29aa014-87c0-4937-b61e-e7d3ed716197)
  ![Responsive Register](https://github.com/OwenLobato/mini-link/assets/74989360/0fe76d88-52e9-4069-9c69-115284cecf7f)

- **Empty dashboard**: [Screenshot of the empty user dashboard].  
  ![EmptyDashboard](https://github.com/OwenLobato/mini-link/assets/74989360/a6283714-c1ea-4a13-b337-2bc2d04ddbb4)
  ![Responsive EmptyDashboard](https://github.com/OwenLobato/mini-link/assets/74989360/6cad7763-d512-4a45-9e2a-5b09893875bc)

- **Dashboard**: [Screenshot of the user dashboard].  
  ![Dashboard](https://github.com/OwenLobato/mini-link/assets/74989360/4d273056-8cd7-4e82-a737-b92071e400c9)
  ![Responsive Dashboard](https://github.com/OwenLobato/mini-link/assets/74989360/9a09d6b0-a076-4226-bd4f-f3b64f4f3bc9)

- **Link options**: [Screenshot of the modal of options for the link].  
  ![LinkOptions](https://github.com/OwenLobato/mini-link/assets/74989360/1ab8f552-2b1e-4fb6-9b5a-84785044b47e)

- **Link QR Code**: [Screenshot of the QR code of the mini link].  
  ![QrCode](https://github.com/OwenLobato/mini-link/assets/74989360/0e76baf5-4dec-455a-a8fc-f73c8dd69177)

- **Add/Edit link**: [Screenshot of the form to add or edit a url (mini link)].  
  ![SaveLink](https://github.com/OwenLobato/mini-link/assets/74989360/a39d937d-9b50-4fe2-aac4-eee4577b9e40)
  ![Responsive SaveLink](https://github.com/OwenLobato/mini-link/assets/74989360/3991a218-3dd3-4bba-a305-c916b3668996)

- **Filter option**: [Screenshot of the modal for filter option].  
  ![Filter Modal](https://github.com/OwenLobato/mini-link/assets/74989360/8d2b2cc5-10a8-4f6d-abae-e5fea94af7a8)

- **Sort option**: [Screenshot of the modal for sort option].  
  ![Sort Modal](https://github.com/OwenLobato/mini-link/assets/74989360/58e385d6-6e4c-49d9-8259-c37badd72f3c)

- **Profile**: [Screenshot of the form for the user profile].  
  ![Profile](https://github.com/OwenLobato/mini-link/assets/74989360/fb422ec8-43e9-46a6-bed1-df7bb657ede0)
  ![Responsive Profile](https://github.com/OwenLobato/mini-link/assets/74989360/c15bc5c5-6417-4831-8f4c-c9375a1db3c2)

- **Success redirect page**: [Screenshot of the page where is fetching the original link to redirect it].  
  ![RedirectPage](https://github.com/OwenLobato/mini-link/assets/74989360/90e96ca9-f53a-40a6-990d-e8302e53b988)

- **Error redirect page**: [Screenshot of the page where there's an error on fetching the original link to redirect it].  
  ![Error RedirectPage](https://github.com/OwenLobato/mini-link/assets/74989360/b1733d80-df29-428f-8273-509554f68f2a)

- **Page Not Found**: [Screenshot of the notice indicating that the selected route doesn't exist].  
  ![PageNotFound](https://github.com/OwenLobato/mini-link/assets/74989360/f2f1a54f-73b5-4ce0-9375-ece2f050f57a)

- **Loader**: [Screenshot of loader].  
  ![Loader](https://github.com/OwenLobato/mini-link/assets/74989360/8265c9cf-c979-4f91-a510-4fe4a25b7989)

- **Alerts**: [Screenshot of alerts].  
  ![Success](https://github.com/OwenLobato/mini-link/assets/74989360/8689b028-6c11-4dec-85bf-e774d648de7c)
  ![Warning](https://github.com/OwenLobato/mini-link/assets/74989360/adacd3a6-54c8-4be3-b579-ccd9b775c425)
  ![Error](https://github.com/OwenLobato/mini-link/assets/74989360/afd2c422-acc9-42ca-99ca-217812a323b7)
