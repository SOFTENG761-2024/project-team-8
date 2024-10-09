import { Box, Chip, MantineStyleProps, useMantineTheme } from "@mantine/core";
import {
  IconAwardFilled,
  IconBookmarkFilled,
  IconHeartFilled,
} from "@tabler/icons-react";
import { FC } from "react";

export interface CourseTagProps extends MantineStyleProps {
  variant: "complete" | "bookmark";
}

const CourseTag: FC<CourseTagProps> = ({ variant, ...mantineStyleProps }) => {
  const theme = useMantineTheme();
  let tagColor;
  let labelColor;
  let icon;
  let text;

  switch (variant) {
    case "complete":
      tagColor = "accentGreen.1";
      labelColor = theme.colors.accentGreen[5];
      icon = <IconAwardFilled size="1rem" color={labelColor} />;
      text = "Complete";
      break;

    case "bookmark":
      tagColor = "accentRed.1";
      labelColor = theme.colors.accentRed[5];
      icon = <IconBookmarkFilled size="1rem" color={labelColor} />;
      text = "Saved";
      break;
  }

  return (
    <Chip
      checked
      color={tagColor}
      icon={icon}
      {...mantineStyleProps}
      style={{ pointerEvents: "none" }}
    >
      <Box component="span" c={labelColor}>
        {text}
      </Box>
    </Chip>
  );
};

export default CourseTag;
