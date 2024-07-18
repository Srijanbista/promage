# Simplified Project Management Dashboard

A simplified project management dashboard built using Next.js 14 with App Router. This dashboard allows you to manage and track the progress of your projects efficiently. The project is containerized using Docker, making it easy to run and deploy.

## Features
- **User SignUp/Login**: Create user, and login user.
- **Project Management**: Create, update, and delete projects.
- **Progress Tracking**: Track the status of your projects (Ongoing, Delayed, Completed, At Risk).
- **Visualization**: Visual representation of project statuses using a circular progress indicator.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started)
- 
### Installation

1. **Clone the repository**:

    ```sh
    git clone https://github.com/your-username/simplified-project-management-dashboard.git
    cd simplified-project-management-dashboard
    ```

2. **Run the application**:

    ```sh
    docker-compose up
    ```

    This command will build and start the Docker containers for both the client and server.

3. **Access the application**:

    Once the containers are up and running, you can access the application at `http://localhost:3000`.

### Project Structure

The project is organized into the following directories:

- `/app`: Contains the Next.js frontend code.
- `/app/api`: Contains the backend code.
- `/docker-compose.yml`: Docker Compose configuration file to set up the container.

### Docker Configuration

The `docker-compose.yml` file is configured to build and run the client and server containers. Ensure you have the appropriate Dockerfiles in the `/client` and `/server` directories.


### Environment Variables

Ensure you have the necessary environment variables set up for both the client and server. You can create `.env` files in the respective directories and define your variables there.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the code style and include relevant tests.


## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Docker](https://www.docker.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)

---

Feel free to modify this README file to suit your project's specific needs.
