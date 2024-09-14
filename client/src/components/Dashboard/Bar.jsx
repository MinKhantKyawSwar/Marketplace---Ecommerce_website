import { BarList, Card } from '@tremor/react';
import {GifIcon} from "@heroicons/react/24/outline"
const data = [
  {
    name: 'Twitter',
    value: 456,
    icon : GifIcon
  },
  {
    name: 'Google',
    value: 351
  },
  {
    name: 'GitHub',
    value: 271,
  },
  {
    name: 'Reddit',
    value: 191,
  },
  {
    name: 'Youtube',
    value: 91
  },
];

export default () => {
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