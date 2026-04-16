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

