import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loading from "@/components/Loading/Loading";

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
        <Loading width={60} height={60} />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProtectProvider;
