import { AreaChart } from '@tremor/react';

const chartdata = [
  {
    date: 'Jan 22',
"Products Sell Rate": 2890
  },
  {
    date: 'Feb 22',
"Products Sell Rate": 2756
  },
  {
    date: 'Mar 22',
"Products Sell Rate": 3322
  },
  {
    date: 'Apr 22',
"Products Sell Rate": 3470
  },
  {
    date: 'May 22',
"Products Sell Rate": 3475
  },
  {
    date: 'Jun 22',
"Products Sell Rate": 3129
  },
  {
    date: 'Jul 22',
"Products Sell Rate": 3490
  },
  {
    date: 'Aug 22',
"Products Sell Rate": 2903
  },
  {
    date: 'Sep 22',
"Products Sell Rate": 2643
  },
  {
    date: 'Oct 22',
"Products Sell Rate": 2837
  },
  {
    date: 'Nov 22',
"Products Sell Rate": 2954
  },
  {
    date: 'Dec 22',
"Products Sell Rate": 3239
  },
];

const valueFormatter = function (number) {
  return new Intl.NumberFormat('us').format(number).toString() + " MMK";
};

export default () =>  {
  return (
    <section className="mt-4 w-full">
      <h3 className="text-tremor-default ">Product Sell Rates Per Day</h3>
      <AreaChart
        className="mt-4 h-72"
        data={chartdata}
        index="date"
        yAxisWidth={65}
        categories={["Products Sell Rate"]}
        colors={['indigo', 'cyan']}
        valueFormatter={valueFormatter}
      />
    </section>
  );
}