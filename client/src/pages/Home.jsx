import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ArrowRight, MessageSquare, Shield, Zap } from "lucide-react";

export const Home = () => {
  const { isAuthenticated } = useAuth();

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <main className="flex flex-col py-4 items-center justify-center min-h-[80vh] text-center px-4">
      <section className="space-y-8 max-w-3xl">
        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm">
          ✨ The best way to grow is to listen
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight py-3">
          Collect honest, <br />
          <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
            anonymous feedback
          </span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Create a profile, share your link, and receive genuine thoughts from
          friends and coworkers. Curate what you show to the world.
        </p>

        <div
          variants={item}
          className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {!isAuthenticated && (
            <>
              <Link to="/auth?mode=signup">
                <div className="inline-flex items-center justify-center h-12 px-8 text-lg rounded-full border-2 border-border hover:bg-indigo-400 transition bg-primary text-primary-foreground">
                  Create Your Profile
                  <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              </Link>

              <Link to="/auth?mode=login">
                <div className="inline-flex items-center justify-center h-12 px-8 text-lg rounded-full border-2 border-border hover:border-slate-300 hover:bg-muted transition">
                  Login
                </div>
              </Link>
            </>
          )}
          {isAuthenticated && (
            <Link to="/profile">
              <button className="h-12 flex items-center my-1 px-8 text-lg rounded-full border-2 shadow-primary/25 hover:shadow-primary/30 transition-all hover:-translate-y-[4px]">
                Go To Your Profile <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-20">
        <Feature
          icon={<Shield className="w-8 h-8 text-primary" />}
          title="100% Anonymous"
          description="We never store IP addresses or identifying data from senders. Honesty requires safety."
        />

        <Feature
          icon={<MessageSquare className="w-8 h-8 text-primary" />}
          title="Curated Public Page"
          description="You decide what goes public. Hide the rest or delete it. You are in control."
        />

        <Feature
          icon={<Zap className="w-8 h-8 text-primary" />}
          title="Instant Setup"
          description="Sign up and get your unique link in seconds. No complicated configuration."
        />
      </section>
    </main>
  );
};

function Feature({ icon, title, description }) {
  return (
    <div className="border border-border/50 bg-card/50 backdrop-blur-sm rounded-xl p-6 text-left space-y-4 hover:border-primary/50 transition-colors">
      <div className="p-3 bg-primary/5 rounded-xl w-fit">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
