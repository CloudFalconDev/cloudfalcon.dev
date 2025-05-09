import { Zap, Shield, DollarSign, Server, Cloud, Clock, Lock, CheckCircle, Users, LineChart, GraduationCap } from "lucide-react";

export const serviceDetails = [
    {
        icon: <Zap className="h-12 w-12" />,
        title: "Cloud Automation",
        description:
            "Streamline your operations with cutting-edge automation solutions.",
        stats: { value: "50%", label: "Reduced Manual Tasks" },
        features: [
            {
                icon: <Server className="h-5 w-5" />,
                text: "Infrastructure as Code (IaC)",
            },
            {
                icon: <Cloud className="h-5 w-5" />,
                text: "CI/CD Pipeline Automation",
            },
            {
                icon: <Clock className="h-5 w-5" />,
                text: "Automated Scaling & Monitoring",
            },
        ],
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        icon: <Shield className="h-12 w-12" />,
        title: "Cloud Security",
        description: "Protect your assets with advanced security measures.",
        stats: { value: "99.9%", label: "Security Compliance" },
        features: [
            { icon: <Lock className="h-5 w-5" />, text: "Zero Trust Architecture" },
            {
                icon: <CheckCircle className="h-5 w-5" />,
                text: "Compliance Automation",
            },
            { icon: <Users className="h-5 w-5" />, text: "Identity Management" },
        ],
        gradient: "from-purple-500 to-pink-500",
    },
    {
        icon: <DollarSign className="h-12 w-12" />,
        title: "Cost Optimization",
        description: "Maximize ROI with cost-effective strategies.",
        stats: { value: "40%", label: "Average Cost Reduction" },
        features: [
            {
                icon: <LineChart className="h-5 w-5" />,
                text: "Resource Usage Analysis",
            },
            {
                icon: <Cloud className="h-5 w-5" />,
                text: "Automated Cost Monitoring",
            },
            {
                icon: <CheckCircle className="h-5 w-5" />,
                text: "Optimization Recommendations",
            },
        ],
        gradient: "from-green-500 to-emerald-500",
    },
    {
        icon: <GraduationCap className="h-12 w-12" />,
        title: "Cloud Training",
        description: "Expert training for your team.",
        stats: { value: "100+", label: "Engineers Trained" },
        features: [
            {
                icon: <Users className="h-5 w-5" />,
                text: "Customized Training Programs",
            },
            { icon: <CheckCircle className="h-5 w-5" />, text: "Hands-on Workshops" },
            { icon: <Clock className="h-5 w-5" />, text: "Ongoing Support" },
        ],
        gradient: "from-orange-500 to-red-500",
    },
]; 