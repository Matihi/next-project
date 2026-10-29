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
    sitemap: "http://localhost:3000/sitemap.xml",
  };
}
