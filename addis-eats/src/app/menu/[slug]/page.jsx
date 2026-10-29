import { notFound } from "next/navigation";
import getDishes from "@/services/dishes";
import Image from "next/image";
import CardButtons from "@/components/dishes/CardButtons";

const url = "https://addis-eats-backend.onrender.com/menu/";

export async function generateStaticParams() {
  const dishes = await getDishes(url);

  return dishes.map((dish) => ({ slug: dish.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dishes = await getDishes(url);

  const dish = dishes.find((dish) => dish.slug === slug);
  if (!dish) {
    return { title: "Dish not found" };
  }

  return {
    title: dish.nameEn,
    description: `${dish.nameEn} — ${dish.priceETB} ETB.`,
    alternates: { canonical: `/menu/${dish.slug}` },
    openGraph: {
      title: dish.nameEn,
      description: `${dish.nameEn} — ${dish.priceETB} ETB.`,
      type: "website",
    },
  };
}

const DishDetail = async ({ params }) => {
  const { slug } = await params;
  const dishes = await getDishes(url);

  const dish = dishes.find((dish) => dish.slug === slug);
  if (!dish) {
    notFound();
  }

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "Dish",
    name: dish.nameEn,
    offers: { "@type": "Offer", price: dish.priceETB, priceCurrency: "ETB" },
  };

  return (
    <section className="p-3">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className=" relative h-80 w-80 overflow-hidden rounded-xl ">
        <Image
          className="object-cover "
          src={`/images/${slug}.png`}
          alt={slug}
          fill={true}
          priority={true}
          sizes="50vw"
        />
      </div>
      <div className="w-[65%] sm:w-[30%]  lg:w-[20%]">
        <CardButtons
          id={dish.id}
          price={dish.priceETB}
          nameEn={dish.nameEn}
          nameAm={dish.nameAm}
          description={dish.description}
          image={`/images/${slug}.png`}
        />
      </div>
    </section>
  );
};

export default DishDetail;
