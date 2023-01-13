import { app } from "./server";
import { config } from "./config";

const port = config.APP_PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
