import moment from "moment";
import { message } from "antd";
import { deleteProduct } from "../../apicalls/product";
const Products = ({
  products,
  setActiveTabKey,
  setEditMode,
  setEditProductId,
  getProducts,
  setManageTabKey
}) => {
  const editHandler = (product_id) => {
    setEditMode(true);
    setActiveTabKey("2");
    setEditProductId(product_id);
    setManageTabKey("1")
  };

  const uploadHandler = (product_id) => {
    setEditMode(true);
    setActiveTabKey("2");
    setEditProductId(product_id);
    setManageTabKey("2")
  };

  const deleteHandler = async (product_id) => {
    try {
      const response = await deleteProduct(product_id);
      if (response.isSuccess) {
        message.success(response.message);
        getProducts();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <section>
      <h1 className=" text-3xl font-semibold my-2">Products List</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center ">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Sell Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.length > 0 ? (
              <>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="odd:bg-white even:bg-gray-50  border-b "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {product.name}
                    </th>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">
                      {moment(product.createdAt).format("L")}
                    </td>
                    <td className="px-6 py-4">
                    {product.status === "pending" && (
                      <span className="bg-orange-400 text-xs p-1 rounded-md text-white">
                        {product.status}
                      </span>
                    ) }
                    {product.status === "approved" && 
                     (
                      <span className="bg-green-400 text-xs p-1 rounded-md text-white">
                        {product.status}
                      </span>
                    )}
                    {product.status === "rejected" && 
                     (
                      <span className="bg-red-600 text-xs p-1 rounded-md text-white">
                        {product.status}
                      </span>
                    )}
                  </td>
                    <td className="px-6 py-4 text-center flex flex-row items-center">
                      <button
                        type="button"
                        className="font-medium text-green-600 me-4 hover:underline"
                        onClick={() => uploadHandler(product._id)}
                      >
                        Upload
                      </button>
                      <button
                        type="button"
                        className="font-medium text-blue-600 me-4 hover:underline"
                        onClick={() => editHandler(product._id)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="font-medium text-red-600 hover:underline"
                        onClick={() => deleteHandler(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <p>No available products to show.</p>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Products;
