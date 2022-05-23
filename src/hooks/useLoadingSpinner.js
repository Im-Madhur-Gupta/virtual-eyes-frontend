import { useState } from "react";
import { Spinner } from "native-base";

const useLoadingSpinner = (accessibilityLabel) => {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  return [
    <Spinner
      accessibilityLabel={accessibilityLabel}
      size="lg"
      color="indigo.500"
    />,
    showLoadingSpinner,
    setShowLoadingSpinner,
  ];
};

export default useLoadingSpinner;
