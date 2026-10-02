const DishDetail = async ({ params }) => {
  const { slug } = await params;
  return <div>Our dish is {slug}</div>;
};

export default DishDetail;
