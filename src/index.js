
import CubejsServerCore from '@cubejs-backend/server-core';
import app from './app';
import db from './db';

/**
 * Bootstrap the application. Start express.
 */

(async () => {
  try {
    // =======================
    // DB connection
    // =======================
    // await db.connect();
    
    // =======================
    // Configuration
    // =======================
    const PORT = process.env.PORT || 3000;

    // =======================
    // Start the server
    // =======================
    app.listen(PORT, (err) => {
      if (err) {
        console.error('Fatal error during server start: ');
        console.error(e.stack || e);
      }
      console.log(`🚀 Cube.js server (${CubejsServerCore.version()}) is listening on ${PORT}`);
    });

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

