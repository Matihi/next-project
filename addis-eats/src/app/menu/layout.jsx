export const metadata = {
  title: "Menu",
  description: "View what we offer.",
  alternates: { canonical: "/menu" },
};

const layout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <div>{children}</div>
    </div>
  );
};

export default layout;
