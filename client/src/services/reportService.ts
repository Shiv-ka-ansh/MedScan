import api from './api';

export interface Report {
  _id: string;
  userId: string;
  fileName: string;
  fileType: string;
  aiSummary: string;
  aiAnalysis: {
    abnormalities: string[];
    recommendations: string[];
    plainEnglish: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  doctorComments?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Upload medical report
 */
export const uploadReport = async (file: File): Promise<{ report: Report }> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<{ report: Report }>('/reports/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Get all user reports
 */
export const getUserReports = async (): Promise<{ reports: Report[] }> => {
  const response = await api.get<{ reports: Report[] }>('/reports');
  return response.data;
};

/**
 * Get single report by ID
 */
export const getReport = async (id: string): Promise<{ report: Report }> => {
  const response = await api.get<{ report: Report }>(`/reports/${id}`);
  return response.data;
};

/**
 * Get pending reports (for doctors)
 */
export const getPendingReports = async (): Promise<{ reports: Report[] }> => {
  const response = await api.get<{ reports: Report[] }>('/reports/pending/all');
  return response.data;
};

/**
 * Review report (for doctors)
 */
export const reviewReport = async (
  id: string,
  status: 'approved' | 'rejected',
  comments?: string
): Promise<{ report: Report }> => {
  const response = await api.put<{ report: Report }>(`/reports/${id}/review`, {
    status,
    comments,
  });
  return response.data;
};

/**
 * Delete report
 */
export const deleteReport = async (id: string): Promise<void> => {
  await api.delete(`/reports/${id}`);
};


