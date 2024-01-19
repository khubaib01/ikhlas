import { proxy } from "valtio";
import Api from "./api";

type AppStore = {
  auth: boolean;
  token: string | null;
  username: string | null;
};

const appStore = proxy<AppStore>(await getInitialStore());

async function getInitialStore(): Promise<AppStore> {
  let initialData: AppStore = {
    auth: false,
    token: null,
    username: null,
  };
  const currentToken = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const resp = await Api.post("/users/validate", { token: currentToken });
  if (resp.data.status === "ok") {
    initialData.auth = true;
    initialData.token = currentToken;
    initialData.username = username;
  } else {
    const resp2 = await Api.post("/users/refresh");
    if (resp2.data.token) {
      initialData.auth = true;
      initialData.token = resp2.data.token;
      initialData.username = username;
      localStorage.setItem("utoken", resp2.data.token);
    } else {
      initialData.auth = false;
      initialData.token = null;
      initialData.username = null;
    }
  }
  return initialData;
}

export function login(tok: string, user: string) {
  appStore.auth = true;
  appStore.token = tok;
  appStore.username = user;
  localStorage.setItem("utoken", tok);
  localStorage.setItem("uuser", user);
}

export function logout() {
  appStore.auth = true;
  appStore.token = null;
  appStore.username = null;
  localStorage.setItem("utoken", "");
  localStorage.setItem("uuser", "");
}

export default appStore;
