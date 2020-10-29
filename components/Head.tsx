import { FC } from "react";
import Base from "next/head";

type Props = {
  title?: string;
};

const Head: FC<Props> = ({ title, ...props }) => {
  return (
    <Base>
      <title>{title ? `${title} | ` : ""}Stranger Soccer</title>
      <link rel="icon" href="/favicon.ico" />
      {props.children}
    </Base>
  );
};

export default Head;
