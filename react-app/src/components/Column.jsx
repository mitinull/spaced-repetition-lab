import { Stack, Typography } from "@mui/material";
import { CardSM2 } from "./CardSM2";

export function Column({ column, index, cardComponent }) {
  return (
    <Stack flexShrink={0} minWidth={80}>
      <Typography variant="overline">
        In {index + 1} {index === 0 ? "Day" : "Days"} ({column.length}
        {column.length ? (column.length === 1 ? " Card" : " Cards") : ""})
      </Typography>
      <Stack gap={1}>
        {column.map((card) => {
          const Component = cardComponent;
          return <Component key={card.id} card={card} editable={false} />;
        })}
      </Stack>
    </Stack>
  );
}
