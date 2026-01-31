export const PlansPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Choose your plan</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Start free and upgrade when you're ready for deeper insights.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="border border-border rounded-2xl p-8 bg-card space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Free</h2>
            <p className="text-muted-foreground">
              Everything you need to get honest feedback.
            </p>
          </div>

          <div className="text-4xl font-bold">
            ₹0
            <span className="text-base font-medium text-muted-foreground">
              / forever
            </span>
          </div>

          <ul className="space-y-3 text-sm">
            <li>✓ Anonymous feedback</li>
            <li>✓ Public feedback wall</li>
            <li>✓ Profile shareable via link</li>
            <li>
              ✓ <span className="font-medium">3 feedback submissions</span> per
              person
            </li>
            <li>✓ Full control over visibility</li>
          </ul>

          <button
            disabled
            className="w-full py-2 rounded-full bg-primary text-primary-foreground opacity-80 cursor-default"
          >
            You're on Free
          </button>
        </div>

        <div className="border border-dashed border-border rounded-2xl p-8 bg-card/50 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Pro & Teams</h2>
            <p className="text-muted-foreground">
              Unlock deeper insights and advanced controls.
            </p>
          </div>

          <div className="text-4xl font-bold text-muted-foreground">
            Coming soon
          </div>

          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>• Unlimited feedback</li>
            <li>• Advanced moderation tools</li>
            <li>• Feedback analytics & summaries</li>
            <li>• Profile customization</li>
            <li>• Priority support</li>
          </ul>

          <button
            disabled
            className="w-full py-2 rounded-full border border-border text-muted-foreground cursor-not-allowed"
          >
            Notify me
          </button>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        No hidden fees. Cancel anytime when paid plans launch.
      </div>
    </div>
  );
};
