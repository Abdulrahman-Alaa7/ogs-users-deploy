import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: `${process.env.NEXT_PUBLIC_HOST_NAME}`,
        port: "7000",
        pathname: "/*/**",
      },
      {
        protocol: "http",
        hostname: `${process.env.NEXT_PUBLIC_HOST_NAME}`,
        port: "7000",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_HOST_NAME}`,
        port: "",
        pathname: "/*/**",
      },
      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_HOST_NAME}`,
        port: "",
        pathname: "/*",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
