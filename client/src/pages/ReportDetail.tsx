import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReport, Report } from '../services/reportService';
import { Button } from '../components/Button';
import { ArrowLeft, Download, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import jsPDF from 'jspdf';

export const ReportDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadReport();
    }
  }, [id]);

  const loadReport = async () => {
    try {
      const data = await getReport(id!);
      setReport(data.report);
    } catch (error) {
      console.error('Failed to load report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!report) return;

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

    if (report.doctorComments) {
      doc.setFontSize(14);
      doc.text('Doctor Comments', 20, doc.internal.pageSize.height - 40);
      doc.setFontSize(11);
      const commentLines = doc.splitTextToSize(report.doctorComments, 170);
      doc.text(commentLines, 20, doc.internal.pageSize.height - 30);
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

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report not found</h2>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const getStatusIcon = () => {
    switch (report.status) {
      case 'approved':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-6 w-6 text-red-600" />;
      default:
        return <AlertCircle className="h-6 w-6 text-yellow-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button variant="outline" onClick={() => navigate('/dashboard')} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{report.fileName}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                <span className="flex items-center space-x-2">
                  {getStatusIcon()}
                  <span className="capitalize">{report.status}</span>
                </span>
              </div>
            </div>
            <Button onClick={handleDownloadPDF}>
              <Download className="h-5 w-5 mr-2" />
              Download PDF
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">AI Summary</h2>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{report.aiSummary}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Plain English Explanation
              </h2>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                {report.aiAnalysis.plainEnglish}
              </p>
            </div>

            {report.aiAnalysis.abnormalities.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Abnormalities Detected
                </h2>
                <ul className="space-y-2">
                  {report.aiAnalysis.abnormalities.map((abnormality, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-2 text-gray-700 bg-red-50 p-3 rounded-lg"
                    >
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>{abnormality}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {report.aiAnalysis.recommendations.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Recommendations</h2>
                <ul className="space-y-2">
                  {report.aiAnalysis.recommendations.map((rec, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-2 text-gray-700 bg-green-50 p-3 rounded-lg"
                    >
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {report.doctorComments && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Doctor Comments</h2>
                <p className="text-gray-700 bg-blue-50 p-4 rounded-lg">{report.doctorComments}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


