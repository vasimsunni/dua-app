import { db } from "./firebase";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

type HadeesItem = {
  id: number;
  title: string;
  type: string;
  content: string;
  imageData: string;
};

export async function getHadeesData(): Promise<HadeesItem[]> {
  const q = query(collection(db, 'hadees'), orderBy('id', 'asc'));
  const snapshot = await getDocs(q);

  const duaList: HadeesItem[] = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: Number(data.id),
      title: data.title,
      type: data.type,
      content: data.content,
      imageData: data.imageData
    };
  });

  return duaList;
}