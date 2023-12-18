const PriceDetailsCard = ({
  totalItems,
  actualPriceOfCart,
  totalPriceOfCartProducts,
}) => {
  const summaryData = [
    { label: "Số lượng sản phẩm", value: totalItems },
    {
      label: "Tổng tiền",
      value: actualPriceOfCart,
    },
    {
      label: "Giảm giá",
      value: -(actualPriceOfCart - totalPriceOfCartProducts),
    },
    {
      label: "Phí vận chuyển",
      value: "Miễn phí",
    },
  ];

  return summaryData.map(({ label, value }) => (
    <div key={label} className=" flex justify-between items-center p-0 ">
      <p className=" text-gray-600">{label}</p>
      {typeof value === "string" ? (
        <p className="text-lg">{value}</p>
      ) : (
        <p className=" text-gray-600">
          {" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(value)}
        </p>
      )}
    </div>
  ));
};
export default PriceDetailsCard;
