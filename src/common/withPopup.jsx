import React from "react";
import { Popper, ClickAwayListener } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  popper: {
    zIndex: 2000,
    '&[x-placement*="bottom"] $arrow': {
      width: 0,
      height: 0,
      borderLeft: "1em solid transparent",
      borderRight: "1em solid transparent",
      borderBottom: "1em solid white",
      marginTop: "-0.9em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: "transparent transparent white transparent",
      },
    },

    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      width: 0,
      height: 0,
      borderLeft: "1em solid transparent",
      borderRight: "1em solid transparent",
      borderTop: "1em solid white",
      marginBottom: "-0.9em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: "white transparent transparent transparent",
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      width: 0,
      height: 0,
      borderTop: "1em solid transparent",
      borderBottom: "1em solid transparent",
      borderRight: "1em solid white",
      marginLeft: "-0.9em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: "transparent white transparent transparent",
      },
    },

    '&[x-placement*="left"] $arrow': {
      right: 0,
      width: 0,
      height: 0,
      borderTop: "1em solid transparent",
      borderBottom: "1em solid transparent",
      borderLeft: "1em solid white",
      marginRight: "-0.9em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: "transparent transparent transparent white",
      },
    },
  },
  arrow: {
    position: "absolute",
    fontSize: "12px",
    width: "5em",
    height: "5em",
    "&::before": {
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid",
    },
  },
}));

export default function withPopup(Component) {
  const WithPopup = (props) => {
    const classes = useStyles();
    const {
      name,
      anchor,
      open,
      placement = "top",
      onClickAway = () => {
        //console.log("ClickAwayListenerFired!");
      },
      popupProps,
      ...rest
    } = props;
    const [arrowRef, setArrowRef] = React.useState();
    return (
      <Popper
        id={name}
        anchorEl={anchor ? anchor : undefined}
        name={name}
        open={open}
        placement={placement}
        className={classes.popper}
        modifiers={{
          flip: {
            enabled: true,
          },
          arrow: {
            enabled: true,
            element: arrowRef,
          },
          preventOverflow: {
            enabled: "true",
            boundariesElement: "scrollParent",
          },
          offset: {
            offset: "[0,6]",
          },
        }}
        {...popupProps}
      >
        {open && (
          <React.Fragment>
            <ClickAwayListener onClickAway={onClickAway}>
              <div>
                <span className={classes.arrow} ref={setArrowRef} />
                <Component id={name} name={name} {...rest} />
              </div>
            </ClickAwayListener>
          </React.Fragment>
        )}
      </Popper>
    );
  };
  return WithPopup;
}
