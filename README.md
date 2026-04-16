# Discord URL Shortener Bot

## README

### Overview

A Discord bot built with Node.js, Discord.js, Express, and MongoDB that creates short URLs directly from Discord messages. Users can send a command with a long URL, and the bot instantly generates a shortened link that redirects to the original URL.

The project combines a Discord bot with an Express server and MongoDB database, creating a tiny two-headed creature: one half lives inside Discord, the other half handles redirects in the browser.

---

## Features

* Create short URLs directly from Discord chat
* Generate unique 8-character short IDs using NanoID
* Redirect short links to the original URL
* Store URLs and visit history in MongoDB
* Track every visit to a shortened URL
* Discord slash command support (`/ping`)
* Basic bot reply and URL creation flow

---

## Tech Stack

* Node.js
* Discord.js
* Express.js
* MongoDB
* Mongoose
* NanoID
* dotenv

---

## How It Works

1. User sends a Discord message:

   ```
   create https://example.com
   ```
2. The bot extracts the URL from the message.
3. A unique short ID is generated.
4. The original URL and short ID are saved in MongoDB.
5. The bot replies with a shortened link:

   ```
   http://localhost:3000/abc123xy
   ```
6. When someone opens the short link, the Express server finds the original URL and redirects the user.
7. The visit timestamp is also stored in the database.

---

## Project Structure

```text
discordBot-master/
├── index.js              # Discord bot + Express server
├── commands.js           # Slash command registration
├── connection.js         # MongoDB connection
├── controllers/
│   └── url.js            # URL creation and redirect logic
├── models/
│   └── url.js            # Mongoose schema
├── .env
├── package.json
└── package-lock.json
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
BOT_TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_application_client_id
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

---

## Installation

```bash
git clone <your-repo-link>
cd discordBot-master
npm install
```

Run the project:

```bash
node commands.js
node index.js
```

The bot will connect to Discord and the Express server will run at:

```text
http://localhost:3000
```

---

## Example Usage

Inside Discord:

```text
create https://github.com
```

Bot Response:

```text
Short URL created: http://localhost:3000/a1b2c3d4
```

Opening that link redirects to:

```text
https://github.com
```

---


# Deployment Guide

## Option 1: Deploy Express Server on Render

1. Push the project to GitHub.
2. Create a free account on Render.
3. Click "New Web Service" and connect your GitHub repository.
4. Use these settings:

   * Build Command: `npm install`
   * Start Command: `node index.js`
5. Add the environment variables in Render:

   * `BOT_TOKEN`
   * `CLIENT_ID`
   * `MONGODB_URI`
   * `PORT`
6. Deploy the service. Render will give you a URL such as:

   ```
   https://your-bot.onrender.com
   ```

## Option 2: Deploy MongoDB

Use MongoDB Atlas:

1. Create a cluster in MongoDB Atlas.
2. Copy the connection string.
3. Put it into your `.env` file as:

   ```env
   MONGODB_URI=mongodb+srv://...
   ```

## Option 3: Keep the Discord Bot Running

Your Discord bot only stays alive while `node index.js` is running. Since Render keeps the server running 24/7, the bot will stay online automatically.

## Important Change Before Deploying

Inside your URL creation logic, replace:

```js
`http://localhost:3000/${shortId}`
```

with:

```js
`${process.env.BASE_URL}/${shortId}`
```

Then add this environment variable:

```env
BASE_URL=https://your-bot.onrender.com
```

Otherwise the bot will keep sending `localhost` links that only work on your own computer, a tiny paper airplane trying to cross the internet and splashing straight into the first puddle. 🌧️


