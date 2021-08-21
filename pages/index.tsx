import Layout from "@components/Global/Layout";
import MyLoader from "@components/Shared/MyLoader";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Index() {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/user/login");
    }
  }, []);
  return <MyLoader windowCentered />;
  return (
    <Layout>
      <Link href="/create">create</Link>
      <Link href="/dashboard">dashboard</Link>
      <Link href="/analytics">analytics</Link>
      <Link href="/account">Account Settings</Link>
    </Layout>
  );
}
