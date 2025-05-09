import { GitBranch, Server, LineChart, Activity, Network, Database, Gauge, Link2, Shield } from "lucide-react";

export const kubernetesTools = [
    {
        name: "Helm",
        description: "The package manager for Kubernetes",
        icon: <GitBranch className="h-6 w-6" />,
        link: "https://helm.sh",
        logo: "/img/svg/helm.svg",
    },
    {
        name: "Kustomize",
        description: "Template-free way to customize Kubernetes resources",
        icon: <Server className="h-6 w-6" />,
        link: "https://kustomize.io",
        logo: "/img/svg/kustomize.svg",
    },
    {
        name: "Argo CD",
        description: "Declarative continuous delivery for Kubernetes",
        icon: <GitBranch className="h-6 w-6" />,
        link: "https://argoproj.github.io/cd",
        logo: "/img/svg/argo.svg",
    },
    {
        name: "Flux",
        description: "GitOps for both apps and infrastructure",
        icon: <GitBranch className="h-6 w-6" />,
        link: "https://fluxcd.io",
        logo: "/img/svg/flux.svg",
    },
    {
        name: "KubeCost",
        description: "Cost monitoring for Kubernetes workloads",
        icon: <LineChart className="h-6 w-6" />,
        link: "https://kubecost.com",
        logo: "/img/svg/kubecost.svg",
    },
    {
        name: "Prometheus",
        description: "Monitoring and alerting toolkit",
        icon: <Activity className="h-6 w-6" />,
        link: "https://prometheus.io",
        logo: "/img/svg/prometheus.svg",
    },
    {
        name: "Istio",
        description: "Service mesh for Kubernetes",
        icon: <Network className="h-6 w-6" />,
        link: "https://istio.io",
        logo: "/img/svg/istio.svg",
    },
    {
        name: "Loki",
        description: "Log aggregation system",
        icon: <Database className="h-6 w-6" />,
        link: "https://grafana.com/loki",
        logo: "/img/svg/loki.svg",
    },
    {
        name: "Metrics Server",
        description: "Cluster resource metrics",
        icon: <Gauge className="h-6 w-6" />,
        link: "https://github.com/kubernetes-sigs/metrics-server",
        logo: "/img/svg/metrics-server.svg",
    },
    {
        name: "Ingress NGINX",
        description: "Ingress controller for Kubernetes",
        icon: <Link2 className="h-6 w-6" />,
        link: "https://kubernetes.github.io/ingress-nginx",
        logo: "/img/svg/nginx.svg",
    },
    {
        name: "kube-bench",
        description: "CIS Kubernetes Benchmark tool",
        icon: <Shield className="h-6 w-6" />,
        link: "https://github.com/aquasecurity/kube-bench",
        logo: "/img/svg/kube-bench.svg",
    },
].map(tool => ({
    ...tool,
    logo: "/img/png/k8s-tool.png",
})); 