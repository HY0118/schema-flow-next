import { UserAcc } from "../types/user";

export const IsSessionValid = async (token?: string) => {
  if (token === "" || token === null || token === undefined) return false;

  const response = await fetch(
    "https://members.midasuser.com/auth/api/v1/session-validate",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": `Bearer ${token}`,
      },
    }
  );

  if (response.ok) return true;
  else return false;
};

export const GetToken = async (
  token: string,
  setToken: React.Dispatch<React.SetStateAction<string>>,
  acc: string,
  setAcc: React.Dispatch<React.SetStateAction<string>>
) => {
  console.log("token: ", token);
  console.log("acc: ", acc);

  const currentToken = token;

  if (await IsSessionValid(currentToken + "")) return currentToken;

  // if token is not valid, try to login
  if (acc === "" || acc === null || acc === undefined) return "acc is empty";

  let userAcc: UserAcc = {
    id: "",
    pwd: "",
  };
  if (typeof acc === "string") userAcc = JSON.parse(acc);
  const response = await fetch(
    "https://members.midasuser.com/auth/api/v1/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userAcc.id, password: userAcc.pwd }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    console.log("new Token: ", data.token);
    setToken(data.token);
    return data.token;
  } else {
    setToken("");
    setAcc("");
    return "";
  }
};

export default IsSessionValid;
