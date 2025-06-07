import LoadingSpinner from "./LoadingSpinner";

function FullScreenLoading() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-grey-900/40 z-50">
      <LoadingSpinner />
    </div>
  );
}
export default FullScreenLoading;
