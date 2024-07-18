import express from "express";
import morgan from "morgan";

// Import routes
import projectsRoutes from "./routes/projects.routes.js";
import workpackagesRoutes from "./routes/workpackages.routes.js";
import clientsRoutes from "./routes/clients.routes.js"
import templatesRoutes from './routes/templates.routes.js'

const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api/projects", projectsRoutes);
app.use("/api/workpackages", workpackagesRoutes);
app.use('/api/clients', clientsRoutes)
app.use('/api/templates', templatesRoutes)

export default app;
