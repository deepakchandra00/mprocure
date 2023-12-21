import React from "react";
import { SideDrawer } from './../custom/navbar/sideDrawer';

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props: any) => {
  return (
    <>
      {/* <SideDrawer /> */}
      {props.children}
    </>
  );
};
