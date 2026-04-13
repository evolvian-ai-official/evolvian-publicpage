import { motion, useReducedMotion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { cn } from "../lib/utils";
import { trackEvent } from "../utils/tracking";

const START_TRIAL_URL = "https://www.evolvianai.net/register";
const DEMO_URL = "/demo";
const MotionDiv = motion.div;

const PRIMARY_CTA_LABEL = "Start Free Trial";
const SECONDARY_CTA_LABEL = "View Demo";

const CHANNELS = ["WhatsApp", "Web chat", "Email"];
const SPECIALTIES = ["Dentists", "Psychologists", "General practitioners"];

const PROBLEM_POINTS = [
  {
    title: "Slow responses = lost patients",
    description: "Patients message the first clinic that feels available. If replies take hours, they book elsewhere.",
  },
  {
    title: "Manual booking = wasted time",
    description: "Front-desk work steals attention from care, follow-up, and growth when every inquiry needs manual handling.",
  },
  {
    title: "Missed follow-ups = lost revenue",
    description: "No replies, forgotten reminders, and unclosed conversations leave appointments and repeat visits on the table.",
  },
];

const SOLUTION_COLUMNS = [
  {
    title: "Instant Replies",
    description: "Respond in seconds across WhatsApp, web chat, and email with answers that feel helpful and human.",
    points: ["Reply after hours", "Handle repetitive questions", "Keep every lead warm"],
    icon: MessageIcon,
  },
  {
    title: "Smart Qualification",
    description: "Collect symptoms, intent, specialty, insurance, and preferred timing before your team gets involved.",
    points: ["Ask the right questions", "Capture lead details", "Route each patient correctly"],
    icon: SparkIcon,
  },
  {
    title: "Automatic Booking",
    description: "Offer available slots, confirm the visit, and keep the calendar moving without back-and-forth messages.",
    points: ["Share live availability", "Confirm faster", "Reduce admin work"],
    icon: CalendarIcon,
  },
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Patient sends message",
    description: "A new inquiry arrives through WhatsApp, web chat, or email.",
  },
  {
    step: "02",
    title: "Evolvian responds instantly",
    description: "The assistant answers, qualifies the lead, and offers the next best step in real time.",
  },
  {
    step: "03",
    title: "Evolvian books appointment",
    description: "The patient picks a time and the appointment gets confirmed automatically.",
  },
];

const BENEFITS = [
  {
    title: "More patients without ads",
    description: "Convert the demand you already have instead of paying for more traffic first.",
  },
  {
    title: "No need for assistants",
    description: "Keep the front desk lean while still replying quickly and consistently.",
  },
  {
    title: "24/7 availability",
    description: "Capture inquiries late at night, during consultations, and on weekends.",
  },
  {
    title: "Reduce no-shows",
    description: "Automated confirmations and reminder flows keep the calendar tighter.",
  },
];

const TESTIMONIALS = [
  {
    quote: "We stopped losing WhatsApp inquiries after hours. Patients now get answers and book before my team even opens the clinic.",
    name: "Dr. Sofia Ramirez",
    role: "Placeholder testimonial · Dental clinic",
  },
  {
    quote: "The biggest win is speed. Evolvian qualifies the patient and offers times instantly, so we spend less time on routine admin.",
    name: "Dr. Ethan Brooks",
    role: "Placeholder testimonial · Psychology practice",
  },
  {
    quote: "It feels like having a reliable receptionist that never misses a lead, even when the whole staff is busy with consultations.",
    name: "Dr. Valeria Torres",
    role: "Placeholder testimonial · General practice",
  },
];

const NAV_LINKS = [
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#proof", label: "Proof" },
];

const HERO_METRICS = [
  { value: "24/7", label: "capture" },
  { value: "3", label: "channels" },
  { value: "0", label: "extra hires" },
];

function Container({ className, children }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

function SectionReveal({ className, delay = 0, children }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <MotionDiv
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </MotionDiv>
  );
}

function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="font-sans text-sm font-semibold uppercase tracking-[0.24em] text-[#4a90e2]">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-[#274472] sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{description}</p> : null}
    </div>
  );
}

function IconBadge({ className, children }) {
  return (
    <div
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-2xl border border-white/80 bg-white text-[#274472] shadow-[0_18px_45px_-28px_rgba(39,68,114,0.65)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-4">
        <a
          href="/"
          className="flex items-center gap-3"
          onClick={() => trackEvent({ name: "Healthcare_Landing_Logo_Click", category: "Navigation", label: "Header" })}
        >
          <img src="/logo-evolvian.svg" alt="Evolvian AI" className="h-11 w-11 rounded-2xl border border-white bg-white p-1.5 shadow-sm" />
          <div>
            <p className="font-display text-lg font-semibold tracking-[-0.03em] text-[#274472]">Evolvian AI</p>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">For modern clinics</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[#274472]"
              onClick={() => trackEvent({ name: "Healthcare_Landing_Nav_Click", category: "Navigation", label: link.label })}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <Button
            href={DEMO_URL}
            variant="secondary"
            onClick={() => trackEvent({ name: "Healthcare_Landing_Header_Demo_Click", category: "CTA", label: "Header" })}
          >
            {SECONDARY_CTA_LABEL}
          </Button>
          <Button
            href={START_TRIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="px-5"
            onClick={() => trackEvent({ name: "Healthcare_Landing_Header_Trial_Click", category: "CTA", label: "Header" })}
          >
            {PRIMARY_CTA_LABEL}
          </Button>
        </div>
      </Container>
    </header>
  );
}

function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,_#f9fcfb_0%,_#eef6fb_48%,_#ffffff_100%)]">
      <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,_rgba(163,217,177,0.48),_transparent_44%),radial-gradient(circle_at_top_right,_rgba(74,144,226,0.24),_transparent_36%)]" />
      <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

      <Container className="relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-24">
        <SectionReveal className="max-w-xl" delay={0.05}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-2 text-sm font-medium text-slate-600 shadow-[0_18px_45px_-34px_rgba(39,68,114,0.8)] backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-[#a3d9b1]" />
            Trusted by modern clinics
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap gap-2">
              {SPECIALTIES.map((specialty) => (
                <span
                  key={specialty}
                  className="rounded-full border border-[#dce7ef] bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
                >
                  {specialty}
                </span>
              ))}
            </div>

            <h1 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.06em] text-[#274472] sm:text-5xl lg:text-6xl">
              Turn every patient inquiry into a booked appointment — automatically.
            </h1>

            <p className="max-w-lg text-lg leading-8 text-slate-600">
              Capture, qualify and schedule patients 24/7 without needing an assistant.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                href={START_TRIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => trackEvent({ name: "Healthcare_Landing_Hero_Trial_Click", category: "CTA", label: "Hero" })}
              >
                {PRIMARY_CTA_LABEL}
                <ArrowUpRightIcon className="h-4 w-4" />
              </Button>
              <Button
                href={DEMO_URL}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => trackEvent({ name: "Healthcare_Landing_Hero_Demo_Click", category: "CTA", label: "Hero" })}
              >
                {SECONDARY_CTA_LABEL}
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              {CHANNELS.map((channel) => (
                <span key={channel} className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-2 ring-1 ring-[#e1ebf3]">
                  <CheckIcon className="h-3.5 w-3.5 text-[#4a90e2]" />
                  {channel}
                </span>
              ))}
            </div>

            <div className="grid max-w-md grid-cols-3 gap-3 pt-3">
              {HERO_METRICS.map((metric) => (
                <Card key={metric.label} className="border-[#dce7ef] bg-white/85">
                  <CardContent className="p-4">
                    <p className="font-display text-2xl font-semibold tracking-[-0.04em] text-[#274472]">{metric.value}</p>
                    <p className="mt-1 text-sm text-slate-500">{metric.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="relative" delay={0.15}>
          <div className="absolute -left-4 top-10 hidden rounded-2xl border border-[#d4e7da] bg-white/90 px-4 py-3 shadow-[0_24px_60px_-36px_rgba(39,68,114,0.55)] md:block">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Conversion focus</p>
            <p className="mt-1 font-display text-2xl font-semibold tracking-[-0.04em] text-[#274472]">More bookings</p>
          </div>

          <Card className="relative overflow-hidden border-[#dce7ef] bg-white/90 p-5">
            <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(135deg,_rgba(163,217,177,0.22),_rgba(74,144,226,0.12))]" />

            <div className="relative flex items-center justify-between rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e9f6ec] text-[#274472]">
                  <MessageIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold tracking-[-0.03em] text-[#274472]">WhatsApp intake</p>
                  <p className="text-sm text-slate-500">Live response preview</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-[#f4faf6] px-3 py-1.5 text-xs font-semibold text-[#274472]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#a3d9b1]" />
                Online now
              </div>
            </div>

            <MotionDiv
              className="relative mt-5 space-y-4 rounded-[28px] border border-[#d8e4ef] bg-[#f8fbfd] p-4 sm:p-5"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="flex items-center justify-between border-b border-[#e2ebf2] pb-3">
                <div>
                  <p className="text-sm font-semibold text-[#274472]">Patient conversation</p>
                  <p className="text-xs text-slate-500">Captured from web and WhatsApp</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-[#e3edf4]">
                  2 messages
                </span>
              </div>

              <div className="space-y-3">
                <MotionDiv
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.45 }}
                  className="max-w-[82%] rounded-[22px] rounded-bl-md bg-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm ring-1 ring-[#e3edf4]"
                >
                  <p className="font-medium text-slate-500">Patient</p>
                  <p className="mt-1">Do you have appointments tomorrow?</p>
                </MotionDiv>

                <MotionDiv
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                  transition={{ delay: 0.35, duration: 0.45 }}
                  className="ml-auto max-w-[88%] rounded-[22px] rounded-br-md bg-[#dcf3e4] px-4 py-3 text-sm leading-6 text-[#24445d] shadow-sm ring-1 ring-[#cbe8d5]"
                >
                  <p className="font-medium text-[#366383]">Evolvian AI</p>
                  <p className="mt-1">Yes, we have availability at 10am and 2pm. Would you like to book?</p>
                </MotionDiv>
              </div>

              <div className="grid gap-3 rounded-3xl bg-white p-4 ring-1 ring-[#e3edf4] sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-sm font-semibold text-[#274472]">Suggested next step</p>
                  <p className="mt-1 text-sm text-slate-500">Offer times, confirm contact details, and reserve the slot instantly.</p>
                </div>
                <div className="flex gap-2">
                  <span className="rounded-full bg-[#eef6fb] px-3 py-2 text-sm font-semibold text-[#274472]">10am</span>
                  <span className="rounded-full bg-[#fff5e6] px-3 py-2 text-sm font-semibold text-[#7a5410]">2pm</span>
                </div>
              </div>
            </MotionDiv>
          </Card>

          <div className="absolute -bottom-4 right-2 hidden rounded-2xl border border-[#e9d9b6] bg-white/95 px-4 py-3 shadow-[0_24px_60px_-36px_rgba(39,68,114,0.55)] md:block">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Automation</p>
            <p className="mt-1 font-display text-2xl font-semibold tracking-[-0.04em] text-[#274472]">Less manual work</p>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}

function ProblemSection() {
  return (
    <section id="problem" className="border-y border-[#e4edf3] bg-white py-16 sm:py-20">
      <Container>
        <SectionReveal>
          <SectionHeading
            eyebrow="The problem"
            title="You're losing patients every day"
            description="Most clinics do not lose demand because people are not interested. They lose it between the first message and the confirmed appointment."
          />
        </SectionReveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PROBLEM_POINTS.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.08}>
              <Card className="h-full border-[#e4edf3] bg-[#fbfcfe]">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <IconBadge className="h-11 w-11 rounded-2xl border-[#f3dfbd] bg-[#fff6e8] text-[#a1680d]">
                      <AlertIcon className="h-5 w-5" />
                    </IconBadge>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-7">{item.description}</CardDescription>
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function SolutionSection() {
  return (
    <section id="solution" className="relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(74,144,226,0.12),_transparent_55%)]" />
      <Container className="relative">
        <SectionReveal>
          <SectionHeading
            eyebrow="The solution"
            title="Evolvian fixes this automatically"
            description="Every incoming inquiry gets an immediate next step: a fast answer, the right qualification flow, and a clear path to a confirmed appointment."
          />
        </SectionReveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {SOLUTION_COLUMNS.map((item, index) => {
            const Icon = item.icon;
            return (
              <SectionReveal key={item.title} delay={index * 0.08}>
                <Card className="h-full border-[#dce7ef]">
                  <CardHeader>
                    <IconBadge className="bg-[#f6fbff] text-[#4a90e2] ring-1 ring-[#dbe9f8]">
                      <Icon className="h-5 w-5" />
                    </IconBadge>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="text-base leading-7">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-3">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                          <CheckIcon className="h-4 w-4 text-[#4a90e2]" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </SectionReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-[#f6fafc] py-16 sm:py-20">
      <Container>
        <SectionReveal>
          <SectionHeading
            eyebrow="How it works"
            title="From first inquiry to confirmed visit"
            description="A simple patient journey with no inbox juggling, no missed follow-ups, and no manual scheduling bottlenecks."
          />
        </SectionReveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {WORKFLOW_STEPS.map((item, index) => (
            <SectionReveal key={item.step} delay={index * 0.08}>
              <Card className="relative h-full border-[#dce7ef] bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl font-semibold tracking-[-0.05em] text-[#274472]">{item.step}</span>
                    <span className="rounded-full bg-[#e9f6ec] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#274472]">
                      Step {index + 1}
                    </span>
                  </div>
                  <CardTitle className="mt-2">{item.title}</CardTitle>
                  <CardDescription className="text-base leading-7">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionReveal>
          <SectionHeading
            eyebrow="Benefits"
            title="Results your clinic feels immediately"
            description="The product is not the AI. The product is a fuller calendar, faster patient response times, and less admin work for your team."
          />
        </SectionReveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {BENEFITS.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.07}>
              <Card className="h-full border-[#dce7ef] bg-white">
                <CardHeader>
                  <IconBadge className={index === 0 ? "bg-[#e9f6ec] text-[#274472]" : "bg-[#f6fbff] text-[#4a90e2]"}>
                    {index === 0 ? <GrowthIcon className="h-5 w-5" /> : <CheckIcon className="h-5 w-5" />}
                  </IconBadge>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="text-base leading-7">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function SocialProofSection() {
  return (
    <section id="proof" className="border-y border-[#e4edf3] bg-white py-16 sm:py-20">
      <Container>
        <SectionReveal>
          <SectionHeading
            eyebrow="Social proof"
            title="Trusted by modern clinics"
            description="Placeholder proof blocks for rollout. Swap these with real names, logos, and outcome metrics once case studies are approved."
          />
        </SectionReveal>

        <SectionReveal delay={0.08} className="mt-8 grid gap-4 md:grid-cols-3">
          <Card className="border-[#dce7ef] bg-[linear-gradient(180deg,_#f9fcfb_0%,_#ffffff_100%)]">
            <CardContent className="grid grid-cols-3 gap-4 p-6 text-center">
              <div>
                <p className="font-display text-3xl font-semibold tracking-[-0.04em] text-[#274472]">92%</p>
                <p className="mt-1 text-sm text-slate-500">reply rate</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold tracking-[-0.04em] text-[#274472]">3x</p>
                <p className="mt-1 text-sm text-slate-500">faster intake</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold tracking-[-0.04em] text-[#274472]">24/7</p>
                <p className="mt-1 text-sm text-slate-500">coverage</p>
              </div>
            </CardContent>
          </Card>
        </SectionReveal>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <SectionReveal key={testimonial.name} delay={index * 0.08}>
              <Card className="h-full border-[#dce7ef] bg-[#fbfcfe]">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9f6ec] font-display text-lg font-semibold text-[#274472]">
                      {testimonial.name
                        .split(" ")
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join("")}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-base leading-7 text-slate-700">“{testimonial.quote}”</p>
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionReveal>
          <Card className="overflow-hidden border-[#d6e7de] bg-[linear-gradient(135deg,_#274472_0%,_#345d8f_55%,_#4a90e2_100%)]">
            <div className="grid gap-8 p-8 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Final CTA</p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                  Start capturing more patients today
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                  Set up once, stay available across channels, and let every inquiry move toward a booked appointment.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button
                  href={START_TRIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  variant="accent"
                  className="w-full lg:w-auto"
                  onClick={() => trackEvent({ name: "Healthcare_Landing_Final_Trial_Click", category: "CTA", label: "Footer" })}
                >
                  {PRIMARY_CTA_LABEL}
                </Button>
                <Button
                  href={DEMO_URL}
                  variant="secondary"
                  size="lg"
                  className="w-full border-white/20 bg-white/15 text-white ring-1 ring-white/25 hover:bg-white/20 lg:w-auto"
                  onClick={() => trackEvent({ name: "Healthcare_Landing_Final_Demo_Click", category: "CTA", label: "Footer" })}
                >
                  {SECONDARY_CTA_LABEL}
                </Button>
              </div>
            </div>
          </Card>
        </SectionReveal>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#e4edf3] bg-white py-8">
      <Container className="flex flex-col gap-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-[#274472]">Evolvian AI</p>
          <p>Multi-channel patient capture and booking for modern clinics.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a className="transition-colors hover:text-[#274472]" href="/terms">
            Terms
          </a>
          <a className="transition-colors hover:text-[#274472]" href="/privacy">
            Privacy
          </a>
          <a className="transition-colors hover:text-[#274472]" href={DEMO_URL}>
            Demo
          </a>
        </div>
      </Container>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f7fafc] text-slate-900">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <BenefitsSection />
        <SocialProofSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}

function ArrowUpRightIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m5 12 4 4L19 7" />
    </svg>
  );
}

function AlertIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    </svg>
  );
}

function MessageIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 10h10" />
      <path d="M7 14h6" />
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.7 0-3.28-.5-4.61-1.36L3 20l1.35-4.38A8.45 8.45 0 0 1 3.5 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z" />
    </svg>
  );
}

function SparkIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z" />
      <path d="M5 18.5 6 21l1-2.5L9.5 17 7 16l-1-2.5L5 16l-2.5 1L5 18.5Z" />
      <path d="M18 17.5 19 20l1-2.5 2.5-1.5L20 14.5 19 12l-1 2.5-2.5 1.5L18 17.5Z" />
    </svg>
  );
}

function CalendarIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function GrowthIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 17 9 11l4 4 7-8" />
      <path d="M14 7h6v6" />
    </svg>
  );
}
