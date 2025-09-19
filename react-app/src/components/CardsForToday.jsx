import { Stack, Typography } from "@mui/material";

export function CardsForToday({ cards, cardComponent }) {
  return (
    <Stack>
      <Stack>
        <Typography variant="overline">
          Cards For Today ({cards.length}{" "}
          {cards.length === 1 ? "Card" : "Cards"})
        </Typography>
      </Stack>
      <Stack direction="row" gap={1}>
        {cards.map((card) => {
          const Component = cardComponent;
          return <Component key={card.id} card={card} editable={true} />;
        })}
      </Stack>
    </Stack>
  );
}
