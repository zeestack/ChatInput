import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

export default function withToolTip(Component) {
  const WithToolTip = React.forwardRef((props, ref) => {
    const { message, toolTipProps = {}, ...rest } = props;
    return message ? (
      <Tooltip title={message} arrow {...toolTipProps}>
        <Component ref={ref} {...rest} />
      </Tooltip>
    ) : (
      <Component ref={ref} {...rest} />
    );
  });
  return WithToolTip;
}
