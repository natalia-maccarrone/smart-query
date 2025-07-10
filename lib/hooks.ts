import { useMutation } from "@tanstack/react-query";
import { processDocument, queryDocument } from "./api";

export function useProcessDocument(
  onSuccess?: (data: {
    success: boolean;
    document_id: string;
    chunks_processed: number;
  }) => void
) {
  return useMutation({
    mutationFn: (document: string) => processDocument(document),
    onSuccess: (data) => {
      onSuccess?.(data);
      console.log("Document processed successfully:", data);
    },
    onError: (error) => {
      console.error("Error processing document:", error);
    },
  });
}

export function useQueryDocument(
  onSuccess?: (data: {
    answer: { role: string; content: string };
    chunks_used: number;
    similarity_scores: number[];
  }) => void
) {
  return useMutation({
    mutationFn: ({
      question,
      document_id,
    }: {
      question: string;
      document_id: string;
    }) => queryDocument(question, document_id),
    onSuccess: (data) => {
      onSuccess?.(data);
      console.log("Document queried successfully:", data);
    },
    onError: (error) => {
      console.error("Error querying document:", error);
    },
  });
}
