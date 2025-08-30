import { Session } from "next-auth";

const AccountDetails = ({ session }: { session: Session | null }) => {
  return (
    <div className="p-6">
      <h4>Hello, {session?.user.name} </h4>
    </div>
  );
};

export default AccountDetails;
