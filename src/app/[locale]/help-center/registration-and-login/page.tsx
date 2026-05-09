import IconBase from "@/components/icon/iconBase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TabWrapper from "@/components/wrapper/tabWrapper";
import { ICONS } from "@/constants/icons";

const accordionData = [
  {
    title: "Registration and Login",
    description: `
<p>The BC.GAME First 4 Deposit Bonus offers new users a series of bonuses on their initial four deposits. This promotion is designed to reward new users with bonus funds and free spins, enhancing their gaming experience on the platform.</p>

<ul>
    <li>New Users Only: The bonus is available exclusively to new users who have not previously made a deposit on the BC.GAME platform.</li>
<li>Verification Requirements: Users must complete the registration and verification process, including a valid email or phone number, to qualify for this bonus. BC.GAME has the right to require users to complete identity verification when necessary.</li>
</ul>

<h6>Bonus Structure</h6>
<ul>
<li>1st Deposit Bonus:120% match bonus up to $500.00 + 100 Free Spins.</li>
<li>2nd Deposit Bonus:100% match bonus up to $300.00 + 100 Free Spins.</li>
<li>3rd Deposit Bonus:150% match bonus up to $500.00 + 100 Free Spins.</li>
<li>4th Deposit Bonus:100% match bonus up to $300.00 + 100 Free Spins.</li>
</ul>
    `,
  },

];
export default function Page() {
  return (
    <TabWrapper>
      <Accordion type="single" collapsible className="divide-foreground/10">
        {accordionData.map((data, index) => (
          <AccordionItem value={index.toString()} key={index}>
            <AccordionTrigger className="">
              <div className="flex items-center gap-1.5">
                <IconBase
                  icon={ICONS.CHEVRON_LEFT}
                  className="-rotate-180 group-data-[state=open]:-rotate-90 size-5"
                />
                <h6 className="text-base font-medium">{data.title}</h6>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div
                dangerouslySetInnerHTML={{ __html: data.description }}
                className="flex flex-col gap-3 text-xs text-foreground/70"
              ></div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </TabWrapper>
  );
}
