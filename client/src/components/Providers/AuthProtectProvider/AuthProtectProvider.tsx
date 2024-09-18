import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

interface PropType {
  children: React.ReactElement;
}

const AuthProtectProvider = (props: PropType) => {
  const { children } = props;

  const router = useRouter();
  const { user }: any = useContext(AuthContext);

  if (!user) {
    router.push("/");
    return (
      <div className="w-full h-full flex items-center justify-center">
        Redirecting...
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProtectProvider;
