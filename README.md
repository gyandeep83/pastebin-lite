# Pastebin Lite

Pastebin Lite is a minimal paste-sharing web application that allows users to create text pastes and share them via a unique link.  
Each paste can optionally expire after a certain time (TTL) or after a limited number of views.

The project focuses on correct backend behavior, persistence, and simple UI flows rather than heavy styling.

---

## Features

- Create a paste via a simple web UI
- View a paste using a shareable link
- Optional time-to-live (TTL) for pastes
- Optional maximum view count per paste
- Clear error handling for expired or invalid pastes
- Persistent storage using Redis (serverless-safe)

---

## Running the Project Locally

### Prerequisites

- Node.js (v18 or later recommended)
- npm
- Vercel CLI (`npm install -g vercel`)
- A Vercel account (for Redis / KV access)

---

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/pastebin-lite.git
   cd pastebin-lite
2. Install dependencies:
   ```bash
   npm install
3. Login to Vercel:
   ```bash
   vercel login
5. Pull environment variables (Redis credentials):
   ```bash
   vercel env pull
7. (Optional) Enable deterministic testing mode:
   Add the following to .env.local:
   ```bash
   TEST_MODE=1
9. Run the app locally using Vercel’s dev environment:
    ```bash
   vercel dev
11. Open the app in your browser:
    ```bash
    http://localhost:3000


