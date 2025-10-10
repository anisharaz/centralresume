import { PrismaClient } from "@centralresume/database";
import { MongoClient } from "mongodb";
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

class MongoDbClient {
  private static instance: MongoDbClient;
  private client: MongoClient;

  private constructor() {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
    this.client = new MongoClient(uri);
  }
  public static getInstance(): MongoDbClient {
    if (!MongoDbClient.instance) {
      MongoDbClient.instance = new MongoDbClient();
    }
    return MongoDbClient.instance;
  }

  public getClient(): MongoClient {
    return this.client;
  }
}

export const MongoResumeDBClient = MongoDbClient.getInstance()
  .getClient()
  .db("centralresume");
