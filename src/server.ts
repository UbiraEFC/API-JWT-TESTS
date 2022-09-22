import { app } from "./infra/app";
import { config } from "./config";

app.listen(config.port, () => {
	console.info(`Server Running on http://localhost:${config.port}`)
}); 