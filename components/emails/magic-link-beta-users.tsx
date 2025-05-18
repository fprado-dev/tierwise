import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';


interface BetaUsersInviteEmailProps {
  magicLink?: string;
  feedbackLink?: string;
  recipient_email?: string;
}

export const BetaUsersInviteEmail: React.FC<BetaUsersInviteEmailProps> = ({
  feedbackLink, magicLink, recipient_email
}) => {
  return (
    <Html>
      <Head />
      <Preview>
        Welcome! Enjoy 1 year of TierWise Pro – and help shape the platform 🚀
      </Preview>
      <Tailwind>
        <Body className="bg-[#f8f9fa] font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] mx-auto p-[20px] max-w-[500px]">
            <Section className="mt-[32px]">
              <Heading className="text-[26px] font-extrabold text-[#724FEB] text-center m-0 tracking-tight">
                Welcome to TierWise Beta!
              </Heading>
            </Section>
            <Section className="mt-[32px]">
              <Heading className="text-[18px] font-bold text-[#484848] m-0">
                Thank you for believing in us
              </Heading>
              <Text className="text-[15px] leading-[24px] text-[#484848] mt-[16px]">
                You joined our waitlist and showed faith in TierWise before anyone else. We’re truly grateful for your support!
              </Text>
              <Text className="text-[15px] leading-[24px] text-[#484848] mt-[16px]">
                As a thank you, we’re inviting you to be one of our first beta users. You’ll get <span className="font-bold text-[#724FEB]">free access now</span> and, when we launch, a full year of <span className="font-bold text-[#724FEB]">TierWise Pro</span>-including all new features and AI tools-on us.
              </Text>
              <Text className="text-[15px] leading-[24px] text-[#484848] mt-[16px]">
                Click below to activate your invite and start using TierWise:
              </Text>
              <Button
                className="bg-[#724FEB] rounded-[4px] text-white text-[15px] font-bold py-[12px] px-[20px] mt-[24px] block text-center box-border shadow"
                href={magicLink}
              >
                Activate My Free Year
              </Button>
              <Text className="text-[14px] leading-[24px] text-[#DCDCDC] mt-[24px]">
                This invitation is exclusive to you and will expire in 7 days.
              </Text>
            </Section>
            <Section className="mt-[32px]">
              <Heading className="text-[18px] font-bold text-[#484848] m-0">
                Help Us Build TierWise (and Earn More Free Time!)
              </Heading>
              <Text className="text-[15px] leading-[24px] text-[#484848] mt-[16px]">
                As a beta user, your feedback is incredibly valuable. If you have ideas, suggestions, or spot anything we can improve, please let us know!
              </Text>
              <Text className="text-[15px] leading-[24px] text-[#484848] mt-[8px]">
                <span className="font-bold text-[#724FEB]">If your feedback or feature request is implemented, you’ll earn even more free time on TierWise Pro.</span> We want to reward everyone who helps us make TierWise better for all founders.
              </Text>
              <Button
                className="bg-violet-400 rounded-[4px] text-white text-[15px] font-bold py-[12px] px-[20px] mt-[24px] block text-center box-border shadow"
                href={feedbackLink}
              >
                Send Feedback or Suggest a Feature
              </Button>
            </Section>
            <Section className="border-t border-solid border-[#e2e8f0] mt-[32px] pt-[32px]">
              <Text className="text-[12px] leading-[20px] text-[#718096]">
                This invite was sent to {recipient_email}. If you were not expecting this email, you can ignore it. If you have any questions, reply to this email to reach our team.
              </Text>
            </Section>
            <Section className="mt-[32px]">
              <Text className="text-[12px] leading-[20px] text-[#718096] text-center mt-[16px]">
                <Link href="https://tierwise.app/unsubscribe" className="text-[#718096] underline">
                  Unsubscribe
                </Link>
              </Text>
              <Text className="text-[12px] leading-[20px] text-[#718096] text-center m-0">
                © {new Date().getFullYear()} TierWise. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}



