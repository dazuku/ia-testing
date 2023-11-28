
# IA with LangChain

This a small project for testing the capabilities of LangChain with ChatGPT

## Prerequisites

* Node v18.16.1 - NPM v9.6.5
* [Bun](https://bun.sh/) installed

## Quick start

1. Install dependencies
```bash
npm ci
```
2. Clone `base.env` file and rename it as `.env`. Fill the variables. If you don't know how to create your own API Key go [here](https://platform.openai.com/docs/quickstart/account-setup)
3. Run the server
```bash
npm run api
``` 
4. Run the bot
```bash
npm run bot
```
5. Enjoy!

## Stack
* [Typescript](https://www.typescriptlang.org/)
### Server
* [Express](https://expressjs.com/)
* [Body Parser](https://expressjs.com/en/resources/middleware/body-parser.html)
### Bot
* [LangChain](https://www.langchain.com/)
