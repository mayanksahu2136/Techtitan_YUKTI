import { useState, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import PlatformSelect from "@/components/PlatformSelect";
import ModeSelect from "@/components/ModeSelect";
import AutoMode from "@/components/AutoMode";
import ManualMode from "@/components/ManualMode";
import AnalysisAnimation from "@/components/AnalysisAnimation";
import ResultsDashboard from "@/components/ResultsDashboard";
import StepNav from "@/components/StepNav";
import Layout from "@/components/Layout";
import { analysisService, AnalysisResult } from "@/services/api";

type Step = "hero" | "platform" | "mode" | "auto" | "manual" | "analyzing" | "results";

const Index = () => {
  const [step, setStep] = useState<Step>("hero");
  const [platform, setPlatform] = useState<"instagram" | "facebook">("instagram");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisUsername, setAnalysisUsername] = useState("");

  const handlePlatform = useCallback((p: "instagram" | "facebook") => {
    setPlatform(p);
    setStep("mode");
  }, []);

  const handleMode = useCallback((mode: "automatic" | "manual") => {
    setStep(mode === "automatic" ? "auto" : "manual");
  }, []);

  const handleAutoAnalyze = useCallback(async (input: string) => {
    setAnalysisUsername(input);
    setIsLoading(true);
    setStep("analyzing");

    // Construct correct URL
    let profilingUrl = input;
    if (!input.includes("instagram.com") && !input.includes("facebook.com")) {
      // It's a raw username
      const cleanUsername = input.startsWith("@") ? input.substring(1) : input;
      profilingUrl = `https://www.instagram.com/${cleanUsername}`;
    }

    // Simulate API delay for demo
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Call the backend API
    const result = await analysisService.analyzeAuto(platform, profilingUrl);
    setAnalysisResult(result);

    // Continue to results
    setIsLoading(false);
    setStep("results");
  }, [platform]);

  const handleManualAnalyze = useCallback(async (formData: FormData) => {
    setIsLoading(true);
    setStep("analyzing");

    // Simulate API delay for demo
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Call the backend API
    const result = await analysisService.analyzeManual(formData);
    setAnalysisResult(result);

    // Continue to results
    setIsLoading(false);
    setStep("results");
  }, []);

  const goHome = useCallback(() => {
    setStep("hero");
    setAnalysisResult(null);
    setAnalysisUsername("");
  }, []);

  // Determine forward step (only when there's an obvious next)
  const forwardMap: Partial<Record<Step, () => void>> = {
    platform: () => setStep("mode"),
    mode: () => setStep("auto"),
  };

  // Determine back step
  const backMap: Partial<Record<Step, () => void>> = {
    platform: () => setStep("hero"),
    mode: () => setStep("platform"),
    auto: () => setStep("mode"),
    manual: () => setStep("mode"),
    results: () => setStep("hero"),
  };

  const showNav = step !== "hero" && step !== "analyzing";

  if (step === "hero") {
    return <HeroSection onStart={() => setStep("platform")} />;
  }

  return (
    <Layout>
      {showNav && (
        <StepNav
          onBack={backMap[step]}
          onForward={forwardMap[step]}
          onHome={goHome}
        />
      )}

      <div className={showNav ? "mt-4" : "mt-2"}>
        {step === "platform" && <PlatformSelect onSelect={handlePlatform} />}
        {step === "mode" && <ModeSelect onSelect={handleMode} />}
        {step === "auto" && (
          <AutoMode platform={platform} onAnalyze={handleAutoAnalyze} isLoading={isLoading} />
        )}
        {step === "manual" && (
          <ManualMode platform={platform} onSubmit={handleManualAnalyze} isLoading={isLoading} />
        )}
        {step === "analyzing" && <AnalysisAnimation onComplete={() => setStep("results")} />}
        {step === "results" && analysisResult && (
          <ResultsDashboard data={analysisResult} onNewAnalysis={goHome} />
        )}
      </div>
    </Layout>
  );
};

export default Index;
