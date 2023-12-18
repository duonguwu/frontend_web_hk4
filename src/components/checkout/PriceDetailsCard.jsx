const PriceDetailsCard = ({
  totalItems,
  actualPriceOfCart,
  totalPriceOfCartProducts,
}) => {
  const summaryData = [
    { label: "Số lượng sản phẩm", value: totalItems },
    {
      label: "Tổng tiền",
      value: `${actualPriceOfCart}VNĐ`,
    },
    {
      label: "Giảm giá",
      value: `-${actualPriceOfCart - totalPriceOfCartProducts}VNĐ`,
    },
    {
      label: "Phí vận chuyển",
      value: "Miễn phí",
    },
  ];

  return summaryData.map(({ label, value }) => (
    <div key={label} className=" flex justify-between items-center p-0 ">
      <p className=" text-gray-600">{label}</p>
      <p className="text-lg">{value}</p>
    </div>
  ));
};
export default PriceDetailsCard;
