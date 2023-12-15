/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        //https://www.lightsoftwareca.com/app/corpoelec/admin/prod/api
        //R3pKSTV4UkFTdjhKZHQvOFlEVzNOSmViSmpyZHNFTUIxSzZRN0hjPQ==
        API_URL: "https://www.lightsoftwareca.com/app/corpoelec/admin/qa/api",
        APIQA_URL: "https://www.lightsoftwareca.com/app/lightpos/qa/api",
        TOKEN_PROD:"R2lGYjd3RkxTK3dSYmR6dlFCeTBKTy9oWHMveFNZbVozVkF4",
        TOKEN_QA:"R2lGYjd3RkxTK3dSYmR6dlFCeTBKTy9oWHMveFNZbVozVkF4",
        NOT_IMAGE: "/imagenNoDisponible.png"
    },
    images: {
      domains: ['www.lightsoftwareca.com','detallesorballo.com'],
    },
    experimental: {
        appDir: true,
        serverActions: true
    },
  };
  
  module.exports = nextConfig;