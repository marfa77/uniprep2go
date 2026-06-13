type FooterCreditProps = {
  variant?: "card" | "channel";
  className?: string;
};

const hrefByVariant = {
  card: "https://www.webmorp.art/",
  channel: "https://www.webmorp.art/channel/",
} as const;

export function FooterCredit({ variant = "card", className }: FooterCreditProps) {
  return (
    <p className={className ?? "footer-credit"}>
      Site by{" "}
      <a
        href={hrefByVariant[variant]}
        className="font-medium text-[#4f493e] underline decoration-[#18140f]/20 underline-offset-4 transition hover:text-[#18140f]"
      >
        webmorp.art
      </a>
    </p>
  );
}
