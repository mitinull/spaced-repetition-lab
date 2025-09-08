import {
  Button,
  ButtonGroup,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export function Item({ item, onCardMove }) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    onCardMove(item.id, +value);
  };
  return (
    <Paper sx={{ p: 1 }}>
      <Stack gap={1}>
        <Typography>{item.value}</Typography>
        <Divider />
        <Typography>ease: {item.ease}</Typography>
        <Divider />
        <Stack gap={1}>
          <ButtonGroup fullWidth>
            <Button size="small" onClick={() => setValue(0)}>
              0
            </Button>
            <Button size="small" onClick={() => setValue(1)}>
              1
            </Button>
            <Button size="small" onClick={() => setValue(2)}>
              2
            </Button>
          </ButtonGroup>
          <ButtonGroup fullWidth>
            <Button size="small" onClick={() => setValue(3)}>
              3
            </Button>
            <Button size="small" onClick={() => setValue(4)}>
              4
            </Button>
            <Button size="small" onClick={() => setValue(5)}>
              5
            </Button>
          </ButtonGroup>
        </Stack>
        <Divider />
        <Stack direction="row" gap={1}>
          <TextField
            type="number"
            size="small"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button size="small" onClick={handleSubmit}>
            GO!
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
