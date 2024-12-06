import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { authenticateToken } from './middleware/auth';
import authRoutes from './routes/auth';

const app = express();

// Security middleware
app.use(helmet());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api', authenticateToken);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});