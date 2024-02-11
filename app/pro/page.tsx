import ProPage from "@/components/pro-page";
import { getAuthSession } from "@/lib/auth";

const Pro = async () => {
  const session = await getAuthSession();
  console.log(session);
  return (
    <div className="text-center">
      <div className="mx-auto w-full px-8 space-y-12 pb-8">
        <ProPage session={session}/>
      </div>
    </div>
  );
};

export default Pro;
