import express from "express";
import { config } from "./config/index";

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
	return response.json({ message: "Hello World" })
});

app.listen(config.port); 