import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Loading from "../Loading";
import HandleDisclosure from "../../components/utils/HandleDisclosure";
import Sorting from "../Sorting";

const ShowAllProducts = React.memo(({ children }) => {
  const state = useContext(GlobalState);
  const [products] = state.productApi.products;

  return (
    <>
      <div className="container mx-auto grid grid-cols-4 gap-5">
        <div className="col-span-1 ">
          <h1 className="bg-green p-1 text-center text-white">Danh muc</h1>
          <div>
            <HandleDisclosure />
          </div>

          <div>
            <div className="">
              <h1 className="uppercase font-medium">Thuong Hieu</h1>
              <div className="inline-block mt-1">
                <input type="text" className="border border-gray" />
                <button className="bg-green text-white p-[2px]">Search</button>
              </div>

              <div></div>
            </div>
          </div>
        </div>

        {/* Hien thi san pham  */}
        <div className="col-span-3">
          <div>
            {/* Tieu de san pham */}
            <h1>Tieu de</h1>

            {/* Sort... */}
            <Sorting />
          </div>

          <div>{children}</div>
        </div>
      </div>

      {/* {products.length === 0 && <Loading />} */}
    </>
  );
});

export default ShowAllProducts;
