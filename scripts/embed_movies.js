import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import { readFile } from 'fs/promises' 


const openai = new OpenAI({ apiKey: process.env.VITE_OPENAI_API_KEY })
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_API_KEY
)

async function splitDocument(document) {
  const response = await readFile(document)
  console.log(response)

//   return output;
}

// async function createAndStoreEmbeddings() {
//   const chunkData = await splitDocument("..movies.txt");
//   const data = await Promise.all(
//     chunkData.map(async (chunk) => {
//       const embeddingResponse = await openai.embeddings.create({
//         model: "text-embedding-ada-002",
//         input: chunk.pageContent
//       });
//       return { 
//         content: chunk.pageContent, 
//         embedding: embeddingResponse.data[0].embedding 
//       }
//     })
//   );
//   await supabase.from('movie_embeddings_v1').insert(data);
//   console.log('SUCCESS!');
// }
// createAndStoreEmbeddings();


async function createAndStoreEmbeddings() {
  const chunkData = await splitDocument("movies.txt")
//   const data = await Promise.all(
//     chunkData.map(async (chunk) => {
//       const embeddingResponse = await openai.embeddings.create({
//         model: "text-embedding-ada-002",
//         input: chunk.pageContent
//       });
//       return { 
//         content: chunk.pageContent, 
//         embedding: embeddingResponse.data[0].embedding 
//       }
//     })
//   );
//   await supabase.from('movie_embeddings_v1').insert(data);
//   console.log('SUCCESS!');
}
createAndStoreEmbeddings()