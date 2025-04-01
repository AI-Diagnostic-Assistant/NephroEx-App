/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lwybipvgkqqcuevmabdl.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  output: "standalone",
  distDir: "build",
};

module.exports = nextConfig;
