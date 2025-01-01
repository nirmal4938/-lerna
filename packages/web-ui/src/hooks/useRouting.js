import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRouting = () => {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate(-1); // Go back to the previous page
  }, [navigate]);

  const push = useCallback((url) => () => {
    navigate(url); // Navigate to a new URL
  }, [navigate]);

  const replace = useCallback((url) => () => {
    navigate(url, { replace: true }); // Replace the current history entry
  }, [navigate]);

  const go = useCallback((n) => () => {
    navigate(n); // Navigate forward/backward in history stack
  }, [navigate]);

  return {
    goBack,
    replace,
    push,
    go,
  };
};
