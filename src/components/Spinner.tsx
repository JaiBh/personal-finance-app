function Spinner() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        className={
          "border-[3px] border-t-[3px] border-[#f3f3f3] rounded-[50%] border-t-[#3498db] animate-spin size-[40px]"
        }
      ></div>
    </div>
  );
}
export default Spinner;
