const Privacy = () => {
  return (
    <div className=" text-black flex flex-col gap-8 max-w-[1700px] mx-auto  ">
      <h1 className="text-2xl font-semibold mb-4">Privacy Policy</h1>
      <div>
        <p>
          Eventure ("we," "us," "our") is committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, and share your
          personal information when you use our website and services.
        </p>
      </div>
      <div>
        <h2 className="font-semibold">1. Information We Collect</h2>
        <p className="flex flex-col gap-4">
          <h3>We may collect the following types of information:</h3>
          <ul className="flex flex-col gap-2">
            <li>
              • Personal Information: When you create an account or submit an
              event, we may collect personal information such as your name,
              email address, and other contact details.
            </li>
            <li>
              • Event Information: When you create an event, we collect
              information related to the event, such as the event name,
              description, date, and location.
            </li>
            <li>
              • Usage Data: We collect information about how you interact with
              our website, including IP address, browser type, and access times.
            </li>
          </ul>
        </p>
      </div>
      <div>
        <h2 className="font-semibold">2. How We Use Your Information</h2>
        <p className="flex flex-col gap-4">
          <h3>We use your information to:</h3>
          <ul className="flex flex-col gap-2">
            <li>• Provide and improve our services</li>
            <li>• Communicate with you about your account or events</li>
            <li>
              • Analyze usage patterns to improve our website and services
            </li>
            <li>• Comply with legal obligations</li>
          </ul>
        </p>
      </div>
      <div>
        <h2 className="font-semibold">3. Sharing Your Information</h2>
        <p className="flex flex-col gap-4">
          <h3>
            We do not sell or rent your personal information to third parties.
            We may share your information with:
          </h3>
          <ul className="flex flex-col gap-2">
            <li>
              • Service Providers: Third-party service providers who assist us
              in operating our website and providing our services.
            </li>
            <li>
              • Legal Requirements: If required by law or in response to valid
              requests by public authorities.
            </li>
          </ul>
        </p>
      </div>

      <div>
        <h2 className="font-semibold">4. Data Security</h2>
        <p>
          We take reasonable measures to protect your personal information from
          unauthorized access, use, or disclosure. However, no internet
          transmission is completely secure, and we cannot guarantee the
          absolute security of your data.
        </p>
      </div>
      <div>
        <h2 className="font-semibold">5. Your Rights</h2>
        <p className="flex flex-col gap-4">
          <h3>You have the right to:</h3>
          <ul className="flex flex-col gap-2">
            <li>• Access and update your personal information</li>
            <li>• Request the deletion of your personal information</li>
            <li>• Object to the processing of your personal information</li>
          </ul>
          <span>
            To exercise these rights, please contact us at
            eventure.help@gmail.com.
          </span>
        </p>
      </div>
      <div>
        <h2 className="font-semibold">6. Cookies</h2>
        <p>
          We use cookies to enhance your experience on our website. Cookies are
          small files stored on your device that help us understand how you use
          our services and improve your experience.
        </p>
      </div>
      <div>
        <h2 className="font-semibold">7. Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page, and your continued use of Eventure after such
          changes have been made constitutes your acceptance of the new Privacy
          Policy.
        </p>
      </div>
      <div>
        <h2 className="font-semibold">8. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at&nbsp;
          <b>eventure.help@gmail.com</b>.
        </p>
      </div>
      <p>Last updated: 06/05/2024</p>
    </div>
  );
};

export default Privacy;
