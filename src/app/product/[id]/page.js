import ProductDetailPage from "@/views/ProductDetailPage";

export default async function Page({ params }) {
  const { id } = await params;
  return <ProductDetailPage id={id} />;
}
