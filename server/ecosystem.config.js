module.exports = {
  apps: [
    {
      name: "Conviva Case Tracker Server",
      script: "./src/index.js",
      exec_mode: "cluster",

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      autorestart: true,
      watch: true,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],

  deploy: {
    production: {
      user: "wlavaut",
      host: "192.168.151.118",
      ref: "origin/master",
      repo:
        "https://github.com/waldothedeveloper/conviva-case-tracker-system.git",
      path: "C:conviva-case-tracker-systemserver",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production"
    }
  }
};
