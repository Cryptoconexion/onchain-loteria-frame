import { createSystem } from "frog/ui";

export const {
  Box,
  Columns,
  Column,
  Divider,
  Heading,
  HStack,
  Icon,
  Image,
  Rows,
  Row,
  Spacer,

  Text,
  VStack,
  vars,
} = createSystem({
  fonts: {
    default: [
      {
        name: "Open Sans",
        source: "google",
        weight: 400,
      },
      {
        name: "Open Sans",
        source: "google",
        weight: 600,
      },
    ],
    madimi: [
      {
        name: "Madimi One",
        source: "google",
      },
    ],
    ps2p: [
      {
        name: "Press Start 2P",
        source: "google",
      },
    ],
  },
});
