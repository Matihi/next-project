export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api",
        "/checkout",
        "/orders",
        "/cart",
        "/login",
        "/register",
      ],
    },
    sitemap: "https://next-project-59ed.vercel.app/sitemap.xml",
  };
}
