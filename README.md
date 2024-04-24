# Project Setup Guide

This guide provides detailed instructions for setting up and replicating the project environment.

## Copying Files

- **GitHub Repository Link:** Provide the link to the GitHub repository where the project files are hosted.
- **Clone Repository:** Use the `git clone` command followed by the repository link to copy the project files to your local machine.
- **File Structure:** Ensure the file structure is maintained as follows:
  - **Helper Files Folder:** Contains JavaScript files responsible for rendering 3D models.
  - **index.html:** Base website HTML file that will be launched by the server.
  - **main.js:** JavaScript file for rendering everything in the scene using Three.js.

## Requirements

- **Node.js:** Ensure Node.js is installed on your system.
  - **Install Node.js:** Download and install Node.js from the official website.
  - **Navigate to Repository:** Using the command line interface (CLI), navigate to the cloned repository.
  - **npm install:** Run `npm install` command to install project dependencies. Note that all other dependencies are retrieved from Node.js, so no additional importing is required.
  - **Node Modules** Because Node Modules is such a big directory, do not import or export it manually. node install will deal with that for you.

## Running the Project

- **Development Mode:** In the main repository directory, execute `npm run dev` to run the project in development mode.
- **Access Localhost:** Open a browser of your choice and navigate to `localhost:5173` to view the project running locally.

## Building the Project

- **Production Build:** Run `npm run build` to create an `index.html` deployable file that will be uploaded to the server.

## Connecting to UMich VPN

- **VPN Connection:** Ensure you are connected to the University of Michigan (UMich) VPN to access the UMTRI server.

## Connecting to UMTRI Server

- **Access Permission:** Obtain access to the UMTRI server through the IT team.
- **FTP Service:** Download and install FileZilla or any other FTP service for file transfer.
- **Server Connection Note:** Connect via the interactive login button, NOT quick connect
- **Server Connection Details:**
  - **Host:** Server Name
  - **Username:** Personal UMich username
  - **Password:** Personal UMich password
  - **Port:** 22 for SFTP
- **File Transfer:**
  - Connect to the server using the provided credentials.
  - Navigate to the `/var/www/HumanShape/wheelchairTool` directory.
  - Transfer the built files to this directory to update the server.

## Verification: Ensure that all changes are successfully transferred to the server. In some cases, certain resources like the models may not transfer fully, requiring manual addition, or the path to certain files in index.html build might be incorrect. Adjust as needed.

- **EXAMPLE:**
- (default build path) : <script type="module" crossorigin src="/WheelchairTool/index-tey82qbK.js"></script>
- (correct path):        <script type="module" crossorigin src="/WheelchairTool/assets/index-tey82qbK.js"></script>

By following these outlined procedures, any future programmer should be able to replicate the work done on the project efficiently.
