import SuccessMessage from "@/components/SuccessMessage";
import { getAuthSession } from "@/lib/auth";

export default async function SuccessPage() {
  const session = await getAuthSession();
  // console.log(session);
  
  return (
    <div className="container">
      <SuccessMessage session={session}/>
    </div>
  );
}
