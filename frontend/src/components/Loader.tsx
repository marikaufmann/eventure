import { Loader2 } from "lucide-react";

const Loader = ({ styles }: { styles: string }) => {
  return (
    <div className={` ${styles} animate-spin text-white/80`}>
      <Loader2 />
    </div>
  );
};

export default Loader;
