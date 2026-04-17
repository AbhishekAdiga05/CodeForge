import {
  Code2,
  Target,
  Users,
  Zap,
  Heart,
  Github,
  Linkedin,
  Mail,
  BookOpen,
  Rocket,
  Shield,
  Globe,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Mission-Driven",
      description:
        "We believe everyone deserves access to quality coding practice resources to achieve their career goals.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community First",
      description:
        "Building a supportive community where developers help each other grow and succeed together.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Innovation",
      description:
        "Constantly improving our platform with the latest technologies and learning methodologies.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Quality Assurance",
      description:
        "Every problem is carefully curated and tested to ensure the best learning experience.",
    },
  ];

  const features = [
    {
      icon: <Code2 className="w-8 h-8 text-amber-500" />,
      title: "Real-World Problems",
      description:
        "Practice with problems inspired by actual technical interviews from top tech companies.",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-amber-500" />,
      title: "Comprehensive Solutions",
      description:
        "Learn from detailed explanations and multiple solution approaches for every problem.",
    },
    {
      icon: <Rocket className="w-8 h-8 text-amber-500" />,
      title: "Progress Tracking",
      description:
        "Monitor your growth with detailed statistics and personalized learning paths.",
    },
    {
      icon: <Globe className="w-8 h-8 text-amber-500" />,
      title: "Multiple Languages",
      description:
        "Code in your preferred language with support for JavaScript, Python, Java, C++, and more.",
    },
  ];

  const team = [
    {
      name: "Abhishek",
      role: "Founder & Developer",
      description:
        "Full-stack developer passionate about creating tools that help others learn to code.",
      avatar: "A",
    },
  ];

  return (
    <div className="min-h-screen transition-colors mt-24">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge
            variant="secondary"
            className="mb-8 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900"
          >
            <Heart className="w-4 h-4 mr-2" />
            Built with passion for developers
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
            About CodeForge
          </h1>

          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            A platform dedicated to helping developers master data structures,
            algorithms, and coding skills through hands-on practice and
            real-world challenges.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">
                Our Mission
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                We started this project with a simple goal: to create an
                accessible, high-quality platform where developers can practice
                coding problems and prepare for technical interviews.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                Whether you&apos;re a beginner just starting your coding journey
                or an experienced developer preparing for your dream job, our
                platform offers challenges suited to every skill level.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We believe that consistent practice, combined with the right
                resources, can help anyone become a better programmer.
              </p>
            </div>

            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 border-amber-200 dark:border-amber-800">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-amber-600 dark:text-amber-400">
                      500+
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      Coding Problems
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-amber-600 dark:text-amber-400">
                      10K+
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      Active Users
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-amber-600 dark:text-amber-400">
                      25+
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      Languages
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-amber-600 dark:text-amber-400">
                      24/7
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      Available
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
              Our Values
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="bg-white/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:border-amber-300 dark:hover:border-amber-700 transition-colors"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zinc-600 dark:text-zinc-400">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
              What We Offer
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Everything you need to become a better programmer
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow"
              >
                <div className="flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
              Meet the Team
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              The people behind this platform
            </p>
          </div>

          <div className="flex justify-center">
            {team.map((member, index) => (
              <Card
                key={index}
                className="max-w-sm bg-white/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800"
              >
                <CardHeader className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {member.avatar}
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300"
                  >
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {member.description}
                  </p>
                  <div className="flex justify-center gap-4 mt-4">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="https://github.com" target="_blank">
                        <Github className="w-5 h-5" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="https://linkedin.com" target="_blank">
                        <Linkedin className="w-5 h-5" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="mailto:contact@example.com">
                        <Mail className="w-5 h-5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-amber-500 to-orange-500 border-0">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Ready to Start Your Coding Journey?
              </h2>
              <p className="text-amber-100 mb-8 max-w-xl mx-auto">
                Join thousands of developers who are improving their skills
                every day. Start practicing now!
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  size="lg"
                  className="bg-white text-amber-600 hover:bg-amber-50"
                  asChild
                >
                  <Link href="/problems">Browse Problems</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                  asChild
                >
                  <Link href="/sign-up">Create Account</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 px-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            Built with Next.js, Prisma, and ❤️ | © {new Date().getFullYear()}{" "}
            CodeForge
          </p>
        </div>
      </section>
    </div>
  );
}
