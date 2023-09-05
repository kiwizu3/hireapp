import { useState } from "react";
import useAuthentication from "../hooks/useAuthentication";
import { Link } from "next/link";
import { useRouter } from "next/router";
export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const { login } = useAuthentication();

  const handleSubmit = (event) => {
    event.preventDefault();
    login(password);
  };

  const goToHome = () => {
    router.push("/");
  };

  return (
    <div className="row justify-content-center text-center">
      <div className="col-lg-6 col-md-8 col-sm-12">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Password
            <input
              className="mx-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="btn btn-sm btn-dark" type="submit">
            Log In
          </button>
        </form>
        <div>
          <button className="btn btn-sm btn-dark" onClick={goToHome}>Home</button>
        </div>
      </div>
    </div>
  );
}
