/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/:path((?!maintenance).+)',
            destination: '/maintenance',
            permanent: false,
          },
          {
            source: '/',
            destination: '/maintenance',
            permanent: false,
          },
        ];
    }
};

export default nextConfig;
