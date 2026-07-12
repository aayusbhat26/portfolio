module.exports = {
  apps: [{
    name: 'portfolio',
    script: 'npm',
    args: 'start',
    cwd: '/home/ubuntu/portfolio',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/home/ubuntu/portfolio/logs/err.log',
    out_file: '/home/ubuntu/portfolio/logs/out.log',
    log_file: '/home/ubuntu/portfolio/logs/combined.log',
    time: true
  }]
};
