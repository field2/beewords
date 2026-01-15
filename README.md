# Bee Words Finder

A web app to search through words by filtering based on available letters.

## Features
- Search words by typing letters
- Shows only words containing ALL typed letters
- Add new words to the list
- Clean, modern interface

## Usage
Visit the deployed site or run locally:
- Open `index.html` in a browser for the static version
- Or run `npm install && npm start` for the backend version with persistent storage

## How it works
Type letters in the search box. The app will show all words that contain ALL the letters you typed. For example:
- Type "o" → shows all words with the letter O
- Type "ox" → shows only words that have both O and X

New words are saved to your browser's localStorage on the static version, or to words.txt when using the Node.js backend.
