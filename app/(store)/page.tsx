import BannerComponent from "./components/BannerComponent";
import FeatureProductsComponent from "./components/FeatureProductsComponent";
import ProductListComponent from "./components/ProductListComponent";

export default async function Home() {
  return (
    <div className="flex w-full flex-col gap-2 p-2 md:gap-4 md:p-4">
      <BannerComponent />
      <FeatureProductsComponent />
      <ProductListComponent />
    </div>
  );
}
