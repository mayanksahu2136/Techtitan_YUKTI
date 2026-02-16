import React, { useState, useEffect } from 'react';
import { analysisService } from '@/services/api';
import { Shield, Target, Microscope, CheckCircle2, XCircle, ChevronLeft, BarChart3, TrendingUp, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BenchmarkPage = () => {
    const [report, setReport] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        runTest();
    }, []);

    const runTest = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await analysisService.analyzeBenchmark();
            setReport(data);
        } catch (err) {
            setError("Failed to connect to Laboratory Nodes. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_50%_50%,rgba(0,102,255,0.05)_0%,transparent_100%)]">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                    <Microscope className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-primary animate-pulse" />
                </div>
                <h2 className="mt-8 text-2xl font-black uppercase tracking-[0.3em] text-primary animate-pulse">Running Benchmark</h2>
                <p className="mt-2 text-muted-foreground font-mono text-xs uppercase tracking-widest">Scanning 20 Profile Nodes...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-12 selection:bg-primary/30">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-secondary/30">
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/')}
                            className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Return to Command Center
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                                <Target className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">System Accuracy Report</h1>
                                <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em] mt-1">Classification Benchmark • Problem 2 Implementation</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={runTest}
                        className="px-6 py-3 bg-secondary/10 hover:bg-secondary/20 border border-secondary/30 rounded-full text-xs font-black uppercase tracking-widest transition-all"
                    >
                        Re-Initialize Scan
                    </button>
                </div>

                {error ? (
                    <div className="glass-card border-destructive/20 bg-destructive/[0.02] p-12 text-center rounded-[2rem] space-y-4">
                        <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
                        <h3 className="text-xl font-bold uppercase tracking-widest">Connection Failure</h3>
                        <p className="text-muted-foreground text-sm max-w-md mx-auto">{error}</p>
                    </div>
                ) : (
                    <>
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="glass-card p-8 rounded-[2rem] border-primary/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                    <BarChart3 className="w-12 h-12" />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Accuracy Rating</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-6xl font-black text-primary tracking-tighter">{report?.accuracy}%</span>
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-[2rem] border-accent/20">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Total Tested</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-6xl font-black text-accent tracking-tighter">{report?.total}</span>
                                    <span className="text-xs font-black text-muted-foreground uppercase">Nodes</span>
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-[2rem] border-secondary/20">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Correct</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-6xl font-black text-foreground tracking-tighter">{report?.correct}</span>
                                    <CheckCircle2 className="w-6 h-6 text-accent mb-2" />
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-[2rem] border-warning/20">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Success Rate</p>
                                <div className="space-y-4 mt-2">
                                    <div className="h-4 bg-secondary/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                                            style={{ width: `${report?.accuracy}%` }}
                                        />
                                    </div>
                                    <p className="text-[10px] font-mono text-muted-foreground opacity-60">Verified {report?.correct} of {report?.total} signals correctly identified</p>
                                </div>
                            </div>
                        </div>

                        {/* Results Table */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h2 className="text-2xl font-black tracking-tighter uppercase italic">Signal Log</h2>
                                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-accent" /> Correct
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-destructive" /> Missed
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card rounded-[2.5rem] overflow-hidden border-secondary/20">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-secondary/10 text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-secondary/20">
                                            <th className="px-8 py-6">Node Identify / URL</th>
                                            <th className="px-8 py-6 text-center">AI Precision Logic</th>
                                            <th className="px-8 py-6 text-center">Dossier Conclusion</th>
                                            <th className="px-8 py-6 text-center">Trust Score</th>
                                            <th className="px-8 py-6 text-right">Verification</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-secondary/10">
                                        {report?.results.map((res: any, idx: number) => (
                                            <tr key={idx} className="group hover:bg-secondary/5 transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-black text-sm tracking-tight group-hover:text-primary transition-colors">{res.username}</span>
                                                        <span className="text-[9px] font-mono text-muted-foreground uppercase opacity-50 truncate max-w-[250px]">{res.url}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-center text-[10px] font-mono opacity-50 uppercase tracking-tighter">
                                                    Behavioral Scan Active
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${res.prediction === 'genuine' ? 'bg-accent/10 text-accent border-accent/30' : 'bg-destructive/10 text-destructive border-destructive/30'}`}>
                                                        {res.prediction === 'genuine' ? '✅ Genuine Artifact' : '🚨 Fraud Detected'}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <span className="font-mono font-black text-lg">{res.score}%</span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex justify-end">
                                                        {res.is_correct ? (
                                                            <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center text-accent">
                                                                <CheckCircle2 className="w-5 h-5" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-10 h-10 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center justify-center text-destructive">
                                                                <XCircle className="w-5 h-5" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {/* Footer info */}
                <div className="glass-card p-12 rounded-[2.5rem] bg-gradient-to-br from-primary/[0.03] to-accent/[0.03] border-secondary/20">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <h4 className="font-black uppercase tracking-widest text-xs flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                Performance Logic
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                                Our classification engine uses the 4-parameter weighted formula to determine if an account signal is genuine or fake.
                                Accounts scoring above 70% are classified as genuine.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-black uppercase tracking-widest text-xs flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-accent" />
                                Test Dataset
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                                The dataset consists of 10 confirmed genuine profiles and 10 confirmed high-risk/automated entities across various activity patterns.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-black uppercase tracking-widest text-xs flex items-center gap-2">
                                <Shield className="w-4 h-4 text-warning" />
                                Deductive Threshold
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                                Current deductive threshold is set to 70. This ensures high specificity in identifying fraudulent actors while minimizing false positives for real users.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BenchmarkPage;
