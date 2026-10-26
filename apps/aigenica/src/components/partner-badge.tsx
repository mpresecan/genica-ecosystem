import { cn } from "@genica/ui";

export const SUPERCOGNIT_PARTNERS_URL = "https://supercognit.com/partners";

/**
 * SuperCognit's certified-partner badge, as supplied by SuperCognit and not
 * redrawn: the artwork is theirs. The light plate sits on paper, the dark
 * plate on the one dark band. It links to the partner programme so a buyer
 * can check the claim rather than take it from us.
 */
export function PartnerBadge({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <a
      href={SUPERCOGNIT_PARTNERS_URL}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-block transition-transform duration-200 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-4",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static vendor SVG, no optimisation to gain */}
      <img
        src={`/partners/supercognit-partner-${tone}.svg`}
        width={240}
        height={100}
        alt="SuperCognit certified partner"
        className="block h-auto w-[200px] sm:w-[240px]"
      />
    </a>
  );
}
