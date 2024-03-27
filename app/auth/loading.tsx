import { Loader2 } from 'lucide-react';

const AuthLoadingPage = () => {
  return (
    <div className="flex items-center justify-center mt-[150px] md:mt-0 md:ml-[150px]">
      <Loader2 size={28} className="animate-spin" />
    </div>
  );
};

export default AuthLoadingPage;
