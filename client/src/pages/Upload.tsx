import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadReport } from '../services/reportService';
import { Button } from '../components/Button';
import { Upload as UploadIcon, FileText, Loader } from 'lucide-react';

export const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const fileType = selectedFile.type;
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'text/plain',
      ];

      if (!allowedTypes.includes(fileType)) {
        setError('Invalid file type. Please upload PDF, image, or text file.');
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const response = await uploadReport(file);
      navigate(`/reports/${response.report._id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <FileText className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900">Upload Medical Report</h1>
            <p className="text-gray-600 mt-2">
              Upload your medical report (PDF, Image, or Text) for AI analysis
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.txt"
                onChange={handleFileChange}
                disabled={uploading}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <UploadIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  {file ? file.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-sm text-gray-500">
                  PDF, PNG, JPG, or TXT (Max 10MB)
                </p>
              </label>
            </div>

            {file && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-primary-600" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-red-600 hover:text-red-800"
                    disabled={uploading}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={!file || uploading}
            >
              {uploading ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Uploading and analyzing...
                </>
              ) : (
                <>
                  <UploadIcon className="h-5 w-5 mr-2" />
                  Upload and Analyze
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};


