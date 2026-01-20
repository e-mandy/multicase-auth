import express from 'express';
import authRoutes from './src/infrastructure/web/routes/authRoutes.ts';
import { errorMiddleware } from './src/infrastructure/web/middleware/errorMiddleware.ts';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(errorMiddleware);

app.listen(3000, () => {
    console.log("Server is running on the port 3000.")
});