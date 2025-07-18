import { writeFile, readFile } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    const newDua = await req.json();
    const filePath = path.join(process.cwd(), 'lib/data/hadees.json');

    // Read existing duas
    const fileContent = await readFile(filePath, 'utf-8');
    const existingDuas = JSON.parse(fileContent);

    // Add new dua with unique ID
    newDua.id = Date.now(); // or use uuid
    existingDuas.push(newDua);

    // Save back to file
    await writeFile(filePath, JSON.stringify(existingDuas, null, 2));

    return new Response(JSON.stringify({ message: 'Dua added successfully' }), {
      status: 201,
    });
  } catch (error) {
    console.error('Failed to write dua:', error);
    return new Response(JSON.stringify({ error: 'Failed to save dua' }), {
      status: 500,
    });
  }
}
