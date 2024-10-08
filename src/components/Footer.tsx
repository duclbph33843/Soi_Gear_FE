// import React from "react";
// import Services from "@/pages/(website)/home/_component/Services";
import Services from "@/pages/(website)/home/_component/Services";
import { Logo } from "./icons"; // Ensure the Logo component or path is correctly imported
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Cast event.target to HTMLFormElement to access form elements
    const form = event.target as HTMLFormElement;

    // Access the email input value
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;

    // Check if the email input is found to avoid runtime errors
    if (!emailInput) {
      console.error("Email input not found.");
      return;
    }

    const email = emailInput.value;

    // Prepare form data
    const formData = new URLSearchParams();
    formData.append("entry.873095472", email);

    // Send data to the Google Form
    fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLScPO7qu7vfekGcxPL2J3hgwU7XB3QQIfKW7y0hj0rPBbzG2Cw/formResponse",
      {
        method: "POST",
        body: formData,
        mode: "no-cors", // This mode prevents you from seeing the response due to CORS restrictions
      }
    )
      .then(() => {
        alert("Đăng ký thành công! Cảm ơn bạn đã đăng ký nhận tin.");
      })
      .catch((error) => {
        console.error("Lỗi gửi dữ liệu:", error);
      });

    // Reset the form after submission
    form.reset();
  };


  return (
    <div>
      <Services />
      <footer className="bg-gray-900 text-white py-12 mt-20 h-[375px]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center md:items-start w-[1000px]">
              <a href="/" className="ml-[-70px]">
                <img src={Logo} alt="Logo" className="mb-4 w-[auto] h-[99px]" />
              </a>
              <div className="w-full lg:w-1/2 mt-8 lg:mt-0 space-y-6">
                <div className="flex items-start space-x-2">
                  <FaMapMarkerAlt className="text-indigo-500 w-6 h-6" />
                  <div>
                    <h2 className="text-12 font-semibold">Địa chỉ</h2>
                    <p>Số 1 Trịnh Văn Bô, Nam Từ Liêm, Hà Nội</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <FaPhoneAlt className="text-indigo-500 w-6 h-6" />
                  <div>
                    <h2 className="text-12 font-semibold">Số điện thoại</h2>
                    <p>0383005327</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <FaEnvelope className="text-indigo-500 w-6 h-6" />
                  <div>
                    <h2 className="text-12 font-semibold">Email</h2>
                    <p>leduc090404@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-bold mb-4 text-[18]">Liên Kết</h2>
                <ul>
                  <li className="mb-2">
                    <a href="/" className="hover:underline text-[15px]">
                      Trang chủ
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="hover:underline text-[15px]">
                      Sản phẩm
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="hover:underline text-[15px]">
                      Blog
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="hover:underline text-[15px]">
                      Liên hệ
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-bold mb-4 text-[18]">Hỗ trợ</h2>
                <ul>
                  <li className="mb-2">
                    <a href="#" className="hover:underline text-[15px]">
                      Thanh toán
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="hover:underline text-[15px]">
                      Đổi trả
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="hover:underline text-[15px]">
                      Bảo hành
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="hover:underline text-[15px]">
                      Tuyển dụng
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-lg font-bold mb-4 text-[18px]">Tin tức</h2>
              <form className="w-[322px] flex" onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  className="p-2 rounded-l-md w-full focus:outline-none text-black text-[13.5px] "
                  placeholder="Nhập email của bạn"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-md w-32 text-[13.5px]"
                >
                  Đăng kí
                </button>
              </form>
            </div>
          </div>
          {/* <p className="text-center text-gray-500 mt-8">
          &copy; 2024 Nhóm 2 React.
        </p> */}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
