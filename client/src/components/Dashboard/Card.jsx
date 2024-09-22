import { Badge, Card, Metric, Text, Flex } from '@tremor/react';

export default ({title, count, icon, note}) =>{
  return (
    <Card
      className=" rounded-lg mt-2 cursor-pointer"
      decoration="top"
      decorationColor="blue"
    >
      <Flex justifyContent='between' alignItems='center'>
      <Text className='text-xs'>{title}</Text>
      <Badge
          icon={icon}
          className='text-xs'
        >
          {note}
        </Badge>
        </Flex>
      <Metric>{count}</Metric>
    </Card>
  );
}