/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Instagram and Facebook media is served from Meta's CDNs (used by the
    // /social feed). Keep in sync with isOptimisableImage in lib/social.ts.
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
      { protocol: "https", hostname: "**.fbsbx.com" },
    ],
  },
};

export default nextConfig;
