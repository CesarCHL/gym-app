import { MongoClient, Collection, WithId, Document } from "mongodb";

type Workout = {
    name: string;
    sets: number;
    reps: number;
    createdAt?: Date;
};

let cachedClient: MongoClient | null = null;
let cachedCollection: Collection<Workout> | null = null;

async function getCollection(): Promise<Collection<Workout>> {
    if (cachedCollection) return cachedCollection;
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("Missing MONGODB_URI environment variable");

    if (!cachedClient) {
        cachedClient = new MongoClient(uri, { connectTimeoutMS: 10000 });
        await cachedClient.connect();
    }

    const db = cachedClient.db("workouts");
    cachedCollection = db.collection<Workout>("workouts");
    return cachedCollection;
}

export async function fetchWorkouts(): Promise<WithId<Workout>[]> {
    const coll = await getCollection();
    return coll.find({}).toArray();
}

export async function createWorkout(payload: Partial<Workout>) {
    const { name, sets, reps } = payload;
    if (!name || typeof sets !== "number" || typeof reps !== "number") {
        throw new Error("Missing or invalid fields: name (string), sets (number), reps (number)");
    }
    const coll = await getCollection();
    const doc: Workout = { name, sets, reps, createdAt: new Date() };
    const result = await coll.insertOne(doc);
    return result;
}

// Optional: an HTTP handler similar to your original example.
// If you use Next.js API routes, this shape (req, res) will work.
export default async function handler(req: any, res: any) {
    const method = req.method?.toUpperCase();

    try {
        if (method === "GET") {
            const workouts = await fetchWorkouts();
            return res.status(200).json(workouts);
        }

        if (method === "POST") {
            const { name, sets, reps } = req.body ?? {};
            // coerce numeric fields if they come as strings
            const payload = { name, sets: Number(sets), reps: Number(reps) };
            const result = await createWorkout(payload);
            return res.status(201).json(result);
        }

        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    } catch (error: any) {
        const status = error.message?.includes("Missing") ? 400 : 500;
        return res.status(status).json({ message: error.message ?? "Unknown error" });
    }
}