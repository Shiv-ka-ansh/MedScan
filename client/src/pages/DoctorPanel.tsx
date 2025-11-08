import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPendingReports, reviewReport, Report } from '../services/reportService';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Shield, CheckCircle, XCircle, Calendar, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DoctorPanel = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [comments, setComments] = useState('');
  const [reviewing, setReviewing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadPendingReports();
  }, []);

  const loadPendingReports = async () => {
    try {
      const data = await getPendingReports();
      setReports(data.reports);
    } catch (error) {
      console.error('Failed to load pending reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (status: 'approved' | 'rejected') => {
    if (!selectedReport) return;

    setReviewing(true);
    try {
      await reviewReport(selectedReport._id, status, comments);
      setSelectedReport(null);
      setComments('');
      loadPendingReports();
    } catch (error) {
      console.error('Failed to review report:', error);
      alert('Failed to review report');
    } finally {
      setReviewing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Doctor Panel</h1>
          </div>
          <p className="text-gray-600">Review and verify patient medical reports</p>
        </div>

        {reports.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">All caught up!</h3>
            <p className="text-gray-600">No pending reports to review</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report._id}
                  className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedReport(report)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {report.fileName}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>
                            {(report as any).userId?.name || 'Unknown Patient'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                      Pending
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm line-clamp-2">{report.aiSummary}</p>
                </div>
              ))}
            </div>

            {selectedReport && (
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Report</h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">AI Summary</h3>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {selectedReport.aiSummary}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Abnormalities</h3>
                    <ul className="space-y-1">
                      {selectedReport.aiAnalysis.abnormalities.map((ab, index) => (
                        <li key={index} className="text-gray-700 bg-red-50 p-2 rounded">
                          • {ab}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Recommendations</h3>
                    <ul className="space-y-1">
                      {selectedReport.aiAnalysis.recommendations.map((rec, index) => (
                        <li key={index} className="text-gray-700 bg-green-50 p-2 rounded">
                          • {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mb-4">
                  <Input
                    label="Comments (Optional)"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Add your professional comments..."
                    multiline
                    rows={4}
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="danger"
                    className="flex-1"
                    onClick={() => handleReview('rejected')}
                    disabled={reviewing}
                  >
                    <XCircle className="h-5 w-5 mr-2" />
                    Reject
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => handleReview('approved')}
                    disabled={reviewing}
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Approve
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


