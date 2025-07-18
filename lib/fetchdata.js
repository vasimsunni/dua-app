import fsPromises from 'fs/promises';
import path from 'path';

export async function getHadeesData() {
  const filePath = path.join(process.cwd(), '/lib/data/hadees.json'); // Adjust path as needed
  const jsonData = await fsPromises.readFile(filePath, 'utf8');
  const objectData = JSON.parse(jsonData);
  return objectData;
}