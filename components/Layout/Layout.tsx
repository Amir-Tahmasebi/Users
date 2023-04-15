import { Header } from "./../";

type LayoutProps = {
  children: React.ReactNode;
};

export  function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}
