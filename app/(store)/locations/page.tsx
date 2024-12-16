import BannerComponent from "@/app/components/BannerComponent";
import LocationComponents from "./components/LocationsComponent";

export default function Locations() {
  return (
    <div className="flex w-full flex-col gap-2 p-2 md:gap-4 md:p-4">
      <BannerComponent title="FIND US" subtitle="Come over, you won’t regret it!" />
      <LocationComponents/>
    </div>
  );
}
