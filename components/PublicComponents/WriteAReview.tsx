"use client";
import React, { FC, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "sonner";
import { Rating } from "@smastrom/react-rating";
import { Textarea } from "../ui/textarea";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../../graphql/mutaions/createReview";
import MainLoading from "../ui/mainLoading";

type Props = {
  id: any;
};

const WriteAReview: FC<Props> = ({ id }) => {
  const [createReview, { loading }] = useMutation(CREATE_REVIEW);

  const [rating, setRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const tHomeProducts = useTranslations("HomeProducts");

  const defaultValues = {
    rating: 0,
    name: "",
    message: "",
  };

  const rateSchema = z.object({
    rating: z.number().min(1, { message: `${tHomeProducts("rateValid")}` }),
    name: z
      .string()
      .min(3, { message: `${tHomeProducts("nameValid1")}` })
      .max(50, {
        message: `${tHomeProducts("nameValid2")}`,
      }),
    message: z
      .string()
      .min(3, { message: `${tHomeProducts("msgValid1")}` })
      .max(250, {
        message: `${tHomeProducts("msgValid2")}`,
      }),
  });

  type RateValues = z.infer<typeof rateSchema>;

  const form = useForm<RateValues>({
    resolver: zodResolver(rateSchema),
    defaultValues,
  });

  const handleSubClick = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data: RateValues) => {
    try {
      const reviewData = {
        productId: id,
        rating: data.rating,
        name: data.name,
        message: data.message,
      };
      await createReview({
        variables: reviewData,
      });
      form.reset();
      toast.success(`${tHomeProducts("msgSucess")}`);
      handleSubClick();
    } catch (error: any) {
      toast.error(`${tHomeProducts("msgError")}`);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="mb-3 rounded-full mx-auto flex justify-center items-center gap-2">
            <Star size={18} />
            {tHomeProducts("writeARev")}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px] !rounded-3xl max-w-[360px] mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center gap-2">
              <Star size={18} />
              {tHomeProducts("writeARev")}
              <Star size={18} />
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="flex flex-col justify-center mx-auto items-center gap-4">
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormItem>
                      <FormControl>
                        <Rating
                          style={{ maxWidth: 240 }}
                          value={value}
                          isRequired
                          onChange={onChange}
                          visibleLabelId="rating_label"
                          onBlur={onBlur}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{tHomeProducts("inputName")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`${tHomeProducts("inputName")}`}
                          {...field}
                          style={{ width: 320 }}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{tHomeProducts("inputMsg")}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={`${tHomeProducts("inputPlaceHolder")}`}
                          className="resize-none"
                          {...field}
                          disabled={loading}
                          style={{ width: 320 }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <br />
              </div>
              <DialogFooter className="">
                <Button
                  type="submit"
                  className="flex justify-center items-center mx-auto"
                  disabled={loading}
                >
                  {loading ? <MainLoading /> : `${tHomeProducts("sendRevBtn")}`}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WriteAReview;
