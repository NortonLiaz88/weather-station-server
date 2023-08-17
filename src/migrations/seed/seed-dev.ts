import { data } from './seed-data-dev';
import { MongoClient } from 'mongodb';

/**
 * Make any changes you need to make to the database here
 */
export async function seedDb() {
  const uri = 'mongodb://localhost:27017';

  const client = new MongoClient(uri, {});

  try {
    await client.connect();
    console.log('Connected correctly to server');
    const db = client.db('iot');
    const collection = db.collection('devices');

    await collection.insertMany([...data.entities]);

    console.log('Database seeded! :)');
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDb();
