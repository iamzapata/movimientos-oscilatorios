import React from "react";
import katex from "katex";
import classNames from "classnames";

const FormulaMatematica = ({ texto, className }) => {
  const __html = katex.renderToString(texto, {
    throwOnError: false,
    strict: false,
  });

  return (
    <span
      className={classNames("FormulaMatematica", className)}
      dangerouslySetInnerHTML={{ __html }}
    />
  );
};

export default FormulaMatematica;
