# MediScan AI – Smart Health Report Analyzer

A full-stack MERN application with AI integration for analyzing medical reports. Upload medical reports (PDF/Image/Text), get AI-powered insights, abnormality detection, and plain-English explanations.

## 🚀 Features

- **AI-Powered Analysis**: Uses OpenAI API to analyze medical reports and provide insights
- **Report Upload**: Support for PDF, images (with OCR), and text files
- **Role-Based Access**: Patient, Doctor, and Admin roles with different permissions
- **Doctor Verification**: Doctors can review and verify AI analyses
- **AI Chatbot**: Interactive chatbot to ask questions about your health reports
- **Dashboard**: View report history and health trends
- **PDF Export**: Download AI summaries as PDF
- **Dockerized**: Complete Docker setup for easy deployment

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- TypeScript
- Tailwind CSS
- React Router
- Axios
- Recharts (for charts)
- jsPDF (for PDF generation)
- Lucide React (icons)

### Backend
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)
- OpenAI API integration
- Tesseract.js (OCR)
- pdf-parse (PDF text extraction)

### Deployment
- Docker & Docker Compose
- GitHub Actions CI/CD

## 📋 Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- OpenAI API Key (get one from [OpenAI](https://platform.openai.com/))
- MongoDB (or use Docker)

## 🚀 Quick Start

### Option 1: Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MedScan
   ```

2. **Create environment file**
   ```bash
   cp server/.env.example server/.env
   ```

3. **Edit `server/.env` with your credentials**
   ```env
   MONGO_URI=mongodb://mongo:27017/mediscan
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   NODE_ENV=production
   ```

4. **Create `.env` file in root directory for Docker Compose**
   ```bash
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
   echo "JWT_SECRET=your_super_secret_jwt_key_change_this_in_production" >> .env
   ```

5. **Build and start all services**
   ```bash
   docker-compose up --build
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

### Option 2: Local Development

#### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your credentials:
   ```env
   MONGO_URI=mongodb://localhost:27017/mediscan
   JWT_SECRET=your_super_secret_jwt_key
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB** (if not using Docker)
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

5. **Build and run server**
   ```bash
   npm run build
   npm start
   # Or for development with hot reload:
   npm run dev
   ```

#### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file (optional)**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access frontend**
   - http://localhost:5173

## 📁 Project Structure

```
MediScanAI/
├── client/                # React Frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React Context (Auth)
│   │   ├── services/      # API services
│   │   ├── lib/           # Utilities
│   │   └── App.tsx        # Main app component
│   ├── package.json
│   ├── vite.config.ts
│   └── Dockerfile.client
│
├── server/                # Node.js Backend
│   ├── src/
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Auth, upload middleware
│   │   ├── utils/         # AI service, text extraction
│   │   └── server.ts      # Express server
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile.server
│
├── docker-compose.yml     # Docker Compose configuration
├── .github/workflows/     # CI/CD workflows
└── README.md
```

## 🔐 Authentication & Roles

### User Roles

- **Patient**: Can upload reports, view their own reports, chat with AI
- **Doctor**: Can review pending reports, approve/reject analyses, add comments
- **Admin**: Full access (same as doctor + user management)

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

#### Reports
- `POST /api/reports/upload` - Upload medical report (protected)
- `GET /api/reports` - Get user's reports (protected)
- `GET /api/reports/:id` - Get single report (protected)
- `GET /api/reports/pending/all` - Get pending reports (doctor/admin)
- `PUT /api/reports/:id/review` - Review report (doctor/admin)
- `DELETE /api/reports/:id` - Delete report (protected)

#### Chat
- `POST /api/chat` - Chat with AI (protected)

## 🤖 AI Integration

The application uses OpenAI's GPT-3.5-turbo model for:
- Medical report summarization
- Abnormality detection
- Plain-English explanations
- Health-related Q&A

### AI Service Configuration

Edit `server/src/utils/aiService.ts` to:
- Change AI model
- Modify prompts
- Switch to HuggingFace API (if needed)

## 🐳 Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Start services in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild specific service
docker-compose build backend
docker-compose up -d backend
```

## 🔧 Environment Variables

### Backend (`server/.env`)
```env
MONGO_URI=mongodb://mongo:27017/mediscan
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_key
PORT=5000
NODE_ENV=production
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📝 API Usage Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "patient"
  }'
```

### Upload Report
```bash
curl -X POST http://localhost:5000/api/reports/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/report.pdf"
```

## 🧪 Testing

```bash
# Backend tests (if implemented)
cd server
npm test

# Frontend tests (if implemented)
cd client
npm test
```

## 🚢 Deployment

### Production Deployment

1. **Update environment variables** for production
2. **Build Docker images**
   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```
3. **Deploy to cloud** (AWS, GCP, Azure, etc.)
4. **Set up reverse proxy** (Nginx) for frontend
5. **Configure SSL certificates**

### CI/CD

GitHub Actions workflow automatically:
- Builds Docker images on push to main
- Runs health checks
- Can be extended to deploy to cloud

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `docker ps`
- Check `MONGO_URI` in `.env`
- Verify network connectivity in Docker

### OpenAI API Errors
- Verify `OPENAI_API_KEY` is correct
- Check API quota/limits
- Ensure internet connectivity

### File Upload Issues
- Check file size (max 10MB)
- Verify file type (PDF, image, or text)
- Ensure uploads directory exists

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 🙏 Acknowledgments

- OpenAI for AI API
- MongoDB for database
- React and Node.js communities

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Note**: This application is for educational purposes. Always consult with healthcare professionals for medical advice.


