import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";

export const useRouting = () => {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate.goBack();
  }, [navigate]);

  const push = useCallback((url) => () => {
    navigate(url);
  }, [navigate]);

  const replace = useCallback((url) => () => {
    navigate.replace(url);
  }, [navigate]);

  const go = useCallback((n) => () => {
    navigate.go(n);
  }, [navigate]);

  return {
    goBack,
    replace,
    push,
    go,
  };
};
