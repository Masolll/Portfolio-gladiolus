import {MongoClient, ServerApiVersion} from "mongodb";
const uri = process.env.mongoURI || "mongodb://0.0.0.0:27017";
// const uri = "mongodb+srv://yastey:WeRtY.F.A.@cluster0.6culwax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export async function runDb() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("usersbox").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch {
        console.log("Can't connect to MongoDB(")
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
