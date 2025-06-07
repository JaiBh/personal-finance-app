function FallbackAvatar({ name }: { name: string }) {
  const avatarFallBack = name!.charAt(0).toUpperCase();

  return (
    <div className="size-8 rounded-[50%] bg-secondary-yellow flex justify-center items-center">
      <span>{avatarFallBack}</span>
    </div>
  );
}
export default FallbackAvatar;
