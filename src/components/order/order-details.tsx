import usePrice from "@framework/product/use-price";
import { Order, OrderItem } from "@framework/types";
import { CURRENCY_CODE } from "@utils/constants";
import { useTranslation } from "next-i18next";
import { OrderResponse } from "src/types/Checkout";
const OrderItemCard = ({ product }: { product: OrderItem }) => {
  const { price: itemTotal } = usePrice({
    amount: product.price * product.quantity,
    currencyCode: CURRENCY_CODE,
  });
  return (
    <tr
      className="font-normal border-b border-gray-300 last:border-b-0"
      key={product.id}
    >
      <td className="p-4">
        {product.name} * {product.quantity}
      </td>
      <td className="p-4">{itemTotal}</td>
    </tr>
  );
};
const OrderDetails: React.FC<{ className?: string; data: OrderResponse }> = ({
  className = "pt-10 lg:pt-12",
  data,
}) => {
  // const {
  //   query: { id },
  // } = useRouter();
  const { t } = useTranslation("common");
  // const { data: order, isLoading } = useOrderQuery(id?.toString()!);
  const order: Order = {
    customer: {
      email: data?.customer.email,
      id: data?.customer.id,
    },
    id: data?.id,
    name: data?.customer.name,
    payment_gateway: "COD",
    products: data?.items.map((i) => {
      return {
        id: i.id,
        name: i.product.name,
        price: i.unit_price,
        quantity: i.qty,
      };
    }),

    shipping_fee: data?.shipping_price,
    slug: "",
    total: data?.total_price,
    tracking_number: data?.id + "",
    created_at: data?.created_at,
  };
  const isLoading = false;

  const { price: subtotal } = usePrice(
    order && {
      amount: order.total * 1,
      currencyCode: CURRENCY_CODE,
    }
  );
  const { price: total } = usePrice(
    order && {
      amount: order.shipping_fee
        ? order.total * 1 + order.shipping_fee * 1
        : order.total,
      currencyCode: CURRENCY_CODE,
    }
  );
  const { price: shipping } = usePrice(
    order && {
      amount: order.shipping_fee * 1,
      currencyCode: CURRENCY_CODE,
    }
  );
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className={className}>
      <h2 className="mb-6 text-lg font-bold md:text-xl xl:text-2xl text-heading xl:mb-8">
        {t("text-order-details")}:
      </h2>
      <table className="w-full text-sm font-semibold text-heading lg:text-base">
        <thead>
          <tr>
            <th className="w-1/2 p-4 bg-gray-150 ltr:text-left rtl:text-right ltr:first:rounded-tl-md rtl:first:rounded-tr-md">
              {t("text-product")}
            </th>
            <th className="w-1/2 p-4 bg-gray-150 ltr:text-left rtl:text-right ltr:last:rounded-tr-md rtl:last:rounded-tl-md">
              {t("text-total")}
            </th>
          </tr>
        </thead>
        <tbody>
          {order?.products?.map((product, index) => (
            <OrderItemCard key={index} product={product} />
          ))}
        </tbody>
        <tfoot>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-sub-total")}:</td>
            <td className="p-4">{subtotal}</td>
          </tr>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-shipping")}:</td>
            <td className="p-4">
              {shipping}
              <span className="text-[13px] font-normal ltr:pl-1.5 rtl:pr-1.5 inline-block">
                via Flat rate
              </span>
            </td>
          </tr>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-payment-method")}:</td>
            <td className="p-4">{order?.payment_gateway}</td>
          </tr>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-total")}:</td>
            <td className="p-4">{total}</td>
          </tr>
          {/* <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{t("text-note")}:</td>
            <td className="p-4">no order notes </td>
          </tr> */}
        </tfoot>
      </table>
    </div>
  );
};

export default OrderDetails;
