import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Input
      type={showPassword ? "text" : "password"}
      className={className}
      ref={ref}
      {...props}
      icon={
        showPassword ? (
          <EyeOff
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer"
          />
        ) : (
          <Eye
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer"
          />
        )
      }
    />
  );
});
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
