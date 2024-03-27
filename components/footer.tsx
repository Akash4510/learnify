import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-auto py-12 bg-secondary">
      <div className="w-[92%] max-w-[1300px] mx-auto flex flex-col gap-12">
        <div className="flex justify-between gap-10 flex-wrap flex-col md:flex-row">
          <div className="flex-1">
            <h3 className="text-lg mb-2">© Learn It 2024</h3>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
              eaque.
            </p>
          </div>

          <div className="flex-1">
            <h3 className="mb-2 underline">Legal Information</h3>
            <ul className="flex flex-col text-muted-foreground">
              <Link href="/" className="hover:underline transition-all w-fit">
                Service Aggrement
              </Link>
              <Link href="/" className="hover:underline transition-all w-fit">
                Privacy Policy
              </Link>
              <Link href="/" className="hover:underline transition-all w-fit">
                Warning Disclaimer
              </Link>
            </ul>
          </div>

          <div className="flex-1">
            <h3 className="mb-2 underline">Resources and Links</h3>
            <ul className="flex flex-col text-muted-foreground">
              <Link href="/" className="hover:underline transition-all w-fit">
                Courses
              </Link>
              <Link href="/" className="hover:underline transition-all w-fit">
                Live
              </Link>
              <Link href="/" className="hover:underline transition-all w-fit">
                Pricing
              </Link>
            </ul>
          </div>

          <div className="flex-1">
            <h3 className="mb-2">Contact</h3>
            <p className="text-muted-foreground">help.trademaster@tm.org</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
