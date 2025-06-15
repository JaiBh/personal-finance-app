import SignInCard from "@/features/auth/components/SignInCard";

export const AuthScreen = () => {
  return (
    <div className="my-8 h-full flex items-center justify-center">
      <div className="w-[90%] max-w-[35rem] md:h-auto">
        <SignInCard></SignInCard>
      </div>
    </div>
  );
};
