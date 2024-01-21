/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/apiUrl/:path*",
        destination:
          "http://ai-sign-env.eba-z9pwwi3e.us-east-1.elasticbeanstalk.com/:path*", // Add :path* to capture the entire path
      },
    ];
  },
  
};
export default nextConfig;
