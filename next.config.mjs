/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "www.shareicon.net"
            }
        ]
    }
};

export default nextConfig;
