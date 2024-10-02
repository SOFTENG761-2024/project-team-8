import { Box, Chip, MantineStyleProps, useMantineTheme } from "@mantine/core";
import { IconAwardFilled, IconHeartFilled } from "@tabler/icons-react";
import { FC } from "react";

export interface CourseTagProps extends MantineStyleProps {
  variant: "favorite" | "complete";
}

const CourseTag: FC<CourseTagProps> = ({ variant, ...mantineStyleProps }) => {
  const theme = useMantineTheme();
  let tagColor;
  let labelColor;
  let icon;
  let text;

  switch (variant) {
    case "favorite":
      tagColor = "accentRed.1";
      labelColor = theme.colors.accentRed[5];
      icon = <IconHeartFilled size="1rem" color={labelColor} />;
      text = "Favorite";
      break;

    case "complete":
      tagColor = "accentGreen.1";
      labelColor = theme.colors.accentGreen[5];
      icon = <IconAwardFilled size="1rem" color={labelColor} />;
      text = "Complete";
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
