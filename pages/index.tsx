import Layout from "@components/Layout";
import Link from "next/link";
export default function Index() {
  return (
    <Layout>
      <Link href="/create">create</Link>
      <Link href="/dashboard">dashboard</Link>
    </Layout>
  );
}
