const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    '192.168.1.6',
    '172.23.144.1',
    'localhost',
    '127.0.0.1',
  ],
}

export default nextConfig