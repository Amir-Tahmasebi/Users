import { GetServerSideProps } from "next";
import { Layout } from "@/components/index";
import { UsersFeatures } from "@/features/index";

export default function Home(props: UsersFeatures.HomeProps) {
  return (
    <Layout>
      <UsersFeatures.Users {...props} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await UsersFeatures.getUsers("/users?page=1").then((res) => res);
  return {
    props: data,
  };
};
