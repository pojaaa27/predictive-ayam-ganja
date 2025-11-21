import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  Brain, 
  Shield, 
  Clock, 
  TrendingUp, 
  Zap,
  Activity,
  AlertTriangle,
  Wrench,
  Calendar,
  ArrowRight
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Predictive Maintenance",
      description: "AI-powered predictions untuk mencegah machine failure sebelum terjadi dengan akurasi tinggi"
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Dashboard monitoring real-time untuk semua mesin dengan health score dan status operasional"
    },
    {
      icon: Shield,
      title: "Self-Healing System",
      description: "Sistem otomatis yang dapat mendeteksi dan memperbaiki masalah tanpa intervensi manual"
    },
    {
      icon: TrendingUp,
      title: "Digital Twin",
      description: "Visualisasi 3D dan simulasi digital twin untuk monitoring kondisi mesin secara detail"
    },
    {
      icon: AlertTriangle,
      title: "What-If Simulation",
      description: "Simulasi dampak penundaan maintenance terhadap biaya, risiko, dan produktivitas"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Optimasi jadwal maintenance dengan AI untuk efisiensi maksimal dan minimal downtime"
    },
    {
      icon: Wrench,
      title: "Maintenance Tickets",
      description: "Manajemen tiket maintenance lengkap dengan tracking, analytics, dan technician assignment"
    },
    {
      icon: Clock,
      title: "Maintenance Priority",
      description: "Prioritisasi maintenance berdasarkan urgency, impact, dan resource availability"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      {/* Header / Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/60 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">PredMaint AI</h1>
              <p className="text-xs text-muted-foreground">Predictive Maintenance Copilot</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/database-schema")}
              className="hidden md:flex"
            >
              Database Schema
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/about")}
              className="hidden md:flex"
            >
              About Us
            </Button>
            <Button onClick={() => navigate("/login")} className="gap-2">
              Login
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-6 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              AI-Powered Industrial Monitoring
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Predictive Maintenance
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Copilot
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Platform AI yang mengintegrasikan machine learning, IoT sensors, dan digital twin technology 
            untuk memprediksi failure, mengoptimalkan maintenance schedule, dan mengurangi downtime hingga 40%
          </p>
          <div className="flex gap-4 justify-center pt-6">
            <Button 
              size="lg" 
              onClick={() => navigate("/login")}
              className="gap-2 text-lg px-8 py-6"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glass-effect border-primary/20 text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-4xl font-bold text-primary mb-2">40%</div>
                <p className="text-sm text-muted-foreground">Downtime Reduction</p>
              </CardContent>
            </Card>
            <Card className="glass-effect border-primary/20 text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-4xl font-bold text-primary mb-2">94.7%</div>
                <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
              </CardContent>
            </Card>
            <Card className="glass-effect border-primary/20 text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-4xl font-bold text-primary mb-2">30%</div>
                <p className="text-sm text-muted-foreground">Cost Savings</p>
              </CardContent>
            </Card>
            <Card className="glass-effect border-primary/20 text-center">
              <CardContent className="pt-6 pb-6">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <p className="text-sm text-muted-foreground">Real-time Monitoring</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Fitur Lengkap untuk Maintenance Excellence
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Platform all-in-one untuk predictive maintenance, monitoring, dan optimization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="glass-effect border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
              >
                <CardContent className="pt-6 pb-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-background/50 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Cara Kerja Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tiga langkah sederhana untuk maintenance yang lebih efisien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-effect border-primary/20">
              <CardContent className="pt-8 pb-8 space-y-4 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <div className="text-3xl font-bold text-primary">1</div>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Monitor & Collect</h3>
                <p className="text-muted-foreground">
                  Sistem mengumpulkan data real-time dari sensors dan equipment untuk analisis mendalam
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-primary/20">
              <CardContent className="pt-8 pb-8 space-y-4 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <div className="text-3xl font-bold text-primary">2</div>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Predict & Analyze</h3>
                <p className="text-muted-foreground">
                  AI memprediksi potential failures dan memberikan rekomendasi maintenance yang optimal
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-primary/20">
              <CardContent className="pt-8 pb-8 space-y-4 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <div className="text-3xl font-bold text-primary">3</div>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Optimize & Execute</h3>
                <p className="text-muted-foreground">
                  Schedule maintenance dengan smart optimization untuk minimal downtime dan maximum efficiency
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-effect border-primary/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            <CardContent className="relative pt-16 pb-16 text-center space-y-6">
              <h2 className="text-4xl font-bold text-foreground">
                Siap untuk Optimasi Maintenance?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Mulai gunakan PredMaint AI sekarang dan rasakan perbedaannya dalam efisiensi operasional Anda
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/login")}
                  className="gap-2 text-lg px-8 py-6"
                >
                  Login to Dashboard
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="text-left">
                <span className="text-lg font-bold text-foreground block">PredMaint AI</span>
                <p className="text-xs text-muted-foreground">
                  Predictive Maintenance Platform
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/about")}
                className="text-muted-foreground hover:text-foreground"
              >
                About Us
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/database-schema")}
                className="text-muted-foreground hover:text-foreground"
              >
                Database Schema
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/login")}
                className="text-muted-foreground hover:text-foreground"
              >
                Login
              </Button>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-muted-foreground">
            © 2025 PredMaint AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
