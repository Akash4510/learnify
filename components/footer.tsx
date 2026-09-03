import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-auto py-12 bg-accent/50">
      <div className="w-[92%] max-w-[1300px] mx-auto flex flex-col gap-12">
        <div className="flex justify-between gap-10 flex-wrap flex-col lg:flex-row">
          <div className="flex-1">
            <h3 className="text-lg mb-2">© Learnify 2024</h3>
            <p className="text-sm text-muted-foreground">
              The ultimate platform where creators thrive and learners excel.
            </p>
          </div>

          <div className="flex-1">
            <h3 className="mb-3 underline underline-offset-4">
              Legal Information
            </h3>
            <ul className="flex flex-col gap-1 text-muted-foreground">
              <Link
                href="/terms-and-conditions"
                className="hover:underline transition-all w-fit"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:underline transition-all w-fit"
              >
                Privacy Policy
              </Link>
              <Link
                href="/disclaimer"
                className="hover:underline transition-all w-fit"
              >
                Warning Disclaimer
              </Link>
              <Link
                href="/refund-policy"
                className="hover:underline transition-all w-fit"
              >
                Refund Policy
              </Link>
              <Link
                href="/shipping-policy"
                className="hover:underline transition-all w-fit"
              >
                Shipping Policy
              </Link>
            </ul>
          </div>

          <div className="flex-1">
            <h3 className="mb-3 underline underline-offset-4">
              Resources and Links
            </h3>
            <ul className="flex flex-col gap-1 text-muted-foreground">
              <Link
                href="/explore"
                className="hover:underline transition-all w-fit"
              >
                Courses
              </Link>
              <Link href="/" className="hover:underline transition-all w-fit">
                Pricing
              </Link>
            </ul>
          </div>

          <div className="flex-1">
            <h3 className="mb-2">Contact</h3>
            <ul>
              <Link
                href="mailto:helpLearnify@gmail.com"
                className="text-muted-foreground"
              >
                helpLearnify@gmail.com
              </Link>
              <div className="mt-1.5">
                Address:
                <p className="text-muted-foreground">
                  Kamrup, Guwahati, Assam - 781003
                </p>
              </div>
              <div className="mt-1.5">
                Phone:
                <p className="text-muted-foreground">+91 9387736619</p>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
