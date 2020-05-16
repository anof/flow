import React from "react";
import {Grid, GridProps} from "@material-ui/core";

/**
 * Override Grid item to be flex
 * @param children{*}: component children
 * @param otherProps{GridProps}: other options for Grid, such as justify ..
 */
export const FlexGrid: React.FunctionComponent<GridProps> = ({children, ...otherProps}) => {
    return <Grid {...otherProps} style={{display: "flex"}}>
        {children}
    </Grid>
};

export default FlexGrid;