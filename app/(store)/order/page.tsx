import BannerComponent from "@/app/components/BannerComponent";
import { auth } from "@/auth";
import AuthComponent from "./components/AuthComponent";
import ContentComponent from "./components/ContentComponent";
import { getOrders } from "@/app/admin/lib/actions/orderActions";

export default async function Order() {
  const session = await auth();

  if (!session?.user.email) {
    return <AuthComponent />;
  }
  const orders = await getOrders(session?.user.email);

  return (
    <div className="flex w-full flex-col gap-2 overflow-hidden p-2 md:gap-4 md:p-4">
      <BannerComponent title="MY ORDERS" subtitle="Here you can see your orders" />
      <section className="flex w-full flex-col gap-4 rounded-[24px] bg-[#eaedf6] p-2 font-inter md:p-4">
        <div className="flex w-full flex-col gap-4 rounded-[16px] bg-white p-4 md:gap-10 md:p-10 xl:px-20 xl:py-16">
          {/* Orders Title */}
          <div className="flex w-full items-end justify-between gap-1 border-b-[1px] border-[#e5e8f0] pb-8 md:gap-3 md:pb-10">
            <div className="flex flex-col gap-2">
              <h4 className="text-[34px] font-bold leading-[1.2em] tracking-[-0.04em] text-textDark md:text-[56px] md:leading-[60px]">
                Order Items
              </h4>
              <p className="text-[16px] font-normal leading-[1.2em] text-[#70758c] md:leading-[24px]">
                Your total purchase is:{" "}
                <span className="font-bold">
                  ${orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0).toFixed(2)}
                </span>
              </p>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <h4 className="text-[16px] font-bold leading-[1.2em] text-[#888d9f] md:text-[30px] md:leading-[40px]">
                {orders.length} Orders
              </h4>
            </div>
          </div>

          {/* Orders Items */}
          <ContentComponent orders={orders} />
        </div>
      </section>
    </div>
  );
}
