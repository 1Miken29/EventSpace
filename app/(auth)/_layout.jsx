import { Redirect, Slot } from "expo-router";
import { useUser } from "../../hooks/UserContext";

export default function AuthLayout() {
  const { user } = useUser();

  if (user) {
    return <Redirect href="/inicial" />;
  }

  return <Slot />;
}
