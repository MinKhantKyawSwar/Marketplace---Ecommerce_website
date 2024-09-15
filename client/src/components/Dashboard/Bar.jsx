import { BarList, Card, Title, Bold, Flex, Text } from "@tremor/react";

export default ({ products }) => {
  const categoryCount = {};

  products.forEach((product) => {
    const productCategory = product.category;

    if (!categoryCount[productCategory]) {
      categoryCount[productCategory] = 0;
    }

    categoryCount[productCategory]++;
  });

  const data = Object.entries(categoryCount).map(([key, val]) => ({
    name: key.toUpperCase().replaceAll("_", " "),
    value: val,
  }));
  return (
     <Card className="mt-9 w-full">
      <h3 className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">Product Count by Category</h3>
      <p className="mt-4 text-tremor-default flex items-center justify-between text-tremor-content dark:text-dark-tremor-content">
        <span>Category</span>
        <span>Counts</span>
      </p>
      <BarList data={data} className="mt-2" />
    </Card>
  );
}