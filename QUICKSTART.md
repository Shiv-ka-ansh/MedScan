# Quick Start Guide

## 🚀 Fastest Way to Get Started

### Prerequisites
- Docker and Docker Compose installed
- OpenAI API Key

### Steps

1. **Clone and navigate to project**
   ```bash
   cd MedScan
   ```

2. **Create environment file**
   ```bash
   # Create .env in root directory
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
   echo "JWT_SECRET=your_super_secret_jwt_key_change_this" >> .env
   
   # Create server/.env
   echo "MONGO_URI=mongodb://mongo:27017/mediscan" > server/.env
   echo "JWT_SECRET=your_super_secret_jwt_key_change_this" >> server/.env
   echo "OPENAI_API_KEY=your_openai_api_key_here" >> server/.env
   echo "PORT=5000" >> server/.env
   echo "NODE_ENV=production" >> server/.env
   ```

3. **Start all services**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api/health
   - MongoDB: localhost:27017

5. **Register a user**
   - Go to http://localhost:5173/register
   - Create an account (Patient or Doctor role)
   - Login and start uploading reports!

## 📝 First Steps After Setup

1. **Register as Patient**
   - Go to Register page
   - Create account with role "Patient"
   - Login

2. **Upload a Medical Report**
   - Click "Upload Report" button
   - Select a PDF, image, or text file
   - Wait for AI analysis (may take 30-60 seconds)

3. **View Report Analysis**
   - See AI summary, abnormalities, and recommendations
   - Download as PDF

4. **Chat with AI**
   - Go to Chat page
   - Ask questions about your reports

5. **Doctor Panel** (if registered as Doctor)
   - Review pending reports
   - Approve or reject analyses
   - Add professional comments

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB container is running
docker ps

# Restart MongoDB
docker-compose restart mongo
```

### OpenAI API Error
- Verify your API key in `.env` files
- Check API quota at https://platform.openai.com/

### Port Already in Use
```bash
# Change ports in docker-compose.yml
# Or stop conflicting services
```

### Build Errors
```bash
# Clean and rebuild
docker-compose down -v
docker-compose up --build
```

## 📚 Next Steps

- Read full README.md for detailed documentation
- Customize AI prompts in `server/src/utils/aiService.ts`
- Add more features as needed


