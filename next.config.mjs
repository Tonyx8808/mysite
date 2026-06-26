/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    '172.23.144.1',
    'localhost',
    '127.0.0.1',
  ],
}

export default nextConfig