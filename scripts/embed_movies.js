import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'
import movies from "../content.js"

const openai = new OpenAI({ apiKey: process.env.VITE_OPENAI_API_KEY })
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_API_KEY
)

async function createAndStoreEmbeddings(document) {

  for (const { title, releaseYear, content } of document) {
    const movie = title + releaseYear + content
    const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: movie
      })
    const data = {
      movie_description: movie,
      movie_embedding: embeddingResponse.data[0].embedding
    }
    const { error } = await supabase.from('movie_embeddings_v1').insert(data)
    if (error) console.error(error)
  }
  console.log('SUCCESS!');
}

createAndStoreEmbeddings(movies)