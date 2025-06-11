import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '5000', 10);

// Initialize Next.js
const app = next({ dev });
const handle = app.getRequestHandler();

// Handle uncaught exceptions
process.on('uncaughtException', (error: any) => {
  console.error('Uncaught Exception:', error);
  // Don't exit the process for WebSocket errors
  if (error.code === 'WS_ERR_INVALID_UTF8' || 
      error.code === 'WS_ERR_INVALID_CLOSE_CODE' ||
      error.message?.includes('Invalid WebSocket frame')) {
    console.log('WebSocket frame error handled, continuing...');
    return;
  }
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
    
    // Set up WebSocket server for real-time messaging
    const wss = new WebSocketServer({ 
      server,
      perMessageDeflate: false,
      maxPayload: 64 * 1024 // 64KB
    });
    
    wss.on('connection', (ws, req) => {
      console.log('Client connected');
      
      // Set up ping/pong to keep connection alive
      const pingInterval = setInterval(() => {
        if (ws.readyState === ws.OPEN) {
          ws.ping();
        }
      }, 30000);
      
      ws.on('message', (message) => {
        try {
          // Validate message exists
          if (!message) {
            return;
          }
          
          let messageStr;
          try {
            messageStr = message.toString('utf8');
          } catch (utf8Error) {
            console.log('Invalid UTF-8 message received, ignoring');
            return;
          }
          
          // Validate message has content
          if (!messageStr || messageStr.length === 0) {
            return;
          }
          
          // Validate JSON
          const data = JSON.parse(messageStr);
          
          // Basic validation of message structure
          if (typeof data !== 'object' || data === null) {
            return;
          }
          
          // Broadcast message to all connected clients
          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === client.OPEN) {
              try {
                client.send(JSON.stringify(data));
              } catch (sendError) {
                console.log('Error sending to client, removing connection');
                client.terminate();
              }
            }
          });
        } catch (error) {
          console.log('Message processing error, ignoring invalid message');
        }
      });
      
      ws.on('close', (code, reason) => {
        clearInterval(pingInterval);
        // Only log clean disconnections to avoid spam
        if (code === 1000 || code === 1001) {
          console.log(`Client disconnected cleanly: ${code}`);
        }
      });
      
      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        clearInterval(pingInterval);
      });
      
      ws.on('pong', () => {
        // Connection is alive
      });
    });
    
    wss.on('error', (error) => {
      console.error('WebSocket Server error:', error);
    });
    
    server.listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
    
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();