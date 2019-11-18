module.exports = {
  apps: [
    {
      name: "Conviva Case Tracker Server",
      script: "./src/index.js",
      instances: "max",
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
      host: "localhost:4000",
      ref: "origin/master",
      repo:
        "https://github.com/waldothedeveloper/conviva-case-tracker-system.git",
      path: "C:/conviva-case-tracker-system/server",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production"
    }
  }
};
