const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTURGbE93NndVVXE0YjVuWGtNcDhVSXdEN21waEpjWFJiMkhhM3NNNFRrRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaURiMTRLdWRuVllGRG9CVm5ObzFxZFFUZnYwMithU1N1SE13WUU2djBoVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBUGJmVHZVZ2hBU0crY1pRaFZvMEtpOXBrdkVHTDVOVC9MVnpEajh4N0hBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJZkVndkNqUjNGWE1KNUFrWW1VSkh0cjhUYm5PMnIwb1N3K2ZCcEVKS25nPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFCcXF0K3FmNE9yNWxYSXpKOG9yK09Gem1tT0dub1hnV2NWb2xxY2tUMjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNhSS92c3paY3NON0FwellQMGw1d1hIL2JMUHdDQ3FwRkQ1R1dPZ0dZME09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0ltbXN0dy9wS2lBSk9TeDZlcHliN2ROZUtMRGJ0Qng1cGJ6c3dUTlJtUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMXhTMWxIZ1VMT1NNKy9STlZUSnNUaHhnRjAzS3hWc0R2TDFjK2F4TThRST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNYNENpbGJpR0J4RHBrNWVnSlg5Q0JtdENRanc3RkFOUmlIR2RtSlpQakZwVjNXWGU3ZUIwM2JocGFsTmEybG1YNWVVNGhhTDNWdGF6a2FRZDFTckNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjEyLCJhZHZTZWNyZXRLZXkiOiJlTkpCZ0FRcU9XNU9hL1BsU1cyaEZWR3QzZFYzdFdFcFdhWXd4cU9FWWtnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzMzIwMjQyOTE4MkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQTAyOTFBREM2REYwNjYzOUYyNiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ2Mzk4MTQ5fV0sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJjYWs0TWZxeFNfZXhBZjBOMVR5TzBRIiwicGhvbmVJZCI6IjVkMjYzNmI2LTFiMWQtNGE1Yy04MTgzLWQ3N2M2N2ViZjg2YSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJNlZ2U0YyeU10eDZ1OXpBdzRwNm1ndzA5ZTA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQjB5akJvblZKd2JHMUplR1o2QlFkWSs5d1Q4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ijk5SlpTWlJQIiwibWUiOnsiaWQiOiIyMzMyMDI0MjkxODI6MTFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiUkVHSU5BIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKTzhxNjBERUxYWDM4QUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJtRkdlVGR4NThBVzFqbTR0MTN6Q0hlVzZqVWRjOWxuTkVFQ09tcFNBMTFVPSIsImFjY291bnRTaWduYXR1cmUiOiJVNjVsREV1a1JJRGNIQjhJZ21JTk8wQ3JwZHR1OGZnaDBNRHpyMkwyZ2E4RnNMdndFSTRpZi9XZmFmOW5kb1VmMURWVzd1aGhYTStmWk1vTG1NTFlBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiL0puNnhjcWpORTJ1bGJnLzhFN050VUhZUm1FSUltRnNlOXM1YXNLOXh5Z2dUVjA5VmwvdVZYMGN0WjRuTWZuYlppTzZZNmpTdWpZSndSQ1JNRlFCQ0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzMyMDI0MjkxODI6MTFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWmhSbmszY2VmQUZ0WTV1TGRkOHdoM2x1bzFIWFBaWnpSQkFqcHFVZ05kViJ9fV0sInBsYXRmb3JtIjoic21iaSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NjM5ODE0NywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFIV0UifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "233202429182",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
                  ANTIDELETE2 : process.env.ANTIDELETE2 || "yes",
                  ANTIDELETE1 : process.env.ANTIDELETE1 || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANYWAY_MD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
