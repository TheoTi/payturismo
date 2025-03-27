import { Grid } from "ldrs/react";
import "ldrs/react/Grid.css";

export function Fallback() {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-primary">
      <Grid size="60" speed="1.5" color="#fff" />
    </div>
  );
}
