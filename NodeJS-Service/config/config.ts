// src/Config.ts
import * as path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { ConfigSchema } from './config.interface';


class Config {
  private config: ConfigSchema;

  constructor() {
    // Charger les valeurs par défaut
    const defaultConfigPath = path.resolve(__dirname, '../config', 'default.yaml');
    const defaultConfig = yaml.load(fs.readFileSync(defaultConfigPath, 'utf8')) as ConfigSchema;

    // Déterminer l'environnement via la variable d'environnement ENVIRONMENT
    const env = process.env.ENVIRONMENT || 'local';  // Par défaut à 'local' si aucune variable ENVIRONMENT n'est définie
    console.log(process.env.ENVIRONMENT)
    const envConfigPath = path.resolve(__dirname, '../config', `${env}.yaml`);

    // Charger les valeurs spécifiques de l'environnement si le fichier existe
    let envConfig: Partial<ConfigSchema> = {};
    if (fs.existsSync(envConfigPath)) {
      envConfig = yaml.load(fs.readFileSync(envConfigPath, 'utf8')) as Partial<ConfigSchema>;
    }

    // Fusionner les configurations avec les valeurs de l'environnement qui écrasent celles par défaut
    this.config = { 
      ...defaultConfig, 
      ...envConfig, 
      environment : env,
      server: {
        ...defaultConfig.server,
        ...envConfig.server
      },
      database: {
        ...defaultConfig.database,
        ...envConfig.database
      }
    };
  }

  get<T extends keyof ConfigSchema>(key: T): ConfigSchema[T] {
    return this.config[key];
  }
}

export const config = new Config();

//const config = new Config();

console.log(`Server is running on ${config.get('server').host}:${config.get('server').port}`);
console.log(`Database URI: ${config.get('database').uri}`);