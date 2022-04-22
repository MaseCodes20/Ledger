import React from "react";
import { StatusOnlineIcon } from "@heroicons/react/outline";

function LoadingScreen() {
  return (
    <div className="centeredOnScreen">
      <StatusOnlineIcon className="animate-spin h-20" />
    </div>
  );
}

export default LoadingScreen;
