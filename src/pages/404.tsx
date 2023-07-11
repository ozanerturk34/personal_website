import PageLayout from "@components/PageLayout";
import Link from "next/link";

const Custom404 = () => {
  return (
    <PageLayout>
      <h1>404 - Page Not Found</h1>
      <Link href="/">Return to homepage</Link>
    </PageLayout>
  );
};

export default Custom404;
