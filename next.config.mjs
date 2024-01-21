/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: "connect-src 'self' http://ai-sign-env.eba-z9pwwi3e.us-east-1.elasticbeanstalk.com;",
            },
          ],
        },
      ];
    },
  };

export default nextConfig;
  