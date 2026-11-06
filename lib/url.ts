import qs from "query-string";

interface QueryProps {
  params: string;
  key: string;
  value: string;
}

interface RemoveQueryProps {
  params: string;
  keysToRemove: string[];
}

export const formUrlQuery = ({ params, key, value }: QueryProps) => {
  const queryString = qs.parse(params);

  queryString[key] = value;

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString,
  });
};

export const removeKeysFromUrlQuery = ({ params, keysToRemove }: RemoveQueryProps) => {
  const queryString = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete queryString[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: queryString,
    },
    { skipNull: true }
  );
};
