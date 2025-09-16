import { Stack, Typography } from "@mui/material";
import { CardItem } from "./CardItem";

export function CardsForToday({ cards, onCardMove }) {
  return (
    <Stack>
      <Stack>
        <Typography variant="overline">
          Cards For Today ({cards.length}{" "}
          {cards.length === 1 ? "Card" : "Cards"})
        </Typography>
      </Stack>
      <Stack direction="row" gap={1}>
        {cards.map((card) => (
          <CardItem
            key={card.id}
            item={card}
            active={true}
            onCardMove={onCardMove}
          />
        ))}
      </Stack>
    </Stack>
  );
}
