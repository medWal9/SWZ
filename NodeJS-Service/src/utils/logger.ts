/*
Text colors:

Black: 30
Red: 31
Green: 32
Yellow: 33
Blue: 34
Magenta: 35
Cyan: 36
White: 37
Background colors:

Black: 40
Red: 41
Green: 42
Yellow: 43
Blue: 44
Magenta: 45
Cyan: 46
White: 47
*/

interface ILogger {
    name: string;
}

enum LogLevel {
    ERROR = '31',
    INFO = '32',
    WARN = '33',
    DEBUG = '34',
}

export class Logger implements ILogger {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    info(msg: string): void {
        console.log('\x1b[42m info: \x1b[0m', this.formatLoggerContent(msg, LogLevel.INFO));
    }
    error(msg: string, error: Error) {
        console.log(
            '\x1b[41m error: \x1b[0m',
            this.formatLoggerContent(msg, LogLevel.ERROR, error)
        );
    }

    warn(msg: string) {
        console.log('\x1b[43m warning: \x1b[0m', this.formatLoggerContent(msg, LogLevel.WARN));
    }

    debug(msg: string) {
        console.log('\x1b[44m debug: \x1b[0m', this.formatLoggerContent(msg, LogLevel.DEBUG));
    }

    private getCallerInfo(): string {
        const error = new Error();
        const stack = error.stack?.split('\n');
        if (stack) {
            // On cherche la première ligne qui ne provient pas du fichier du logger
            for (const line of stack) {
                // On ignore les lignes qui mentionnent le fichier logger
                if (!line.includes(__filename)) {
                    // Extraire le chemin du fichier depuis la ligne de stack trace
                    const match = line.match(/\((.*):\d+:\d+\)$/); // Pattern adapté pour capturer le chemin de fichier
                    if (match && match[0]) {
                        return match[0].substring(1, match[0].length - 1); // Chemin absolu du fichier appelant
                    }
                }
            }
        }
        return 'unknown';
    }

    private formatLoggerContent(msg: string, level: string, error?: Error): string {
        const content = `${this.name}: {
            date: ${new Date().toISOString()}
            path: ${this.getCallerInfo()}
            message: \x1b[${level}m ${msg} \x1b[0m
            ${error ? 'error: ' + error.toString() : ''}
        }`;

        return content;
    }
}
