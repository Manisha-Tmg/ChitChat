import "dotenv/config";
import { App } from "./configs/app";
import connectToDatabase from "./database/connection";

const PORT = process.env.PORT || 10000;

async function start() {
  await connectToDatabase();

  const appInstance = new App();

  appInstance.server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

start();
