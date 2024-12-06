/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
      // Example: Add custom Webpack rule for handling HTML files
      if (!isServer) {
        // Ignore the 'fs' module on the client-side to prevent Webpack errors
        config.resolve.fallback = {
          fs: false,
        };
      }
  
      config.module.rules.push({
        test: /\.html$/,
        use: 'html-loader',
      });
  
      // You can add more custom rules here if necessary for other assets (e.g., CSS, images, etc.)
  
      return config;
    },
  };
  
  export default nextConfig;
  