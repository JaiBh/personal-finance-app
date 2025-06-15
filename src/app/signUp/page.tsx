import SignUpCard from "@/features/auth/components/SignUpCard";

export const AuthScreen = () => {
  return (
    <div className="my-8 h-full flex items-center justify-center">
      <div className="w-[90%] max-w-[35rem] md:h-auto">
        <SignUpCard></SignUpCard>
      </div>
    </div>
  );
};
