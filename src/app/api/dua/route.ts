import { db } from '../../../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const newDua = await req.json();

    newDua.id = Date.now();

    console.log('Writing to Firestore:', newDua);

    const result = await addDoc(collection(db, 'hadees'), newDua);

    console.log('Firestore write success, ID:', result.id);

    return new Response(JSON.stringify({ message: 'Dua added successfully' }), {
      status: 201,
    });
  } catch (error) {
    console.error('Failed to write dua:', error);
    return new Response(JSON.stringify({ error: 'Failed to save dua', detail: error }), {
      status: 500,
    });
  }
}