import {
  Fragment,
  ReactChild,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";
import Navigation from "../Navigation/Navigation";
const Layout = (props: {
  children:
    | boolean
    | ReactChild
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}) => {
  return (
    <div>
      {/* <Navigation></Navigation> */}
      <main>{props.children}</main>
    </div>
  );
};
export default Layout;
