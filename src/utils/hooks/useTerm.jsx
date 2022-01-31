import { useEffect, useState } from "react";

function useTerm(text) {
  const [term, setTerm] = useState('');

  useEffect(() => {
  setTerm(text)
  }, [text]);

  return { term };
}

export { useTerm };
