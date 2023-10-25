# Node Nasa Launch Project

- This project focuses on building a backend with Node.js and Express to interact with a pre-made React front-end inside a Docker container.

## Requirements

- Docker Desktop
- MongoDB URL (request if needed)
- SPACEX API URL (request if needed)

## Steps to Run

### Docker Desktop

You must have Docker Desktop installed [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Environment Variables

You must create a `.env` file in the root of your project directory with two environment variables: `DATABASE` and `SPACEX_API_URL`.

```bash
DATABASE=
SPACEX_API_URL=
```

### Run Docker Container

Build docker image:

```bash
docker build . -t <username>/nasa-project
```

Run Docker Image:

```bash
docker run -it -p 8000:8000 <username>/nasaproject
```
