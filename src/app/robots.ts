export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://vbet-goodfriends.vercel.app/sitemap.xml",
  };
}
