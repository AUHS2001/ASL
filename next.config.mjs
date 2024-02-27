/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/apiUrl/:path*",
        destination:
          "http://sign-lab-fyp.eba-z9pwwi3e.us-east-1.elasticbeanstalk.com/:path*",// Add :path* to capture the entire path
           
      },
      
    ];
  },
  images: {
    domains: [
      "sign-lab.s3.amazonaws.com",
      "localhost",
    ],
  },
};
export default nextConfig;
