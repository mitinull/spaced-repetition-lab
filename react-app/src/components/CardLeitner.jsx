import { Check, Close, Loop } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export function CardLeitner({ card, onCardMove, editable }) {
  const [newBox, setNewBox] = useState("");
  const [newInterval, setNewInterval] = useState("");

  const handleSubmit = () => {
    onCardMove({
      id: card.id,
      reviewStatus: {
        ...card.reviewStatus,
        leitner: {
          box: +newBox,
          reviewDay: +newInterval,
          lastInterval: +newInterval,
        },
      },
    });
  };

  function handleLeitner(quality) {
    if (quality === 0) {
      setNewBox(0);
      setNewInterval(1);
    }

    if (quality === 1) {
      setNewBox(card.reviewStatus.leitner.box + 1);
      setNewInterval(2 ** card.reviewStatus.leitner.box);
    }
  }

  return (
    <Paper sx={{ p: 1, minWidth: 100 }}>
      {!editable ? (
        <CardInfoLeitner card={card} />
      ) : (
        <Stack gap={1}>
          <Stack direction="row" gap={1}>
            <CardInfoLeitner card={card} />
            <Divider flexItem orientation="vertical" />
            <Stack gap={1.5} flex={1}>
              <StyledTextField
                disabled
                label="New Box"
                type="number"
                size="small"
                value={newBox}
              />
              <StyledTextField
                label="New Interval (days)"
                type="number"
                size="small"
                value={newInterval}
                onChange={(e) => setNewInterval(e.target.value)}
              />
            </Stack>
          </Stack>
          <Divider />
          <Stack gap={1}>
            <ButtonGroup fullWidth size="small">
              <Button size="small" onClick={() => handleLeitner(0)}>
                <Close />
              </Button>
              <Button size="small" onClick={() => handleLeitner(1)}>
                <Check />
              </Button>
            </ButtonGroup>
          </Stack>
          <Divider />
          <Stack gap={1}>
            <Button size="small" onClick={handleSubmit}>
              submit!
            </Button>
          </Stack>
        </Stack>
      )}
    </Paper>
  );
}

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-input": { fontSize: 12, height: 6, padding: 12 },
  "& .MuiFormLabel-root": { fontSize: 12, padding: 0, lineHeight: 1 },
});

function CardInfoLeitner({ card }) {
  const [showBack, setShowBack] = useState(false);

  return (
    <Stack gap={1} flex={1}>
      <Typography variant="h5">
        {!showBack ? card.value : card.back}
        <IconButton onClick={() => setShowBack((prev) => !prev)}>
          <Loop />
        </IconButton>
      </Typography>

      <Divider />
      <Stack>
        <Typography variant="caption">
          box: {card.reviewStatus.leitner.box}
        </Typography>
        <Typography variant="caption">
          last interval: {card.reviewStatus.leitner.lastInterval}
        </Typography>
      </Stack>
    </Stack>
  );
}
