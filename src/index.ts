import debug from 'debug';
import http from 'http';
import app from './app';
import env from './config/environment';

const logger = debug('log');
const server = http.createServer(app);

const port = env.PORT || 8000;

server.listen(port, async () => {
  logger(`Find me on http://localhost:${port}`);
});
