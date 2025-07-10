const DOCUMENT_PROCESSOR_URL =
  process.env.NEXT_PUBLIC_DOCUMENT_PROCESSOR_URL || "";
const RAG_QUERY_URL = process.env.NEXT_PUBLIC_RAG_QUERY_URL || "";

export async function processDocument(document: string) {
  const response = await fetch(DOCUMENT_PROCESSOR_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ document }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to process document");
  }

  return response.json();
}

export async function queryDocument(question: string, document_id: string) {
  const response = await fetch(RAG_QUERY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question, document_id }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to query document");
  }

  return response.json();
}
