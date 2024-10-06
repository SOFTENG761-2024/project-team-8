export const PAGE_TITLES: Record<string, string> = {
  LOGIN: "Login",
  REGISTER: "Register",
  DASHBOARD: "Dashboard",
  COURSE: "Course Details",
  DEFAULT: "ByteEd",
  BOOKMARKS: "Bookmarked Courses",
};

/**
 * Creates the webpage title in the format of "[page] | ByteEd", unless default
 * @param page the key of the page to return the formatted page title
 */
export const formattedPageTitle = (page: keyof typeof PAGE_TITLES): string => {
  if (page == "DEFAULT") {
    return PAGE_TITLES[page];
  } else {
    return `${PAGE_TITLES[page]} | ByteEd`;
  }
};
