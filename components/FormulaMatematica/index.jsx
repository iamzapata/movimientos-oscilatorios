import React from "react";
import katex from "katex";

const FormulaMatematica = ({ texto }) => {
  const __html = katex.renderToString(texto, {
    throwOnError: false,
    strict: false,
  });

  return <span className='FormulaMatematica mb-5 inline-block' dangerouslySetInnerHTML={{ __html }}></span>;
};

export default FormulaMatematica;
