import "dotenv/config";
import { App } from "./configs/app";
import connectToDatabase from "./database/connection";

const PORT = process.env.PORT;

async function start() {
  await connectToDatabase();

  const appInstance = new App();

  appInstance.app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

start();
