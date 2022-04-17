import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }) {
  return (
    <div className="pageContainer">
      <div className="centeredOnScreen">
        <div className="text-center mb-3">
          <h1 className="text-5xl mb-1">Legder</h1>
          <p>Expense Tracker</p>
        </div>

        {Object.values(providers)?.map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className="bg-[#8985F2] p-2 rounded-full"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
