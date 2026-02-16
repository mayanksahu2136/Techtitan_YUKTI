const API_BASE_URL = "/api";

export interface AnalysisResult {
  success: boolean;
  trust_score: number;
  risk_level: string;
  breakdown: Record<string, any>;
  profile_data?: Record<string, any>;
  processed_data?: Record<string, any>;
  error?: string;
}

export const analysisService = {
  // Auto mode analysis
  async analyzeAuto(platform: string, profileUrl: string): Promise<AnalysisResult> {
    try {
      const url = `${API_BASE_URL}/analysis/auto`;
      const payload = { platform, profile_url: profileUrl };

      console.log("📤 Calling API:", url);
      console.log("📊 Payload:", payload);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log("✅ Response status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ API error response:", errorText);
        throw new Error(`API error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      console.log("✅ API response:", data);

      if (!data.success) {
        throw new Error(data.error || "Analysis failed");
      }

      return data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error("❌ Full error:", errorMsg);
      return {
        success: false,
        trust_score: 0,
        risk_level: "error",
        breakdown: {},
        error: errorMsg,
      };
    }
  },

  // Manual mode analysis
  async analyzeManual(formData: FormData): Promise<AnalysisResult> {
    try {
      const url = `${API_BASE_URL}/analysis/manual`;

      console.log("📤 Calling API:", url);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(url, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log("✅ Response status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ API error response:", errorText);
        throw new Error(`API error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      console.log("✅ API response:", data);

      if (!data.success) {
        throw new Error(data.error || "Analysis failed");
      }

      return data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error("❌ Full error:", errorMsg);
      return {
        success: false,
        trust_score: 0,
        risk_level: "error",
        breakdown: {},
        error: errorMsg,
      };
    }
  },

  // Run benchmark test
  async analyzeBenchmark(): Promise<any> {
    try {
      const url = `${API_BASE_URL}/analysis/benchmark`;
      console.log("📤 Running Benchmark:", url);

      const res = await fetch(url);
      if (!res.ok) throw new Error("Benchmark failed");

      const data = await res.json();
      return data.report;
    } catch (err) {
      console.error("❌ Benchmark error:", err);
      throw err;
    }
  },

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return res.ok;
    } catch {
      return false;
    }
  },
};
