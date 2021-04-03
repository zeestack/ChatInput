import React, { Component } from "react";
import withToolTip from "./withToolTip";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const useStyles = (theme) => ({
  flex: {
    display: "flex",
    flexWrap: "wrap",
    width: (props) => props.width || undefined,
    height: (props) => props.height || undefined,
    flexDirection: (props) => props.type || "row",
    alignItems: (props) => props.align || "center",
    justifyContent: (props) => props.justify || "flex-start",
    backgroundColor: (props) => props.color || "transparent",
    padding: (props) => props.padding || undefined,
    color: (props) => props.textColor || "inherit",
    borderRadius: (props) => theme.spacing(props.borderRadius || 0),
    flexGrow: (props) => props.flexGrow || undefined,
    margin: (props) => theme.spacing(props.margin || 0),
    marginRight: (props) => theme.spacing(props.marginRight || 0),
    marginLeft: (props) => theme.spacing(props.marginLeft || 0),
    marginTop: (props) => theme.spacing(props.marginTop || 0),
    marginBottom: (props) => theme.spacing(props.marginBottom || 0),
    border: (props) => props.border || undefined,
  },
});

class Container extends Component {
  render() {
    const {
      type,
      elevation = 0,
      children,
      classes,
      borderRadius,
      justify,
      align,
      flexGrow,
      margin,
      marginRight,
      marginBottom,
      marginLeft,
      marginTop,
      textColor,
      ...rest
    } = this.props;
    return (
      <Paper elevation={elevation} {...rest} className={classes.flex}>
        {children}
      </Paper>
    );
  }
}

export default withToolTip(withStyles(useStyles)(Container));
