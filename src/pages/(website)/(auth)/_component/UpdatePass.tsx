// // import React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/use-toast";
// import instance from "@/config/axios";
// import { joiResolver } from "@hookform/resolvers/joi";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import Joi from "joi";
// import { useForm } from "react-hook-form";
// // import { useNavigate } from "react-router-dom"; // Nhập hook useNavigate

// const signupSchema = Joi.object({
//   password: Joi.string().min(6).required(),
//   confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
// });

// interface SignUpProps {
//   onSignUpSuccess: () => void;
// }

// //React.FC<SignUpProps> đảm bảo kiểu dữ liệu
// const UpdatePass: React.FC<SignUpProps> = ({ onSignUpSuccess }) => {
//   //   const navigate = useNavigate(); // Khởi tạo hook useNavigate
//   const form = useForm({
//     resolver: joiResolver(signupSchema),
//     defaultValues: {
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const { mutate } = useMutation({
//     mutationFn: async (formData: {
//       password: string;
//       confirmPassword: string;
//     }) => {
//       await instance.post(`/auth/signup`, formData);
//     },
//     onSuccess: (data) => {
//       toast({
//         title: "Đăng ký thành công,chuyển qua trang đăng nhập!",
//         variant: "success",
//       });
//       //   navigate("/auth-user");
//       setTimeout(() => {
//         onSignUpSuccess();
//       }, 5000);

//       return data;
//     },
//     onError: (error) => {
//       if (axios.isAxiosError(error)) {
//         // Access the response data safely
//         console.log("Error Response:", error.response?.data);
//         toast({
//           title: "Đăng ký thất bại!",
//           description: "Email đã trùng!",
//           variant: "destructive",
//         });
//         console.log(error);
//       } else {
//         // Handle non-Axios errors
//         console.error("An unexpected error occurred:", error);
//       }
//     },
//   });

//   const onSubmit = (data: {
//     name: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
//   }) => {
//     mutate(data);
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel htmlFor="name">Họ và tên:</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="Nhập họ và tên..."
//                   type="text"
//                   {...field}
//                   id="name"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel htmlFor="email">Email:</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="Nhập email..."
//                   type="email"
//                   {...field}
//                   id="email"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel htmlFor="password">Mật khẩu:</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="Nhập mật khẩu..."
//                   type="password"
//                   {...field}
//                   id="password"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="confirmPassword"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel htmlFor="confirmPassword">
//                 Xác nhận mật khẩu:
//               </FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="Nhập mật khẩu..."
//                   type="password"
//                   {...field}
//                   id="confirmPassword"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit">Đăng ký</Button>
//       </form>
//     </Form>
//   );
// };

// export default UpdatePass;
