# Smart Query

A Next.js application that lets you upload text documents and then ask questions about them. The AI reads your document and provides intelligent answers based on the content you submitted.

## Features

- **Document Processing**: Submit text documents (up to 500 characters) for intelligent analysis
- **AI-Powered Q&A**: Ask questions about your documents and get contextual answers

## Architecture

The application consists of a Next.js frontend connected to three Cloudflare Workers:

1. **Document Processor Worker**: Chunks documents and generates embeddings
2. **Embeddings Worker**: Converts text to vector embeddings using Hugging Face
3. **RAG Query Worker**: Performs similarity search and generates AI responses using Llama 3.1

```
User Input → Document Processing → Vector Storage → Question → Similarity Search → AI Response
```

## Technologies

- **Frontend**: Next.js 15, React 19, TypeScript
- **State Management**: React Query (@tanstack/react-query)
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Cloudflare Workers
- **Database**: Supabase with pgvector
- **AI Models**: Hugging Face (embeddings + Llama 3.1-8B-Instruct)

## Setup

### Prerequisites

- Node.js 18+
- Deployed Cloudflare Workers (document-processor-worker, embeddings-worker, rag-query-worker)

### Environment Variables

Create a `.env` file in the root directory:

```env
# Cloudflare Workers URLs
NEXT_PUBLIC_DOCUMENT_PROCESSOR_URL=
NEXT_PUBLIC_RAG_QUERY_URL=
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```
