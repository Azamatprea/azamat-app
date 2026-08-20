import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // MDX is compiled at request/build time via next-mdx-remote (pass 5),
  // so no pageExtensions changes are needed here.
};

export default nextConfig;
