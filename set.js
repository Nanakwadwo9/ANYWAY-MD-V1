const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUNkZGtqd2ZuVGROVGZHcnpENDFRaFJpN1VrbzlyRVlmZWo2ZFVTeGdXOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOHlCSEMzbEQzMjRSNmhOZGliZkhlcXk2U1N5NmJUdGdqOEtLcytXRVJ4UT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvRHdZWGxaMjlaa2Rka0F0cHlKNUtYcisrQnp5TnZIS014a3J0UFhWRUVNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2eHkyejB3YzJaclhaRHBxMGUzbmlYVjZDcFpaSjE3cHkwdGY1MnlBREhzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNGOWMzazRhMldmSlF6Z25mOTFWb1ZaSzJYWVVIWmJMQ2VXNUZJWnRMRk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imw3amw2Q0RaT1hJcm43UGZkOFlsRmxqeU5Eck5NaFZhenJWK0R6Ym9EVjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0dKQTZhZ2tna0VTOUMvSW5SaEhJT3g3c1h1TGxLWXFTOWMvbU1pcVoxOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWVVRb1FwdzZQRWVGck1qYjU4cE5BN3VIaytuNm1YK3BERURlaEpiRGlHbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5mZXMxVnlCM0V1RnY2OG1hRzJCY245SUlicjZzMHZoR0RiajdoaWZXKzlwWm5UOEpZU1Juc0cyM2lWbzJTUUcwMXNLbXNlcjJtdW9BUG82ZzlsbkNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzgsImFkdlNlY3JldEtleSI6Ikxmd0E1bkN0SlRadE5RdjlUdmFUNlhnb2RJZncrNzA4SSs1bEpTdG05K2c9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjMzMjAyNDI5MTgyQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBQjk1RDlBRTI4NjAyOTYxRDA5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDcyNTU1ODZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzMzIwMjQyOTE4MkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQUZGNkU0QUExM0I2NzJEQjdEQSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3MjU1NTg5fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIyYUNmZUNwaVEwZTk3a0tkeDN4TVNRIiwicGhvbmVJZCI6ImZjOTk3MGQwLTk0MmMtNGRhOS1hYWM2LTRlNjQyYTQ4YzkwNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHMUIyUTVMS0tFcGh5NnAvRVJ6OS9CQ21wVEk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaXFEMlRTK2MvZmQ4YXRqZXQxNFIxZnRxWlF3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkVWOUJTUVhTIiwibWUiOnsiaWQiOiIyMzMyMDI0MjkxODI6NTBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiUkVHSU5BIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMdXN2dm9DRUpPQ2xNRUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJtRkdlVGR4NThBVzFqbTR0MTN6Q0hlVzZqVWRjOWxuTkVFQ09tcFNBMTFVPSIsImFjY291bnRTaWduYXR1cmUiOiI3V1ZBSDdrUjIzOTdKc055Z213c3o2NDlaMzA2a3hXQ2Mzamh6WUdFektHdmlYdkdISGtwdllIaUJzbk9LNDAxSXNDV0g5a0lzSjJCQjhyc2xIZTFEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTjFUcFd1aktKUlFDb25ObzhRL1dLV0I5ZEN3R2E2K0R5UGFqU1ZobFl3OU1zZnNyMkZqR3JUbFJILzI4RFBiVU4veGdyQmpnbEtpRnhESTIyeG4wQlE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzMyMDI0MjkxODI6NTBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWmhSbmszY2VmQUZ0WTV1TGRkOHdoM2x1bzFIWFBaWnpSQkFqcHFVZ05kViJ9fV0sInBsYXRmb3JtIjoic21iaSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NzI1NTU4NCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBamsifQ==',
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
