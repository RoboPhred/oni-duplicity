import * as React from "react";

import { Space, Border, Color } from "@/style";

import Box from "@/components/Box";

const DuplicantsListContainer: React.SFC = ({ children }) => (
  <Box
    width="100%"
    mt={Space.Small}
    p={Space.Small}
    border={Border.Thick}
    borderColor={Color.DefaultSeparator}
  >
    {children}
  </Box>
);

DuplicantsListContainer.displayName = "DuplicantsListContainer";
export default DuplicantsListContainer;
