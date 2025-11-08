import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserReports, Report, deleteReport } from '../services/reportService';
import { Button } from '../components/Button';
import { Upload, FileText, Trash2, Download, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

export const Dashboard = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await getUserReports();
      setReports(data.reports);
    } catch (error) {
      console.error('Failed to load reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this report?')) {
      return;
    }

    try {
      await deleteReport(id);
      setReports(reports.filter((r) => r._id !== id));
    } catch (error) {
      console.error('Failed to delete report:', error);
      alert('Failed to delete report');
    }
  };

  const handleDownloadPDF = (report: Report) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('MediScan AI - Health Report Analysis', 20, 20);
    doc.setFontSize(12);
    doc.text(`Report: ${report.fileName}`, 20, 35);
    doc.text(`Date: ${new Date(report.createdAt).toLocaleDateString()}`, 20, 45);
    doc.text(`Status: ${report.status}`, 20, 55);
    
    doc.setFontSize(14);
    doc.text('AI Summary', 20, 70);
    doc.setFontSize(11);
    const summaryLines = doc.splitTextToSize(report.aiSummary, 170);
    doc.text(summaryLines, 20, 80);

    doc.setFontSize(14);
    doc.text('Plain English Explanation', 20, 100);
    doc.setFontSize(11);
    const plainEnglishLines = doc.splitTextToSize(report.aiAnalysis.plainEnglish, 170);
    doc.text(plainEnglishLines, 20, 110);

    if (report.aiAnalysis.abnormalities.length > 0) {
      doc.setFontSize(14);
      doc.text('Abnormalities Detected', 20, 130);
      doc.setFontSize(11);
      report.aiAnalysis.abnormalities.forEach((abnormality, index) => {
        doc.text(`• ${abnormality}`, 20, 140 + index * 7);
      });
    }

    if (report.aiAnalysis.recommendations.length > 0) {
      const yPos = 130 + report.aiAnalysis.abnormalities.length * 7 + 10;
      doc.setFontSize(14);
      doc.text('Recommendations', 20, yPos);
      doc.setFontSize(11);
      report.aiAnalysis.recommendations.forEach((rec, index) => {
        doc.text(`• ${rec}`, 20, yPos + 10 + index * 7);
      });
    }

    doc.save(`${report.fileName}-analysis.pdf`);
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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
          </div>
          <Button onClick={() => navigate('/upload')}>
            <Upload className="h-5 w-5 mr-2" />
            Upload Report
          </Button>
        </div>

        {reports.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No reports yet</h3>
            <p className="text-gray-600 mb-6">Upload your first medical report to get started</p>
            <Button onClick={() => navigate('/upload')}>
              <Upload className="h-5 w-5 mr-2" />
              Upload Report
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <div key={report._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {report.fileName}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          report.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : report.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(report._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {report.aiSummary}
                </p>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => navigate(`/reports/${report._id}`)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleDownloadPDF(report)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


