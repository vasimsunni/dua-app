import { db } from '../../../../lib/firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { NextResponse } from "next/server";


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

export async function GET() {
  const q = query(collection(db, "hadees"), orderBy("id", "asc"));
  const snapshot = await getDocs(q);

  const duaList = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: Number(data.id),
      title: data.title,
      type: data.type,
      content: data.content,
      imageData: data.imageData,
    };
  });

  return NextResponse.json(duaList, {
    headers: {
      "Cache-Control": "no-store", // prevent caching
    },
  });
}