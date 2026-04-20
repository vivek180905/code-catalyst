"use client";

import { useUser } from "@clerk/nextjs";
import FeatureCategory from "./_components/FeatureCategory";
import FeatureItem from "./_components/FeatureItem";
import UpgradeButton from "./_components/UpgradeButton";
import LoginButton from "@/components/LoginButton";

export default function PricingPage() {
  const { isSignedIn } = useUser();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pricing</h1>

      {/* Example Features */}
      <FeatureCategory label="Features">
        <FeatureItem>Run Code</FeatureItem>
<FeatureItem>Save Snippets</FeatureItem>
      </FeatureCategory>

      {/* Auth-based UI */}
      <div className="mt-6">
        {isSignedIn ? (
          <UpgradeButton />
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}