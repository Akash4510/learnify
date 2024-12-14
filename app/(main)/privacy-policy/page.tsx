import Link from "next/link";

import { Heading } from "@/components/heading";

const PrivacyPolicyPage = () => {
  return (
    <div className="p-4 pt-5 pb-12 md:pb-20 space-y-5">
      <Heading
        title="Privacy Policy"
        titleClassName="uppercase"
        subtitle="Learn How We Collect, Use, and Protect Your Personal Information"
        subtitleClassName="text-base"
      />

      <div className="space-y-3 leading-7">
        <p className="list-item list-inside">
          PRIVACY POLICY At LearnUPIND, accessible from{" "}
          <Link
            href="/privacy-policy"
            className="text-blue-400 underline underline-offset-2"
          >
            https://learnupind.com/privacy-policy
          </Link>
        </p>

        <p className="list-item list-inside">
          One of our main priorities is the privacy of our visitors. This
          Privacy Policy document contains types of information that is
          collected and recorded by LearnUPIND and how we use it. If you have
          additional questions or require more information about our Privacy
          Policy, do not hesitate to contact us. This Privacy Policy applies
          only to our online activities and is valid for visitors to our website
          with regards to the information that they shared and/or collect in
          LearnUPIND. This policy is not applicable to any information collected
          offline or via channels other than this website. Consent By using our
          website, you hereby consent to our Privacy Policy and agree to its
          terms. Information we collect The personal information that you are
          asked to provide, and the reasons why you are asked to provide it,
          will be made clear to you at the point we ask you to provide your
          personal information. If you contact us directly, we may receive
          additional information about you such as your name, email address,
          phone number, the contents of the message and/or attachments you may
          send us, and any other information you may choose to provide.
        </p>
        <p className="list-item list-inside">
          When you register for an account, we may ask for your contact
          information, including items such as name, company name, address,
          email address, and telephone number. How we use your information? We
          use the information we collect in various ways, including to: Provide,
          operate, and maintain our website Improve, personalize, and expand our
          website Understand and analyze how you use our website develop new
          products, services, features, and functionality Communicate with you,
          either directly or through one of our partners, including for customer
          service, to provide you with updates and other information relating to
          the website, and for marketing and promotional purposes, and to send
          you emails.
        </p>
        <p className="list-item list-inside">
          To find and prevent fraud log files LearnUPIND follows a standard
          procedure of using log files. These files log visitors when they visit
          websites. All hosting companies do this and a part of hosting
          services&apos; analytics. The information collected by log files
          include internet protocol (IP) addresses, browser type, Internet
          Service Provider (ISP), date and time stamp, referring/exit pages, and
          possibly the number of clicks. These are not linked to any information
          that is personally identifiable. The purpose of the information is for
          analyzing trends, administering the site, tracking users&apos;
          movement on the website, and gathering demographic information.
        </p>
        <p className="list-item list-inside">
          Cookies and Web Beacons Like any other website, LearnUPIND uses
          “cookies”. These cookies are used to store information including
          visitors&apos; preferences, and the pages on the website that the
          visitor accessed or visited. The information is used to optimize the
          users&apos; experience by customizing our web page content based on
          visitors&apos; browser type and/or other information.
        </p>

        <p className="list-item list-inside">
          Advertising Partners Privacy Policies you may consult this list to
          find the Privacy Policy for each of the advertising partners of
          LearnUPIND Third-party ad servers or ad networks uses technologies
          like cookies, JavaScript, or Web Beacons that are used in their
          respective advertisements and links that appear on LearnUPIND, which
          are sent directly to users&apos; browser. They automatically receive
          your IP address when this occurs. These technologies are used to
          measure the effectiveness of their advertising campaigns and/or to
          personalize the advertising content that you see on websites that you
          visit. Note that LearnUPIND has no access to or control over these
          cookies that are used by third-party advertisers. Third Party Privacy
          Policies LearnUPIND&apos;s Privacy Policy does not apply to other
          advertisers or websites. Thus, we are advising you to consult the
          respective Privacy Policies of these third-party ad servers for more
          detailed information. It may include their practices and instructions
          about how to opt-out of certain options.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
