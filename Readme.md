# AtemOSC Stream/Record Scheduler

Node.js script that triggers Start and Stop Stream and/or Recording at specified dates and times.

### Requirements:
- ATEM Switcher
- Computer with [ATEMOSC](https://www.atemosc.com/)
- Wireless Router / Network Switch (Recommended)
- [Node.js](https://nodejs.org/en/download/)

## Setup:
- Clone this repository
- Install dependencies
  - `npm install`
- Install **atemOSC**
- Edit `config.json` file with dates and times you want to start and stop stream/record.
  - Save file
- Connect network from ATEM Switcher to Computer.
  - Make sure they are in the same IP range.
- Connect atemOSC to Switcher
  - default is port `3333`
- Run code
  - `npm start`

# Tips
- Use Automator on Mac to automatically run atemOSC and code on startup. I also use teamviewer so i can remote in and change dates and times to config.json file