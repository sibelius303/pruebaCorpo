/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DB_URI: "mongodb://localhost:27017/ecommercev1",
        API_URL: "http://localhost:3000/api",
        LINK_WHATSAPP: "https://wa.me/00000"
    },
    images: {
        // remotePatterns: [{ protocol: "https:", hostname: "**" }],
        domains: ["localhost", "fastly.picsum.photos", "picsum.photos", "tailwindui.com", "detallesorballo.com"],
    },
    experimental: {
        serverActions: true,
    }
}

module.exports = nextConfig
