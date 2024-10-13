import { Box, Chip, MantineStyleProps, useMantineTheme } from "@mantine/core";
import { IconAwardFilled, IconBookmarkFilled } from "@tabler/icons-react";
import { FC } from "react";

export interface CourseTagProps extends MantineStyleProps {
  variant: "complete" | "bookmark";
}

/**
 * @component
 * CourseTag
 *
 * This component is for the course tag section of the course page,
 * displaying a tag for bookmarked or completed courses
 * 
 * @param {string} variant - The variant of the tag (complete or bookmark)
 * @returns {JSX.Element}
 */
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
