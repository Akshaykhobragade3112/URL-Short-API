# URL Shortener API 

A simple, scalable URL shortener built with Node.js, MongoDB, and Google Sign-In.

## Features
- Google OAuth Authentication
- URL Shortening with Custom Aliases
- Analytics (Clicks, OS, Devices)
- Rate Limiting
- Dockerized for Deployment

## Installation
1. Clone the repository: git clone https://github.com/yourusername/url-shortener.git cd url-shortener
2. Install dependencies: npm install
3. Run locally: npm start
4. API Documentation: http://localhost:3000/api-docs


## API Endpoints
| Method | Endpoint                  | Description             |
|--------|---------------------------|-------------------------|
| POST   | `/api/auth/google`        | Google Sign-In         |
| POST   | `/api/shorten`            | Create Short URL       |
| GET    | `/api/shorten/:alias`     | Redirect to Long URL   |
| GET    | `/api/analytics/:alias`   | Get Analytics          |
| GET    | `/api/analytics/topic/:a` | Get TopicBased Analytic|
| GET    | `/api/analytics/overall`  | Get Overall Analytics  |

## Deployment
- Deployed on [Render](https://render.com/)

## License
MIT

