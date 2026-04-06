import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='relative z-50'>
        <Navbar />
      </div>
      <main className='relative z-10'>{children}</main>
      <Footer />
    </>
  );
}
