import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '5000', 10);

// Initialize Next.js
const app = next({ dev });
const handle = app.getRequestHandler();

// Handle uncaught exceptions - completely silence WebSocket frame errors
process.on('uncaughtException', (error: Error & { code?: string }) => {
  // Completely ignore WebSocket frame errors - they're harmless network noise
  if (error.code === 'WS_ERR_INVALID_UTF8' || 
      error.code === 'WS_ERR_INVALID_CLOSE_CODE' ||
      error.code === 'WS_ERR_INVALID_OPCODE' ||
      error.message?.includes('Invalid WebSocket frame') ||
      error.message?.includes('WebSocket frame')) {
    return;
  }
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
    
    // Set up WebSocket server for real-time messaging
    const wss = new WebSocketServer({ 
      server,
      perMessageDeflate: false,
      maxPayload: 64 * 1024, // 64KB
      skipUTF8Validation: true, // Skip UTF-8 validation to handle corrupted frames
      clientTracking: true
    });
    
    // Handle WebSocket server errors
    wss.on('error', (error) => {
      console.error('WebSocket Server error:', error);
    });
    
    wss.on('connection', (ws, req) => {
      console.log('Client connected');
      
      // Add error handling for the connection itself
      ws.on('error', (error: Error & { code?: string }) => {
        // Silently handle WebSocket frame errors to prevent crashes
        if (error.code === 'WS_ERR_INVALID_UTF8' || 
            error.code === 'WS_ERR_INVALID_CLOSE_CODE' ||
            error.message?.includes('Invalid WebSocket frame')) {
          // Don't log these errors as they're common with network issues
          return;
        }
        console.error('WebSocket connection error:', error);
      });
      
      // Set up ping/pong to keep connection alive
      const pingInterval = setInterval(() => {
        if (ws.readyState === ws.OPEN) {
          try {
            ws.ping();
          } catch (pingError) {
            // Ignore ping errors and clean up
            clearInterval(pingInterval);
          }
        } else {
          clearInterval(pingInterval);
        }
      }, 30000);
      
      ws.on('message', (message) => {
        try {
          // Validate message exists and is a Buffer
          if (!message || !Buffer.isBuffer(message)) {
            return;
          }
          
          let messageStr;
          try {
            // More robust UTF-8 conversion with fallback
            messageStr = message.toString('utf8');
            
            // Check if the string contains null bytes or other invalid characters
            if (messageStr.includes('\0') || messageStr.length === 0) {
              return;
            }
          } catch (utf8Error) {
            // Try latin1 as fallback for corrupted UTF-8
            try {
              messageStr = message.toString('latin1');
              if (!messageStr || messageStr.length === 0) {
                return;
              }
            } catch (fallbackError) {
              return;
            }
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
                // Remove problematic connections
                try {
                  client.terminate();
                } catch (terminateError) {
                  // Ignore termination errors
                }
              }
            }
          });
        } catch (error) {
          // Silently ignore message processing errors
        }
      });
      
      ws.on('close', (code, reason) => {
        clearInterval(pingInterval);
        // Only log valid close codes to avoid spam
        if (code >= 1000 && code <= 1015) {
          console.log(`Client disconnected: ${code}`);
        }
      });
      
      ws.on('pong', () => {
        // Connection is alive - no action needed
      });
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