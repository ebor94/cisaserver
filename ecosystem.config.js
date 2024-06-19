module.exports = {
    apps: [
      {
        name: 'server-api-cisa',
        script: 'cisa-server.js',
        watch: true,
        ignore_watch: ['node_modules', 'logs'],
        watch_options: {
          followSymlinks: false,
          usePolling: true,
        },
      },
    ],
  };