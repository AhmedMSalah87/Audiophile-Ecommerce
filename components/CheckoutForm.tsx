"use client";

import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import Cash from "@/public/Cash.svg";
import { useRouter } from "next/navigation";
import { clearCart } from "@/cartSlice";
import { Spinner } from "./ui/spinner";
import { Session } from "next-auth";

const CheckoutForm = ({ session }: { session: Session | null }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const cart = useAppSelector((state) => state.cart.cartItems);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const formSchema = z
    .object({
      name: z
        .string()
        .regex(
          /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/,
          "Enter a valid name (e.g., John Doe)"
        ),
      email: z.string().email(),
      phone: z
        .string()
        .regex(
          /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/,
          "Invalid phone number format"
        ),
      address: z.string().regex(/^\d+\s[A-Za-z\s]+$/, "Invalid address format"),
      zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid zip code format"),
      city: z
        .string()
        .regex(/^[A-Za-z\s-]+$/, "City name must contain only letters, spaces"),
      country: z
        .string()
        .regex(
          /^[A-Za-z\s]+$/,
          "Country name must contain only letters and spaces"
        ),
      payment: z.enum(["eMoney", "cash"]),
      eMoneyNumber: z.string().optional(),
      eMoneyPin: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.payment === "eMoney" && !data.eMoneyNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["eMoneyNumber"],
          message: "e-Money Number is required",
        });
      }
      if (data.payment === "eMoney" && !data.eMoneyPin) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["eMoneyPin"],
          message: "e-Money Pin is required",
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      zipCode: "",
      city: "",
      country: "",
      eMoneyNumber: "",
      eMoneyPin: "",
    },
  });

  const paymentMethod = form.watch("payment");

  const totalPrice = cart.reduce(
    (total, item) =>
      // the second parameter is item which is product object inside cart array
      total + item.price * item.quantity,
    0
  );
  const VAT = Math.round(totalPrice * 0.2);
  const shipping = 50;
  const grandPrice = totalPrice + VAT + shipping;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="large">Loading...</Spinner>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <h2>
        Your cart is empty.
        <br /> please add products to your cart
      </h2>
    );
  }

  const handleCheckoutSubmit = async (formData) => {
    setIsPending(true);
    const newOrder = {
      userId: session.user.userId,
      items: cart.map((item) => {
        return {
          productID: item.id,
          quantity: item.quantity,
          price: item.price,
        };
        // to return object for every product added in cart
      }),
      grandPrice,
      ...formData,
    };
    console.log(formData);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
      await response.json();
      setOpenDialog(true);
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="contain mx-auto mb-36">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCheckoutSubmit)}>
          <div className="w-[90%] mx-auto lg:w-full grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            <section className="bg-white p-12 rounded-md mb-8 lg:mb-0">
              <h3 className="mb-10">CHECKOUT</h3>
              <FormDescription className="uppercase font-bold mb-4">
                billing details
              </FormDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6 mb-14">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Alexei Ward"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          placeholder="alexei@mail.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="+1 202-555-0136" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormDescription className="text-primary uppercase subtitle font-bold mb-4">
                shipping info
              </FormDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6 mb-14">
                <FormField
                  //<FormField> component doesn't directly accept a className prop because it's a controller wrapper, not a presentational or layout component itself.
                  //It doesn't render any visible DOM element itself — it delegates rendering to the component you pass inside it. that is why it accept render prop
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="1137 Williams Avenue"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="10001" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} placeholder="New York" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="United States"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormDescription className="text-primary uppercase subtitle font-bold mb-4">
                payment details
              </FormDescription>
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="payment"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormItem
                            className={cn(
                              "flex gap-5 items-center border border-[#cfcfcf] rounded-md h-14 pl-4",
                              field.value === "eMoney" ? "border-primary" : ""
                            )}
                          >
                            <FormControl>
                              <RadioGroupItem value="eMoney" />
                            </FormControl>
                            <FormLabel className="text-[14px] cursor-pointer">
                              e-Money
                            </FormLabel>
                          </FormItem>
                          <FormItem
                            className={cn(
                              "flex gap-5 items-center border border-[#cfcfcf] rounded-md h-14 pl-4",
                              field.value === "cash" ? "border-primary" : ""
                            )}
                          >
                            <FormControl>
                              <RadioGroupItem value="cash" />
                            </FormControl>
                            <FormLabel className="text-[14px] cursor-pointer">
                              Cash on Delivery
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormLabel className="font-bold"></FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {paymentMethod === "eMoney" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="eMoneyNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>e-Money Number</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="238521993"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="eMoneyPin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>e-Money PIN</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} placeholder="6891" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {paymentMethod === "cash" && (
                <div className="flex gap-8">
                  <img src={Cash.src} />
                  <p className="text-muted-foreground">
                    The ‘Cash on Delivery’ option enables you to pay in cash
                    when our delivery courier arrives at your residence. Just
                    make sure your address is correct so that your order will
                    not be cancelled.
                  </p>
                </div>
              )}
            </section>
            <section className="bg-white p-8 rounded-md self-start">
              <h6 className="mb-8">summary</h6>
              <ul className="mb-8">
                {cart.map((item) => (
                  <li key={item.id} className="mb-6 flex items-center gap-4">
                    <img
                      src={item.image.desktop}
                      alt={item.name}
                      width="64px"
                      className="rounded-md"
                    />
                    <div className="mr-auto">
                      <p className="font-bold">{item.name}</p>
                      <p className="font-bold text-muted-foreground">
                        $ {item.price * item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-muted-foreground">
                      x{item.quantity}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mb-2">
                <p className="text-muted-foreground">TOTAL</p>
                <p className="font-bold">$ {totalPrice}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-muted-foreground">SHIPPING</p>
                <p className="font-bold">$ {shipping}</p>
              </div>
              <div className="flex justify-between mb-6">
                <p className="text-muted-foreground">VAT (INCLUDED)</p>
                <p className="font-bold">$ {VAT}</p>
              </div>
              <div className="flex justify-between mb-8">
                <p className="text-muted-foreground">GRAND TOTAL</p>
                <p className="font-bold text-primary">$ {grandPrice}</p>
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "CONTINUE & PAY"
                )}
              </Button>
            </section>
          </div>
        </form>
      </Form>
      <Dialog
        open={openDialog}
        onOpenChange={(isOpen) => isOpen && setOpenDialog} // prevent auto close of dialog by clicking
      >
        <DialogContent className="p-12">
          <DialogHeader className="text-left">
            <div className="size-12 bg-primary rounded-full flex items-center justify-center mb-8">
              <Check className="text-white " />
            </div>
            <DialogTitle className="mb-2 text-[2rem] font-bold">
              THANK YOU <br />
              FOR YOUR ORDER
            </DialogTitle>
            <DialogDescription className="mb-8">
              You will receive an email confirmation shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-[55%_45%] mb-12 rounded-lg overflow-hidden">
            <ul className="bg-secondary p-6">
              {cart.slice(0, 1).map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 border-b border-[#cfcfcf] pb-4"
                >
                  <img src={item.image.desktop} alt={item.name} width="50px" />
                  <div>
                    <p className="font-bold">
                      {item.name.split(" ").slice(0, -1).join(" ")}
                    </p>
                    <p className="font-bold text-muted-foreground">
                      $ {item.price * item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-muted-foreground ml-auto">
                    x{item.quantity}
                  </p>
                </li>
              ))}
              <p className="text-center text-muted-foreground subtitle font-bold mt-2">
                and {cart.length - 1} other item(s)
              </p>
            </ul>
            <div className="bg-black flex items-center pl-8 py-8 md:py-0">
              <div>
                <p className="text-muted-foreground">GRAND TOTAL</p>
                <p className="font-bold text-white">$ {grandPrice}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="w-full"
              onClick={() => {
                setIsLoading(true);
                dispatch(clearCart());
                router.push("/");
              }}
            >
              BACK TO HOME
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutForm;
