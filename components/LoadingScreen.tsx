import { GlobeAltIcon } from "@heroicons/react/24/solid";

function LoadingScreen() {
  return (
    <div className="centeredOnScreen">
      <GlobeAltIcon className="animate-spin h-20" />
    </div>
  );
}

export default LoadingScreen;
