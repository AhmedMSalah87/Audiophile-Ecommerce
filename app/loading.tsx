import { Spinner } from "@/components/ui/spinner";

const loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner size="large">Loading...</Spinner>
    </div>
  );
};

export default loading;
