export const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Honest feedback, <br />
          <span className="text-primary">without fear</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          TrueFeedback is a platform that helps people receive honest,
          constructive opinions — anonymously.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What is TrueFeedback?</h2>
        <p className="text-muted-foreground leading-relaxed">
          TrueFeedback lets you create a public profile and share it with
          friends, coworkers, or anyone you trust. They can leave anonymous
          feedback without fear of judgment — and you stay in control of what
          appears publicly.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why anonymous feedback?</h2>
        <p className="text-muted-foreground leading-relaxed">
          People are often honest only when they feel safe. By removing identity
          from the equation, we help surface thoughts that are usually left
          unsaid — whether it's praise, constructive criticism, or difficult
          truths.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">How it works</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="border border-border rounded-xl p-5 space-y-2">
            <h3 className="font-semibold">1. Create a profile</h3>
            <p className="text-sm text-muted-foreground">
              Set up your profile in seconds and get a unique shareable link.
            </p>
          </div>

          <div className="border border-border rounded-xl p-5 space-y-2">
            <h3 className="font-semibold">2. Share your link</h3>
            <p className="text-sm text-muted-foreground">
              Share it anywhere — chats, social media, or privately.
            </p>
          </div>

          <div className="border border-border rounded-xl p-5 space-y-2">
            <h3 className="font-semibold">3. Receive feedback</h3>
            <p className="text-sm text-muted-foreground">
              Get honest feedback anonymously and choose what to show publicly.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Plans</h2>

        <div className="border border-border rounded-xl p-6 space-y-3">
          <p className="font-medium">Free plan</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Receive anonymous feedback</li>
            <li>Public feedback wall</li>
            <li>
              Up to{" "}
              <span className="font-medium text-foreground">
                3 feedback submissions
              </span>{" "}
              per person
            </li>
          </ul>
        </div>

        <div className="border border-dashed border-border rounded-xl p-6 space-y-2 opacity-70">
          <p className="font-medium">Paid plans</p>
          <p className="text-sm text-muted-foreground">
            Coming soon… more feedback, advanced controls, and deeper insights.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Privacy first</h2>
        <p className="text-muted-foreground leading-relaxed">
          We do not reveal sender identities. Feedback is anonymous by design,
          and you always control visibility on your profile.
        </p>
      </section>

      <section className="text-center space-y-4">
        <p className="text-lg font-medium">Growth starts with listening.</p>
        <p className="text-muted-foreground">
          TrueFeedback exists to make that easier — and safer.
        </p>
      </section>
    </div>
  );
};
