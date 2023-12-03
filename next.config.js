/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 클라우디너리 도메인 추가
    // 유저 이미지 도메인 추가
    domains: ['res.cloudinary.com', 'via.placeholder.com'],
  },
};

module.exports = nextConfig;
