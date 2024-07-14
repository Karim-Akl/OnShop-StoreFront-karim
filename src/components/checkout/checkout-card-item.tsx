import { Item } from "@contexts/cart/cart.utils";
import { generateCartItemName } from "@utils/generate-cart-item-name";
import usePrice from "@framework/product/use-price";
import { CURRENCY_CODE } from "@utils/constants";

export const CheckoutItem: React.FC<{ item: Item }> = ({ item }) => {
  const { price } = usePrice({
    amount: item?.itemTotal | 0,
    currencyCode: CURRENCY_CODE,
  });
  return (
    <div className="flex py-4 items-center lg:px-3 border-b border-gray-300">
      <div className="flex border rounded-md border-gray-300 w-16 h-16 flex-shrink-0">
        <img
          src={
            item?.item?.media[0]?.original_url ??
            "/assets/placeholder/cart-item.svg"
          }
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.preventDefault();
            e.currentTarget.src = "/assets/placeholder/cart-item.svg";
          }}
          width="64"
          height="64"
          className="object-cover"
        />
      </div>
      <h6 className="text-sm ltr:pl-3 rtl:pr-3 font-regular text-heading">
        {item?.quantity ? item?.quantity : 0} X{" "}
        {generateCartItemName(item?.name, item?.attributes)}
      </h6>
      <div className="flex ltr:ml-auto rtl:mr-auto text-heading text-sm ltr:pl-2 rtl:pr-2 flex-shrink-0">
        {/* {price} */}
        {Number(item?.price).toFixed(3)}
      </div>
    </div>
  );
};
