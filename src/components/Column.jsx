import { Stack, Typography } from "@mui/material";
import { CardItem } from "./CardItem";

export function Column({ column, index }) {
  return (
    <Stack flexShrink={0} minWidth={80}>
      <Typography variant="overline">
        In {index + 1} {index === 0 ? "Day" : "Days"} ({column.length}
        {column.length ? (column.length === 1 ? " Card" : " Cards") : ""})
      </Typography>
      <Stack gap={1}>
        {column.map((item) => (
          <CardItem key={item.id} item={item} active={false} />
        ))}
      </Stack>
    </Stack>
  );
}
