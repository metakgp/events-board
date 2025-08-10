<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links-->
<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![Wiki][wiki-shield]][wiki-url]

</div>

<!-- PROJECT LOGO -->
<br />
<!-- UPDATE -->
<div align="center">
  <a href="https://github.com/metakgp/events-board">
     <img width="140" alt="image" src="https://raw.githubusercontent.com/metakgp/design/main/logos/black-large.jpg">
  </a>

  <h3 align="center">Events-Board</h3>

  <p align="center">
  <!-- UPDATE -->
    <i>A noticeboard that lists upcoming and previous society events.</i>
    <br />
    <a href="https://events.metakgp.org">Website</a>
    ·
    <a href="https://github.com/metakgp/events-board/issues">Request Feature / Report Bug</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
<summary>Table of Contents</summary>

- [About The Project](#about-the-project)
  - [Supports](#supports)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Development](#development)
- [Usage](#usage)
- [Contact](#contact)
  - [Maintainer(s)](#maintainers)
  - [Creators(s)](#creators)
- [Additional documentation](#additional-documentation)

</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- UPDATE -->
<div align="center">
  <a href="https://github.com/metakgp/events-board">
    <img width="80%" alt="image" src="https://user-images.githubusercontent.com/86282911/206632547-a3b34b47-e7ae-4186-a1e6-ecda7ddb38e6.png">
  </a>
</div>

_Detailed explaination of the project goes here_

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

To set up a local instance of the application, follow the steps below.

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/metakgp/events-board.git
   cd events-board
   ```

2. Install Frontend Dependencies
   ```sh
   cd frontend
   npm install
   ```
3. Install Backend Dependencies
   ```bash
   cd backend
   npm install
   ```
4. Setup environment variables in the Frontend and Backend directories

   Create a `.env` file inside `/frontend` and `/backend` directory, And set up your environment variables. (See [Environment Variables](#environment-variables) section below for more details)

5. Set up the database
   - In the `/backend` directory, run the following command to run MongoDB in a Docker container:
     ```bash
     docker compose -f docker-compose.dev.yaml up -d
     ```
     Alternatively, you can run MongoDB locally if you have it installed.
   - In the `/backend` directory, run the following command to create an admin user:
     ```bash
     node scripts/createAdmin.js
     ```

6. Set up static file storage
    - Create a directory for static files (ideally outside the project directory), and set the absolute path to this directory in the `STATIC_FILE_STORAGE_LOCATION` environment variable in `/backend/.env` (e.g. `/srv/static`).
    - Create a subdirectory for storing uploaded posters inside the static file storage directory, and set the relative path to this directory in the `UPLOAD_PATH` environment variable in `/backend/.env` (e.g. `uploads/posters`).


### Development

   - In the `/frontend` directory, run the following command to start the frontend:
     ```bash
     npm start
     ```
   - In the `/backend` directory, run the following command to start the backend:
     ```bash
     node index.js
     ```


### Environment Variables

The following environment variables are required to be set in `/backend/.env` for the application to run:

1. `MONGO_URI`: The MongoDB connection string.
2. `JWT_SECRET`: A secret key used for signing JSON Web Tokens.
3. `FRONTEND_URL`: The URL of the frontend application.
4. `PORT`: The port on which the backend server will run.
5. `STATIC_FILES_URL`: The URL where static files are served.
6. `STATIC_FILE_STORAGE_LOCATION`: The absolute path where static files are stored.
7. `UPLOAD_PATH`: The relative path where uploaded files will be stored (relative to `STATIC_FILE_STORAGE_LOCATION`).

The following environment variables are required to be set in `/frontend/.env` for the application to run:
1. `VITE_BACKEND_URL`: The URL of the backend API.


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

<!-- UPDATE -->

Use this space to show useful examples of how this project can be used. Additional screenshots, code examples and demos work well in this space.

<div align="center">
  <a href="https://github.com/metakgp/events-board">
    <img width="80%" alt="image" src="https://user-images.githubusercontent.com/86282911/206632640-40dc440e-5ef3-4893-be48-618f2bd85f37.png">
  </a>
</div>

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

<p>
📫 Metakgp -
<a href="https://slack.metakgp.org">
  <img align="center" alt="Metakgp's slack invite" width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/slack.svg" />
</a>
<a href="mailto:metakgp@gmail.com">
  <img align="center" alt="Metakgp's email " width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/gmail.svg" />
</a>
<a href="https://www.facebook.com/metakgp">
  <img align="center" alt="metakgp's Facebook" width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/facebook.svg" />
</a>
<a href="https://www.linkedin.com/company/metakgp-org/">
  <img align="center" alt="metakgp's LinkedIn" width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/linkedin.svg" />
</a>
<a href="https://twitter.com/metakgp">
  <img align="center" alt="metakgp's Twitter " width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/twitter.svg" />
</a>
<a href="https://www.instagram.com/metakgp_/">
  <img align="center" alt="metakgp's Instagram" width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/instagram.svg" />
</a>
</p>

### Maintainer(s)

The currently active maintainer(s) of this project.

- [Waqib Sk](https://github.com/waqibsk)
- [Dipam Sen](https://github.com/dipamsen)

### Creator(s)

Honoring the original creator(s) and ideator(s) of this project.

- [Waqib Sk](https://github.com/waqibsk)

<p align="right">(<a href="#top">back to top</a>)</p>

## Additional documentation

- [License](/LICENSE)
- [Code of Conduct](/.github/CODE_OF_CONDUCT.md)
- [Security Policy](/.github/SECURITY.md)
- [Contribution Guidelines](/.github/CONTRIBUTING.md)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/metakgp/events-board.svg?style=for-the-badge
[contributors-url]: https://github.com/metakgp/events-board/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/metakgp/events-board.svg?style=for-the-badge
[forks-url]: https://github.com/metakgp/events-board/network/members
[stars-shield]: https://img.shields.io/github/stars/metakgp/events-board.svg?style=for-the-badge
[stars-url]: https://github.com/metakgp/events-board/stargazers
[issues-shield]: https://img.shields.io/github/issues/metakgp/events-board.svg?style=for-the-badge
[issues-url]: https://github.com/metakgp/events-board/issues
[license-shield]: https://img.shields.io/github/license/metakgp/events-board.svg?style=for-the-badge
[license-url]: https://github.com/metakgp/events-board/blob/master/LICENSE
[wiki-shield]: https://custom-icon-badges.demolab.com/badge/metakgp_wiki-grey?logo=metakgp_logo&style=for-the-badge
[wiki-url]: https://wiki.metakgp.org
[slack-url]: https://slack.metakgp.org
