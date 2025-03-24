import { MongoClient } from "mongodb";
import { PostType } from "../fake_data/posts";

const mongoUri =
  process.env.DB_CONNECT || "mongodb://admin:secret@localhost:27017/";

export const client = new MongoClient(mongoUri);
const db = client.db("learning");
export const postCollection = db.collection<PostType>("posts");

export async function runDb() {
  try {
    await client.connect();
    await client.db("learning").command({ ping: 1 });

    console.log("MongoDb succefully connected!");
  } catch (err) {
    console.log("MongoDb failed connected!");
    await client.close();
  }
}
