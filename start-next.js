#!/usr/bin/env node

// Temporary Next.js starter script
const { spawn } = require('child_process');

const nextProcess = spawn('npx', ['next', 'dev', '--port', '5000'], {
  stdio: 'inherit',
  cwd: process.cwd()
});

nextProcess.on('error', (err) => {
  console.error('Failed to start Next.js:', err);
  process.exit(1);
});

nextProcess.on('exit', (code) => {
  process.exit(code);
});