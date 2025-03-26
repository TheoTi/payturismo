import { Form } from "./Form";
import logo from "@views/assets/logo.png";

export function SignIn() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <img src={logo} alt="payturismo" className="w-48 self-center" />
        <Form />
      </div>
    </div>
  );
}
