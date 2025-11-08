import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { FileText, Brain, Shield, BarChart3, Upload, MessageSquare } from 'lucide-react';

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <FileText className="h-20 w-20 text-primary-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            MediScan AI
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            Smart Health Report Analyzer
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Upload your medical reports and get instant AI-powered insights, 
            abnormality detection, and plain-English explanations.
          </p>
          {user ? (
            <div className="flex justify-center space-x-4">
              <Link to="/dashboard">
                <Button size="lg">Go to Dashboard</Button>
              </Link>
              <Link to="/upload">
                <Button variant="outline" size="lg">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Report
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex justify-center space-x-4">
              <Link to="/register">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">Sign In</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Brain className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-600">
              Advanced AI analyzes your medical reports, identifies abnormalities, 
              and provides clear explanations in plain English.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <Shield className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Doctor Verified</h3>
            <p className="text-gray-600">
              All AI analyses are reviewed by qualified doctors to ensure accuracy 
              and provide professional insights.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <MessageSquare className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Chatbot</h3>
            <p className="text-gray-600">
              Ask questions about your health reports and get instant answers 
              from our AI health assistant.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Upload Report</h4>
              <p className="text-sm text-gray-600">Upload your medical report (PDF, Image, or Text)</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI Analysis</h4>
              <p className="text-sm text-gray-600">Our AI extracts and analyzes the report content</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Get Insights</h4>
              <p className="text-sm text-gray-600">Receive summary, abnormalities, and recommendations</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Doctor Review</h4>
              <p className="text-sm text-gray-600">Doctors verify and add professional comments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


