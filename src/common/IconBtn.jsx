import React from "react";
import { Typography, IconButton } from "@material-ui/core";
import FlexContainer from "./FlexContainer";
import withToolTip from "./withToolTip";
const IconBtn = withToolTip(IconButton);

const IButton = (props) => {
  const {
    label = undefined,
    icon = undefined,
    children = undefined,
    Ref,
    ...rest
  } = props;
  return (
    <FlexContainer type="row" align="center" justify="flex-start">
      {label && (
        <Typography variant="body1" color="initial">
          {label}
        </Typography>
      )}
      <IconBtn ref={Ref} size="small" {...rest}>
        {icon || children}
      </IconBtn>
    </FlexContainer>
  );
};

export default IButton;
