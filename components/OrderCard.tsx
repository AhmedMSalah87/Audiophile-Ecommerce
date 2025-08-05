"use client";

import { formatter } from "@/lib/utils";
import { Button } from "./ui/button";

export type OrderProps = {
  id: string | number;
  created_at: string;
  totalPrice: number;
  orderItems: {
    product: {
      name: string;
      image: {
        mobile: string;
        desktop: string;
        tablet: string;
      };
    };
  }[];
};

const OrderCard = ({ orders }: { orders: OrderProps[] | null }) => {
  if (!orders || orders.length === 0) return <h4>no orders placed yet</h4>;

  return orders?.map((orderItem) => (
    <div key={orderItem.id}>
      <div className="flex gap-8 bg-[#fff4e6] py-3 px-6">
        <div>
          <p>Order placed</p>
          <p>{formatter.format(new Date(orderItem.created_at))}</p>
        </div>
        <div>
          <p>Total</p>
          <p>{orderItem.totalPrice}</p>
        </div>
        <p className="ml-auto">Order ID: #{orderItem.id}</p>
      </div>
      <ul className="p-6 space-y-8">
        {orderItem.orderItems.map((item, i) => (
          <li key={`${orderItem.id}-${i}`} className="flex gap-4 items-center">
            <img
              src={item.product.image.mobile}
              width={100}
              className="rounded-md"
            />
            <div className="space-y-4">
              <p>{item.product.name}</p>
              <div className="space-x-4">
                <Button variant="outline" size="sm" className="rounded-full">
                  write a product review
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  buy it again
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ));
};

export default OrderCard;
