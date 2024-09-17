import { AreaChart } from '@tremor/react';
import {format} from "date-fns"
import { useState } from 'react';

export default ({products}) =>  {
  const [sortedDate, setSortedDate] = useState([])
  //getting date from one week
  const currentDate = new Date();
  const lastOneWeek = new Date();
  lastOneWeek.setDate(currentDate.getDate() - 7)
  
  const productDailySale = {};

  //calc products in one week 
  products.forEach(product => {
    const productSaleDate = new Date(product.createdAt);
    // 8/10 <= last 1 week
    // 12/10 <= productSellDate
    // 13/10 <= current date

    if (productSaleDate <= currentDate && productSaleDate >= lastOneWeek){
      const formattedSaleDate =  format(new Date(productSaleDate),"dd/MM")
      if(!productDailySale[formattedSaleDate]){
        productDailySale[formattedSaleDate] = 0;
      }
        productDailySale[formattedSaleDate] +=1;
    }    
  })

  //targets
  //limit date(last 1 week)
  //filter how many products are in last 1 week per day.
  //[{date: 10/12, "Product Sale" : productCount}]
  const chartdata = Object.entries(productDailySale).map(([key, val])=> ({
    date : key,
    "Products Sale" : val
  }))

  chartdata.reverse();
  

  const valueFormatter = function (number) {
    return new Intl.NumberFormat('us').format(number).toString();
  };
  
  return (
    <section className="mt-4 w-full">
      <h3 className="text-tremor-default ">Product Sale Per Day</h3>
      <AreaChart
        className="mt-4 h-72"
        data={chartdata}
        index="date"
        yAxisWidth={65}
        categories={["Products Sale"]}
        colors={['indigo', 'cyan']}
        valueFormatter={valueFormatter}
      />
    </section>
  );
}