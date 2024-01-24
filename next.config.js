/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: 'devamiensfood.s3.eu-west-3.amazonaws.com'
            }
        ]
    },
    reactStrictMode: false
}

module.exports = nextConfig
