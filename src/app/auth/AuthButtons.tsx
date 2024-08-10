import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const AuthButtons = () => {
  return (
    <div className="flex gap-3 flex-1 md:flex-row flex-col relative z-50">
      <Button className="w-full" variant={"outline"}>
        <RegisterLink>Sign up</RegisterLink>
      </Button>
      <Button className="w-full">
        <LoginLink>Log in</LoginLink>
      </Button>
    </div>
  );
};
export default AuthButtons;
