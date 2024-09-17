import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { useParams } from "react-router-dom";
import ProductList from "../../_component/ProductList";
import Banner from "@/pages/(website)/home/_component/Banner";
import Filter from "../../_component/Filter";
import instance from "@/config/axios";
import Test from "@/pages/test/test";

const CategoryDetail = () => {
    const { id } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ["CATEGORY_DETAIL", id],
        queryFn: async () => {
            const { data } = await instance.get(
              `/categories/${id}`
            );
            return data;
        },
    });
    if (isLoading) return <div>Loading...</div>;
    return (
      <>
        <Test/>
        <Banner />
        <Filter />
        <section className="news">
          <div className="container-3">
            <div className="container">
              <div className="section-heading">
                <h2 className="section-heading__title">{data.category.name}</h2>
              </div>
              <ProductList data={data.product} />
            </div>
          </div>
        </section>

        <style>{`

      .container-3{
        width: 1195px;
        min-height: 450px;
        height: auto;
        background-color: #FFFFFF;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
        margin-left: 162px;
        margin-top: 44px;
        border-radius: 10px;
      }
      `}</style>
      </>
    );
};

export default CategoryDetail;
