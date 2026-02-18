import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

const migrate = async () => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("MongoDB connected for migration");

    const db = client.db("deeptestlabs_v1");
    const collection = db.collection("projects");

    const projects = await collection.find({ apiBaseUrl: { $exists: false } }).toArray();

    console.log(`Found ${projects.length} projects to update`);

    for (const project of projects) {
      await collection.updateOne(
        { _id: project._id },
        { $set: { apiBaseUrl: project.baseUrl } }
      );
      console.log(`Updated project: ${project.name}`);
    }

    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await client.close();
    process.exit(0);
  }
};

migrate();
