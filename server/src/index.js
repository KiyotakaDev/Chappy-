import app from "./app.js";
import server from "./server.js";
import { connectDB } from "./db.js";

const PORT = app.get("port");

connectDB();
server.listen(PORT);
console.log(`>> Server On Port ${PORT} <<`);
