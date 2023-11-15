const gitBranch = require('git-branch');

module.exports = async () => {
  
  const currentBranch = await gitBranch();
  const isMainBranch = currentBranch === 'main';

  const frontUrl = isMainBranch
    ? process.env.NEXT_PUBLIC_DEPLOY_FRONTEND_URL
    : process.env.NEXT_PUBLIC_FRONTEND_URL;

  const backUrl = isMainBranch
    ? process.env.NEXT_PUBLIC_DEPLOY_BACK_URL
    : process.env.NEXT_PUBLIC_BACKEND_URL;

  return {
    env: {
      NEXT_PUBLIC_FRONTEND_URL: frontUrl,
      NEXT_PUBLIC_BACKEND_URL: backUrl,
    },
  };
};
module.exports = {
  images: {
    domains: ['http2.mlstatic.com'],
  },
};