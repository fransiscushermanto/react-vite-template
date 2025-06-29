import queryString from "query-string";

const { parse } = queryString;

const queryParse = (search: string) => {
  return parse(search);
};

export default queryParse;
