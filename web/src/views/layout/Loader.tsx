import { Tailspin } from "ldrs/react";
import "ldrs/react/Grid.css";

export function Loader() {
  return (
    <div className="flex items-center justify-center bg-primary">
      <Tailspin size="60" speed="1.5" color="#fff" />
    </div>
  );
}
