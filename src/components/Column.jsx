import { Stack, Typography } from "@mui/material";
import { Item } from "./Item";

export function Column({ column, index, onCardMove }) {
  return (
    <Stack width={150} gap={1} flexShrink={0}>
      <Typography variant="h6">Day {index + 1}</Typography>
      {column.map((item) => (
        <Item key={item.id} item={item} onCardMove={onCardMove} />
      ))}
    </Stack>
  );
}
