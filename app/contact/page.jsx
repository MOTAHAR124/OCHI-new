import ContactFaqSection from "@/components/contact/ContactFaqSection";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactSocialBlockSection from "@/components/contact/ContactSocialBlockSection";
import ContactFooter from "@/components/site/ContactFooter";

export const metadata = {
  title: "Contact | Ochi Inspired Studio",
  description:
    "Contact Ochi presentation design agency to start your next project."
};

export default function ContactPage() {
  return (
    <>
      <ContactFormSection />
      <ContactSocialBlockSection />
      <ContactFaqSection />
      <ContactFooter />
    </>
  );
}
