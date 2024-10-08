import { uploadFileCloudinary } from "@/common/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import instance from "@/config/axios";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
import Joi from "joi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const categorySchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Tên danh mục không được để trống",
    "string.empty": "Tên danh mục không được để trống",
  }),
  avatar: Joi.string().allow("").optional(),
});

const CategoryAdd = () => {
  const nav = useNavigate();

  const form = useForm({
    resolver: joiResolver(categorySchema),
    defaultValues: {
      name: "",
      avatar: "",
    },
  });

  const [avatar, setImage] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (category: { name: string }) => {
      const { data } = await instance.post(
        "/categories",
        category
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["CATEGORY_LIST"],
      });
      toast({
        title: "Thêm danh mục thành công",
        description: "Danh mục đã được thêm vào hệ thống",
        variant: "success",
      });
      nav("/admin");
    },
  });

  const onSubmit = (data: any) => {
    if (!avatar) {
      toast({
        title: "Vui lòng chọn ảnh cho sản phẩm",
        variant: "destructive",
      });
      return;
    }
    mutate(data);
  };

  return (
    <div className=" flex min-h-screen w-[90%]  flex-col ">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="grid flex-1  gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Tên danh mục:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tên danh mục..."
                        {...field}
                        id="name"
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="avatar"
                render={() => (
                  <FormItem>
                    <FormLabel htmlFor="avatar">Ảnh danh mục:</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        id="avatar"
                        onChange={async (e) => {
                          const files = e.target.files;
                          if (!files) return;
                          const urls = await Promise.all(
                            Array.from(files).map(uploadFileCloudinary)
                          );
                          setImage(urls[0]);
                          setImagePreview(URL.createObjectURL(files[0]));
                          form.setValue("avatar", urls[0]);
                        }}
                      ></Input>
                    </FormControl>
                    <FormMessage />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="categories"
                        className="h-40 object-contain border border-gray-200 rounded-md outline outline-offset-2 outline-gray-200"
                      />
                    )}
                  </FormItem>
                )}
              ></FormField>

              <Button>Thêm danh mục</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CategoryAdd;
