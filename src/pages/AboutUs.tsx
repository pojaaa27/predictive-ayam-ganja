import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Github, Linkedin, Mail } from "lucide-react";

export default function AboutUs() {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "Muhammad Fauza",
      id: "M420D5Y1268",
      role: "Machine Learning Engineer"
    },
    {
      name: "Celio Arga Rumahorbo",
      id: "M269D5Y0374",
      role: "Machine Learning Engineer"
    },
    {
      name: "Injil Karepowan",
      id: "R269D5Y0852",
      role: "Cloud Computing Engineer"
    },
    {
      name: "Muhammad Afrizal Kesuma",
      id: "R269D5Y1201",
      role: "Cloud Computing Engineer"
    },
    {
      name: "Muhammad Ghazali",
      id: "R269D5Y1278",
      role: "Cloud Computing Engineer"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/60 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <Button onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="space-y-12 animate-fade-in">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="inline-block mb-4">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                <Users className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              About Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Tim pengembang di balik PredMaint AI - Platform predictive maintenance yang memanfaatkan 
              teknologi AI dan Machine Learning untuk optimasi industrial operations
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-effect border-primary/20">
              <CardContent className="pt-8 pb-8 space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Mengembangkan solusi predictive maintenance yang intelligent dan accessible, 
                  membantu industri mengurangi downtime, mengoptimalkan biaya maintenance, 
                  dan meningkatkan efisiensi operasional melalui teknologi AI terdepan.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-primary/20">
              <CardContent className="pt-8 pb-8 space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Menjadi platform predictive maintenance terdepan yang mengintegrasikan 
                  IoT, Machine Learning, dan Digital Twin technology untuk menciptakan 
                  smart factories yang lebih efisien dan sustainable.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team Section */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-foreground">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tim multidisipliner yang terdiri dari Machine Learning Engineers dan 
                Cloud Computing Engineers yang berdedikasi untuk menciptakan solusi inovatif
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <Card 
                  key={index}
                  className="glass-effect border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
                >
                  <CardContent className="pt-8 pb-8 text-center space-y-4">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                      <span className="text-3xl font-bold text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-primary font-mono mb-2">
                        {member.id}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <Card className="glass-effect border-primary/20">
            <CardContent className="pt-8 pb-8 space-y-6">
              <h2 className="text-3xl font-bold text-foreground text-center">Technology Stack</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">Machine Learning</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• TensorFlow & PyTorch</li>
                    <li>• Predictive Analytics</li>
                    <li>• Time Series Forecasting</li>
                    <li>• Anomaly Detection</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">Cloud Infrastructure</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Google Cloud Platform</li>
                    <li>• Kubernetes & Docker</li>
                    <li>• Cloud Functions</li>
                    <li>• Cloud Storage</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">Frontend & Backend</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• React & TypeScript</li>
                    <li>• Node.js & Express</li>
                    <li>• PostgreSQL</li>
                    <li>• RESTful APIs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card className="glass-effect border-accent/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            <CardContent className="relative pt-12 pb-12 text-center space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Interested in Our Project?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hubungi kami untuk diskusi lebih lanjut tentang implementasi predictive maintenance 
                atau collaboration opportunities
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button 
                  variant="outline"
                  className="gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Contact Us
                </Button>
                <Button 
                  variant="outline"
                  className="gap-2"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          © 2025 PredMaint AI. Built with ❤️ by our amazing team.
        </div>
      </footer>
    </div>
  );
}
