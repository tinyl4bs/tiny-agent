import 'dotenv/config';
import fs from 'fs/promises';

// Logging
const LOG_MODE = process.env.LOG_MODE === 'true';

// Date+timestamp
const LOG_FILE = `logs/${new Date().toISOString().split('T')[0]}-${new Date().toISOString().split('T')[1].split('.')[0]}.log`;

export class ConsoleLogger {
    public static log(message: string) {
        // white text
        console.log(`\x1b[37mLOGGER: ${message}\x1b[0m`);
        if (LOG_MODE) {
            fs.appendFile(LOG_FILE, `${message}\n`);
        }
    }

    // info
    public static info(message: string) {
        // blue text
        console.log(`\x1b[34m🔎 INFO: ${message}\x1b[0m`);
        if (LOG_MODE) {
            fs.appendFile(LOG_FILE, `${message}\n`);
        }
    }

    // warn
    public static warn(message: string) {
        // yellow text
        console.log(`\x1b[33m⚠️ WARN: ${message}\x1b[0m`);
        if (LOG_MODE) {
            fs.appendFile(LOG_FILE, `${message}\n`);
        }
    }

    // error
    public static error(message: string) {
        // red text
        console.log(`\x1b[31m❌ ERROR: ${message}\x1b[0m`);
        if (LOG_MODE) {
            fs.appendFile(LOG_FILE, `${message}\n`);
        }
    }

    // success
    public static success(message: string) {
        // green text
        console.log(`\x1b[32m✅ SUCCESS: ${message}\x1b[0m`);
        if (LOG_MODE) {
            fs.appendFile(LOG_FILE, `${message}\n`);
        }
    }

    // debug
    public static debug(message: string) {
        // magenta text
        if (process.env.DEBUG_MODE === 'true') {
            console.log(`\x1b[35m🐛 DEBUG: ${message}\x1b[0m`);
        }
        if (LOG_MODE) {
            fs.appendFile(LOG_FILE, `${message}\n`);
        }
    }
};


