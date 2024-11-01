import SpinningLoader from "./loader";
import { Button } from "./ui/button";

type SubmitButtonProps = {
  isSubmitting: boolean;
  isDirty: boolean;
};

const SubmitButton = ({ isSubmitting, isDirty }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      className="cursor-pointer"
      disabled={isSubmitting || !isDirty}>
      {isSubmitting ? (
        <div className="mr-2">
          <SpinningLoader />
        </div>
      ) : null}
      Submit
    </Button>
  );
};

export { SubmitButton };
