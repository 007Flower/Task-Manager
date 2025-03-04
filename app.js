import express from "express";
import path from "path";
import routes from "./routes/routes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

const loggingMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
};

app.use(loggingMiddleware);
app.use("/", routes);

app.use((req, res) => {
    res.status(404).render("404", { title: "Page Not Found" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
