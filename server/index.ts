import { createServer } from 'http';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '5000', 10);

// Initialize Next.js
const app = next({ dev });
const handle = app.getRequestHandler();

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

async function startServer() {
  try {
    await app.prepare();
    
    const server = createServer(async (req, res) => {
      try {
        // Health check endpoint
        if (req.url === '/api/health') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
          return;
        }
        
        // Handle all other requests with Next.js
        await handle(req, res);
      } catch (err) {
        console.error('Error handling request:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });
    
    // WebSocket server temporarily disabled due to frame corruption issues in Replit environment
    // The app works fine without real-time messaging for now
    console.log('WebSocket server disabled - using polling for real-time updates');
    
    server.listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
    
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();