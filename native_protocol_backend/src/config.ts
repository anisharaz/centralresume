import { configDotenv } from 'dotenv';

interface Config {
  // The port on which the server will listen
  port: number;
  // The host name of the server
  host: string;
}

export class ConfigManager {
  private static instance: ConfigManager;
  private config: Config;

  private constructor() {
    configDotenv();
    this.config = {
      port: parseInt(process.env.PORT || '3000', 10),
      host: process.env.HOST || 'localhost',
    };
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  public getConfig(): Config {
    return this.config;
  }
}
