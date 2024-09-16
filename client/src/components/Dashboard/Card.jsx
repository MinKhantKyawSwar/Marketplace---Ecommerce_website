import { Badge, Card, Metric, Text, Flex } from '@tremor/react';

export default ({title, count, icon, note}) =>{
  return (
    <Card
      className="max-w-full rounded-lg mt-2"
      decoration="top"
      decorationColor="blue"
    >
      <Flex justifyContent='between' alignItems='center'>
      <Text>{title}</Text>
      <Badge
          icon={icon}
        >
          {note}
        </Badge>
        </Flex>
      <Metric>{count}</Metric>
    </Card>
  );
}