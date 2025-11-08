import api from './api';

export interface ChatMessage {
  message: string;
  timestamp: string;
}

/**
 * Chat with AI
 */
export const chatWithAI = async (
  message: string,
  reportId?: string
): Promise<ChatMessage> => {
  const response = await api.post<ChatMessage>('/chat', {
    message,
    reportId,
  });
  return response.data;
};


